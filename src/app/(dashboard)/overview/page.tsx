"use client"

import Activity, { ActivityData } from "@/components/data/Activity"
import { Meals } from "@/components/data/Meals"
import { Summary, SummaryData } from "@/components/data/Summary"
import { DatePicker } from "@/components/tremor/DatePicker"
import { Divider } from "@/components/tremor/Divider"
import { getActivityData, getProductsData, getSummaryData } from "@/lib/actions"
import { useEffect, useState } from "react"
import { Products, ProductsData } from "@/components/data/Products"

export const dayTimes = ["breakfast", "lunch", "dinner", "snack"] as const;
export type DayTime = typeof dayTimes[number];

export default function OverviewPage() {

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [summary, setSummary] = useState<SummaryData | undefined>(undefined);
  const [activity, setActivity] = useState<ActivityData | undefined>(undefined);
  const [products, setProducts] = useState<ProductsData[] | undefined>(undefined);

  useEffect(() => {
    const loadData = async () => {
      const summary = await getSummaryData(date);
      const activity = await getActivityData(date);
      const products = await getProductsData(date);
      console.log(products);
      setSummary(summary);
      setActivity(activity);
      setProducts(products);
    }
    loadData();
  }, [date]);

  return (
    <main>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Daily Nutrition Report
          </h1>
          <p className="text-gray-500 sm:text-sm/6 dark:text-gray-500">
            Printable and exportable report for your daily food intake.
          </p>
        </div>
        <DatePicker value={date} onChange={setDate} className="w-60" />
      </div>
      <Divider />
      <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        <Summary summary={summary!} />
        {/* <Meals meals={summary?.meals} /> */}
        <Activity activity={activity} stepsGoal={summary?.goals.steps || 0} />
      </dl>
      <div>
        <Products products={products} meals={summary?.meals} />
      </div>
    </main>
  )
}
