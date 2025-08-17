'use client'

import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [nutritionData, setNutritionData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // const [selectedDate] = useState<string>(
  //   new Date().toISOString().split('T')[0]
  // )

  // Mock data for demonstration (replace with real data from your API)
  const mockNutritionData = {
    carbs: 150,
    protein: 80,
    fat: 60,
    calories: 1800
  }

  const mockMealBreakdown = [
    { meal: 'Breakfast', carbs: 40, protein: 20, fat: 15, calories: 500 },
    { meal: 'Lunch', carbs: 50, protein: 30, fat: 20, calories: 600 },
    { meal: 'Dinner', carbs: 40, protein: 20, fat: 15, calories: 500 },
    { meal: 'Snacks', carbs: 20, protein: 10, fat: 10, calories: 200 }
  ]

  const mockBreakfastItems = [
    { foodItem: 'Oatmeal with Berries', carbs: 30, protein: 5, fat: 5, calories: 200 },
    { foodItem: 'Scrambled Eggs', carbs: 10, protein: 15, fat: 10, calories: 300 }
  ]

  const mockLunchItems = [
    { foodItem: 'Chicken Salad Sandwich', carbs: 40, protein: 20, fat: 15, calories: 450 },
    { foodItem: 'Apple', carbs: 10, protein: 10, fat: 5, calories: 150 }
  ]

  const mockDinnerItems = [
    { foodItem: 'Salmon with Roasted Vegetables', carbs: 30, protein: 20, fat: 10, calories: 400 },
    { foodItem: 'Quinoa', carbs: 10, protein: 10, fat: 5, calories: 100 }
  ]

  const mockSnackItems = [
    { foodItem: 'Yogurt', carbs: 10, protein: 5, fat: 5, calories: 100 },
    { foodItem: 'Almonds', carbs: 10, protein: 5, fat: 5, calories: 100 }
  ]

  const handleDateChange = (result: any) => {
    if (result.success) {
      setNutritionData(result.data)
      setError(null)
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      console.log('sdfsdfdsfdsf');
      // const result = await getNutritionData();
      // console.log('Fetched initial data:', result);
      // handleDateChange(result);
    }
    
    fetchInitialData();
  }, []);

  return (
    <>
      <div className="layout-container flex h-full grow flex-col">
        
        {/* Main Content */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            
            

            {/* Meal Breakdown */}
            <h2 className="text-[#111714] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Meal Breakdown</h2>
            <div className="px-4 py-3">
              <div className="flex overflow-hidden rounded-lg border border-[#dce5df] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Meal</th>
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Carbs</th>
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Protein</th>
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Fat</th>
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Calories</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockMealBreakdown.map((meal, index) => (
                      <tr key={index} className="border-t border-t-[#dce5df]">
                        <td className="h-[72px] px-4 py-2 text-[#111714] text-sm font-normal leading-normal">{meal.meal}</td>
                        <td className="h-[72px] px-4 py-2 text-[#648772] text-sm font-normal leading-normal">{meal.carbs}g</td>
                        <td className="h-[72px] px-4 py-2 text-[#648772] text-sm font-normal leading-normal">{meal.protein}g</td>
                        <td className="h-[72px] px-4 py-2 text-[#648772] text-sm font-normal leading-normal">{meal.fat}g</td>
                        <td className="h-[72px] px-4 py-2 text-[#648772] text-sm font-normal leading-normal">{meal.calories} kcal</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Breakfast Details */}
            <h2 className="text-[#111714] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Breakfast (7:00 AM - 10:00 AM)</h2>
            <div className="px-4 py-3">
              <div className="flex overflow-hidden rounded-lg border border-[#dce5df] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Food Item</th>
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Carbs</th>
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Protein</th>
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Fat</th>
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Calories</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBreakfastItems.map((item, index) => (
                      <tr key={index} className="border-t border-t-[#dce5df]">
                        <td className="h-[72px] px-4 py-2 text-[#111714] text-sm font-normal leading-normal">{item.foodItem}</td>
                        <td className="h-[72px] px-4 py-2 text-[#648772] text-sm font-normal leading-normal">{item.carbs}g</td>
                        <td className="h-[72px] px-4 py-2 text-[#648772] text-sm font-normal leading-normal">{item.protein}g</td>
                        <td className="h-[72px] px-4 py-2 text-[#648772] text-sm font-normal leading-normal">{item.fat}g</td>
                        <td className="h-[72px] px-4 py-2 text-[#648772] text-sm font-normal leading-normal">{item.calories} kcal</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Lunch Details */}
            <h2 className="text-[#111714] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Lunch (12:00 PM - 2:00 PM)</h2>
            <div className="px-4 py-3">
              <div className="flex overflow-hidden rounded-lg border border-[#dce5df] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Food Item</th>
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Carbs</th>
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Protein</th>
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Fat</th>
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Calories</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockLunchItems.map((item, index) => (
                      <tr key={index} className="border-t border-t-[#dce5df]">
                        <td className="h-[72px] px-4 py-2 text-[#111714] text-sm font-normal leading-normal">{item.foodItem}</td>
                        <td className="h-[72px] px-4 py-2 text-[#648772] text-sm font-normal leading-normal">{item.carbs}g</td>
                        <td className="h-[72px] px-4 py-2 text-[#648772] text-sm font-normal leading-normal">{item.protein}g</td>
                        <td className="h-[72px] px-4 py-2 text-[#648772] text-sm font-normal leading-normal">{item.fat}g</td>
                        <td className="h-[72px] px-4 py-2 text-[#648772] text-sm font-normal leading-normal">{item.calories} kcal</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dinner Details */}
            <h2 className="text-[#111714] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Dinner (6:00 PM - 8:00 PM)</h2>
            <div className="px-4 py-3">
              <div className="flex overflow-hidden rounded-lg border border-[#dce5df] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Food Item</th>
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Carbs</th>
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Protein</th>
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Fat</th>
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Calories</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockDinnerItems.map((item, index) => (
                      <tr key={index} className="border-t border-t-[#dce5df]">
                        <td className="h-[72px] px-4 py-2 text-[#111714] text-sm font-normal leading-normal">{item.foodItem}</td>
                        <td className="h-[72px] px-4 py-2 text-[#648772] text-sm font-normal leading-normal">{item.carbs}g</td>
                        <td className="h-[72px] px-4 py-2 text-[#648772] text-sm font-normal leading-normal">{item.protein}g</td>
                        <td className="h-[72px] px-4 py-2 text-[#648772] text-sm font-normal leading-normal">{item.fat}g</td>
                        <td className="h-[72px] px-4 py-2 text-[#648772] text-sm font-normal leading-normal">{item.calories} kcal</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Snacks Details */}
            <h2 className="text-[#111714] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Snacks (Throughout the Day)</h2>
            <div className="px-4 py-3">
              <div className="flex overflow-hidden rounded-lg border border-[#dce5df] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Food Item</th>
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Carbs</th>
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Protein</th>
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Fat</th>
                      <th className="px-4 py-3 text-left text-[#111714] text-sm font-medium leading-normal">Calories</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockSnackItems.map((item, index) => (
                      <tr key={index} className="border-t border-t-[#dce5df]">
                        <td className="h-[72px] px-4 py-2 text-[#111714] text-sm font-normal leading-normal">{item.foodItem}</td>
                        <td className="h-[72px] px-4 py-2 text-[#648772] text-sm font-normal leading-normal">{item.carbs}g</td>
                        <td className="h-[72px] px-4 py-2 text-[#648772] text-sm font-normal leading-normal">{item.protein}g</td>
                        <td className="h-[72px] px-4 py-2 text-[#648772] text-sm font-normal leading-normal">{item.fat}g</td>
                        <td className="h-[72px] px-4 py-2 text-[#648772] text-sm font-normal leading-normal">{item.calories} kcal</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
