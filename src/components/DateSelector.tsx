'use client'

import { useState, useTransition } from 'react'
import { updateNutritionDate } from '../actions'

interface DateSelectorProps {
  initialDate: string
  onDateChange: (data: any) => void
}

export default function DateSelector({ initialDate, onDateChange }: DateSelectorProps) {
  const [selectedDate, setSelectedDate] = useState(initialDate)
  const [isPending, startTransition] = useTransition()

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate)
    
    startTransition(async () => {
      const formData = new FormData()
      formData.append('date', newDate)
      const result = await updateNutritionDate(formData)
      onDateChange(result)
    })
  }

  return (
    <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
      <label className="flex flex-col min-w-40 flex-1">
        <select
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          disabled={isPending}
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111714] focus:outline-0 focus:ring-0 border border-[#dce5df] bg-white focus:border-[#dce5df] h-14 placeholder:text-[#648772] p-[15px] text-base font-normal leading-normal disabled:opacity-50"
        >
          <option value={new Date().toISOString().split('T')[0]}>Today</option>
          <option value={new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]}>Yesterday</option>
          <option value={new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}>2 days ago</option>
        </select>
        {isPending && (
          <p className="text-[#648772] text-xs mt-2">Loading nutrition data...</p>
        )}
      </label>
    </div>
  )
}
