"use client"

import Activity, { ActivityData } from "@/components/data/Activity"
import { Summary, SummaryData } from "@/components/data/Summary"
import { DatePicker } from "@/components/tremor/DatePicker"
import { Divider } from "@/components/tremor/Divider"
import { getActivityData, getProductsData, getProfileData, getSummaryData, ProfileData } from "@/lib/actions"
import { useEffect, useState } from "react"
import { Products, ProductsData } from "@/components/data/Products"
import { Navigation } from "@/components/Navigation"

export const dayTimes = ["breakfast", "lunch", "dinner", "snack"] as const;
export type DayTime = typeof dayTimes[number];

export default function OverviewPage() {

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [profile, setProfile] = useState<ProfileData | undefined>(undefined);
  const [summary, setSummary] = useState<SummaryData | undefined>(undefined);
  const [activity, setActivity] = useState<ActivityData | undefined>(undefined);
  const [products, setProducts] = useState<ProductsData[] | undefined>(undefined);

  useEffect(() => {
    const loadData = async () => {
      const formatted = (date || new Date()).toLocaleDateString('en-UK').replaceAll('/', '-').split('-').reverse().join('-');
      const profile = await getProfileData();
      const summary = await getSummaryData(formatted);
      const activity = await getActivityData(formatted);
      const products = await getProductsData(formatted);
      setProfile(profile);
      setSummary(summary);
      setActivity(activity);
      setProducts(products);
    }
    loadData();
  }, [date]);

  return (
    <div>
      <Navigation profile={profile} />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
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
            <Summary summary={summary!} profile={profile} />
            <Activity activity={activity} stepsGoal={summary?.goals.steps || 0} />
          </dl>
          <div>
            <Products products={products} meals={summary?.meals} />
          </div>
        </main>
      </div>
    </div>
  )
}
