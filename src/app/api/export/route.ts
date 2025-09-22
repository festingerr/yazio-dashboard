'use server'

import { NextRequest, NextResponse } from 'next/server'
import { Yazio } from 'yazio'
import dotenv from 'dotenv'

dotenv.config()

const yazio = new Yazio({
  credentials: {
    username: process.env.YAZIO_USERNAME?.trim(),
    password: process.env.YAZIO_PASSWORD?.trim(),
  },
})

function toDate(input: string): Date {
  // Expecting YYYY-MM-DD
  const [y, m, d] = input.split('-').map((n) => parseInt(n, 10))
  return new Date(y, (m - 1), d)
}

function formatYmd(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function addDays(d: Date, delta: number): Date {
  const copy = new Date(d)
  copy.setDate(copy.getDate() + delta)
  return copy
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const from = searchParams.get('from')
    const to = searchParams.get('to')
    const debug = false

    if (!from || !to) {
      return NextResponse.json({ error: 'Missing from/to' }, { status: 400 })
    }

    const fromDate = toDate(from)
    const toDateVal = toDate(to)

    const rows: Array<{ date: string; calories: number; protein: number; carbs: number; fat: number; sat_fat: number; sodium: number; water: number; }>
      = []

    const debugLog: any[] = []

    const productCache = new Map<string, any>()

    async function getProductDetails(productId: string) {
      const cached = productCache.get(productId)
      if (cached) return cached
      const details = await yazio.products.get(productId)
      productCache.set(productId, details)
      return details
    }

    // Iterate inclusive range
    for (let d = new Date(fromDate); d <= toDateVal; d = addDays(d, 1)) {
      const dateStr = formatYmd(d)
      const summary = await yazio.user.getDailySummary({ date: dateStr })

      // Aggregate totals similarly to src/lib/actions.ts
      let fat = 0
      let carbs = 0
      let protein = 0
      let calories = 0
      let satFat = 0
      let sodium = 0

      for (const meal of Object.values(summary.meals)) {
        const nutrients: any = (meal as any).nutrients
        fat += Math.round(nutrients['nutrient.fat'] || 0)
        carbs += Math.round(nutrients['nutrient.carb'] || 0)
        protein += Math.round(nutrients['nutrient.protein'] || 0)
        calories += Math.round(nutrients['energy.energy'] || 0)
        // daily summary doesn't expose saturated fat per meal
      }

      // Derive saturated fat from consumed items (products) for this date
      const consumed = await yazio.user.getConsumedItems({ date: dateStr })
      // simple_products may have nutrients inline
      if (Array.isArray((consumed as any).simple_products)) {
        for (const sp of (consumed as any).simple_products) {
          const n: any = sp?.nutrients || {}
          const satPick = pickSaturatedFat(n)
          satFat += satPick.value

          // Sodium (assume grams per serving -> convert to mg and scale by servings)
          const sodPick = pickSodiumPerGram(n)
          const spAmount = Number((sp as any)?.amount ?? 0) // grams consumed
          const servings = null
          const sodMg = sodPick.value * spAmount * 1000 // g/g * g -> g, to mg
          if (!Number.isNaN(sodMg)) sodium += sodMg
          
        }
      }
      // detailed products
      if (Array.isArray(consumed.products)) {
        for (const p of consumed.products) {
          try {
            const details = await getProductDetails(p.product_id)
            const nutrients: any = details?.nutrients || {}
            // Try common saturated fat keys; fallback: first key containing 'satur'
            const satPick = pickSaturatedFat(nutrients)

            // Assume nutrient values are per logged serving; scale by amount
            const amount = typeof p.amount === 'number' ? Number(p.amount) : 1
            const sat = satPick.value * amount
            if (!Number.isNaN(sat)) satFat += sat

            // Sodium from product details
            const sodPick = pickSodiumPerGram(nutrients)
            const servings = null
            const sod = sodPick.value * amount * 1000 // g/g * g -> mg total
            if (!Number.isNaN(sod)) sodium += sod
            
          } catch {
            // ignore individual product failures
          }
        }
      }

      // Total water intake (tracker) only
      const waterData = await yazio.user.getWaterIntake({ date: new Date(d.getFullYear(), d.getMonth(), d.getDate()) })
      const waterMl = Number((waterData as any)?.water_intake || 0)
      const water = Math.round(waterMl / 29.5735) // convert ml → fl oz

      rows.push({
        date: dateStr,
        calories,
        protein,
        carbs,
        fat,
        sat_fat: Math.round(satFat * 10) / 10, // 1 decimal place
        sodium: Math.round(sodium),
        water,
      })

      
    }

    

    // Build CSV
    const header = ['date', 'calories', 'protein', 'carbs', 'fat', 'saturated_fat', 'sodium', 'water']
    const lines = [header.join(',')]
    for (const r of rows) {
      lines.push([
        r.date,
        r.calories,
        r.protein,
        r.carbs,
        r.fat,
        r.sat_fat,
        r.sodium,
        r.water,
      ].join(','))
    }
    const csv = lines.join('\n')

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="yazio-export-${from}-to-${to}.csv"`,
        'Cache-Control': 'no-store',
      },
    })
  } catch (error: any) {
    const msg = error?.message || 'Export failed'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

function pickSaturatedFat(nutrients: any): { key: string | null, value: number } {
  if (!nutrients) return { key: null, value: 0 }
  const candidates = [
    'nutrient.fat.saturated',
    'nutrient.fat_sat',
    'nutrient.saturated_fat',
    'nutrient.fatty_acids.saturated',
    'nutrient.saturated',
  ]
  for (const k of candidates) if (nutrients[k] != null) return { key: k, value: Number(nutrients[k]) || 0 }
  const dynamic = Object.keys(nutrients).find(k => /(^|\.)satur/i.test(k))
  if (dynamic) return { key: dynamic, value: Number(nutrients[dynamic]) || 0 }
  return { key: null, value: 0 }
}

function pickSodiumPerGram(nutrients: any): { key: string | null, value: number } {
  if (!nutrients) return { key: null, value: 0 }
  // Prefer sodium defined per 100 g or per gram; the SDK appears to return grams per 100 g as small decimals
  if (nutrients['nutrient.sodium'] != null) {
    const val = Number(nutrients['nutrient.sodium'])
    if (!Number.isNaN(val)) {
      // Heuristic: if value is very small (< 0.02), treat as grams per gram (i.e., per g)
      // else if between 0.02 and 10, assume grams per 100 g and convert to per-gram
      if (val < 0.02) return { key: 'nutrient.sodium', value: val }
      return { key: 'nutrient.sodium', value: val / 100 }
    }
  }
  if (nutrients['nutrient.salt'] != null) {
    const saltG = Number(nutrients['nutrient.salt'])
    const gramsPer100 = !Number.isNaN(saltG) ? (saltG / 2.5) : 0 // g salt -> g sodium (per same basis)
    // Convert to per-gram estimate assuming per-100g basis if >0.02
    const perGram = gramsPer100 > 0.02 ? gramsPer100 / 100 : gramsPer100
    return { key: 'nutrient.salt', value: perGram }
  }
  const dynamic = Object.keys(nutrients).find(k => /sodium|\bna\b|salt/i.test(k))
  if (dynamic) {
    const val = Number(nutrients[dynamic]) || 0
    if (/salt/i.test(dynamic)) {
      const gramsPer100 = (val / 2.5)
      return { key: dynamic, value: gramsPer100 > 0.02 ? gramsPer100 / 100 : gramsPer100 }
    }
    // Assume sodium is grams per 100 g if >=0.02
    return { key: dynamic, value: val >= 0.02 ? val / 100 : val }
  }
  return { key: null, value: 0 }
}


