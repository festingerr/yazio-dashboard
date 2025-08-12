'use server'

import { Yazio } from 'yazio'

export async function getNutritionData(date?: string) {
  try {
    const yazio = new Yazio({
      credentials: {
        username: "q4gydkik9f@privaterelay.appleid.com",
        password: "QMxfGxXCTgSDY6NK2ucu",
      },
    });

    const targetDate = date ? new Date(date) : new Date()
    const items = await yazio.user.getConsumedItems({ date: targetDate });

    return {
      success: true,
      data: items
    }
  } catch (error) {
    console.error('Error fetching nutrition data:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch nutrition data'
    }
  }
}

export async function updateNutritionDate(formData: FormData) {
  const date = formData.get('date') as string
  return await getNutritionData(date)
}
