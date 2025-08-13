'use client'

import { useState, useEffect } from 'react';
import Header from './Header';
import { getNutritionData } from '@/lib/actions';

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
      const result = await getNutritionData();
      console.log('Fetched initial data:', result);
      // handleDateChange(result);
    }
    
    fetchInitialData();
  }, []);

  return (
    <>
      <div className="shadow-s sticky top-0 z-20 bg-white dark:bg-gray-950">
        <Header/>
      </div>
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f4f2] px-10 py-3">
          <div className="flex items-center gap-4 text-[#111714]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M39.998 35.764C39.9944 35.7463 39.9875 35.7155 39.9748 35.6706C39.9436 35.5601 39.8949 35.4259 39.8346 35.2825C39.8168 35.2403 39.7989 35.1993 39.7813 35.1602C38.5103 34.2887 35.9788 33.0607 33.7095 32.5189C30.9875 31.8691 27.6413 31.4783 24 31.4783C20.3587 31.4783 17.0125 31.8691 14.2905 32.5189C12.0012 33.0654 9.44505 34.3104 8.18538 35.1832C8.17384 35.2075 8.16216 35.233 8.15052 35.2592C8.09919 35.3751 8.05721 35.4886 8.02977 35.589C8.00356 35.6848 8.00039 35.7333 8.00004 35.7388C8.00004 35.739 8 35.7393 8.00004 35.7388C8.00004 35.7641 8.0104 36.0767 8.68485 36.6314C9.34546 37.1746 10.4222 37.7531 11.9291 38.2772C14.9242 39.319 19.1919 40 24 40C28.8081 40 33.0758 39.319 36.0709 38.2772C37.5778 37.7531 38.6545 37.1746 39.3151 36.6314C39.9006 36.1499 39.9857 35.8511 39.998 35.764ZM4.95178 32.7688L21.4543 6.30267C22.6288 4.4191 25.3712 4.41909 26.5457 6.30267L43.0534 32.777C43.0709 32.8052 43.0878 32.8338 43.104 32.8629L41.3563 33.8352C43.104 32.8629 43.1038 32.8626 43.104 32.8629L43.1051 32.865L43.1065 32.8675L43.1101 32.8739L43.1199 32.8918C43.1276 32.906 43.1377 32.9246 43.1497 32.9473C43.1738 32.9925 43.2062 33.0545 43.244 33.1299C43.319 33.2792 43.4196 33.489 43.5217 33.7317C43.6901 34.1321 44 34.9311 44 35.7391C44 37.4427 43.003 38.7775 41.8558 39.7209C40.6947 40.6757 39.1354 41.4464 37.385 42.0552C33.8654 43.2794 29.133 44 24 44C18.867 44 14.1346 43.2794 10.615 42.0552C8.86463 41.4464 7.30529 40.6757 6.14419 39.7209C4.99695 38.7775 3.99999 37.4427 3.99999 35.7391C3.99999 34.8725 4.29264 34.0922 4.49321 33.6393C4.60375 33.3898 4.71348 33.1804 4.79687 33.0311C4.83898 32.9556 4.87547 32.8935 4.9035 32.8471C4.91754 32.8238 4.92954 32.8043 4.93916 32.7889L4.94662 32.777L4.95178 32.7688ZM35.9868 29.004L24 9.77997L12.0131 29.004C12.4661 28.8609 12.9179 28.7342 13.3617 28.6282C16.4281 27.8961 20.0901 27.4783 24 27.4783C27.9099 27.4783 31.5719 27.8961 34.6383 28.6282C35.082 28.7342 35.5339 28.8609 35.9868 29.004Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-[#111714] text-lg font-bold leading-tight tracking-[-0.015em]">NutriTrack</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-[#111714] text-sm font-medium leading-normal" href="#">Dashboard</a>
              <a className="text-[#111714] text-sm font-medium leading-normal" href="#">Food</a>
              <a className="text-[#111714] text-sm font-medium leading-normal" href="#">Recipes</a>
              <a className="text-[#111714] text-sm font-medium leading-normal" href="#">Settings</a>
            </div>
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f0f4f2] text-[#111714] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
              <div className="text-[#111714]" data-icon="Bell" data-size="20px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z" />
                </svg>
              </div>
            </button>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBbN0MiSNiTheCrooJW0ivNoLagRJ5hcE3bt_ICQv12cWOJnRiUuGqCu9OGrNeqYdZ9xrpbRDgLMv1A3_3SRGoyBki5fjyR1pMoubF2GyKE7JMHaCJ0PIgsAVvwZ6msKLGKN4BQhKOUgNZ5j7nSXtE19iO4Km8HGVzC-yFbv03qffyaNjEWFqJz934duaj8M6xM5xorct3Itkc_alyChSn_NDtPRN_5n1AUHRej2B5UtBW3QDjKL_oZoId-UR-rnSKhr2_tkJiIAFY")'
              }}
            />
          </div>
        </header>

        {/* Main Content */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            
            {/* Page Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#111714] tracking-light text-[32px] font-bold leading-tight">Daily Nutrition Report</p>
                <p className="text-[#648772] text-sm font-normal leading-normal">Printable and exportable report for your daily food intake.</p>
              </div>
            </div>

            {/* Date Selector with Server Action */}
            {/* <DateSelector 
              initialDate={selectedDate}
              onDateChange={handleDateChange}
            /> */}

            {error && (
              <div className="mx-4 mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">Error: {error}</p>
              </div>
            )}

            {/* Daily Totals */}
            <h2 className="text-[#111714] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Daily Totals</h2>
            <div className="flex flex-wrap gap-4 p-4">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#dce5df]">
                <p className="text-[#111714] text-base font-medium leading-normal">Carbs</p>
                <p className="text-[#111714] tracking-light text-2xl font-bold leading-tight">{mockNutritionData.carbs}g</p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#dce5df]">
                <p className="text-[#111714] text-base font-medium leading-normal">Protein</p>
                <p className="text-[#111714] tracking-light text-2xl font-bold leading-tight">{mockNutritionData.protein}g</p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#dce5df]">
                <p className="text-[#111714] text-base font-medium leading-normal">Fat</p>
                <p className="text-[#111714] tracking-light text-2xl font-bold leading-tight">{mockNutritionData.fat}g</p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#dce5df]">
                <p className="text-[#111714] text-base font-medium leading-normal">Calories</p>
                <p className="text-[#111714] tracking-light text-2xl font-bold leading-tight">{mockNutritionData.calories} kcal</p>
              </div>
            </div>

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
