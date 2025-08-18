"use client"

import { capitalize, map } from "lodash";
import { Card } from "../tremor/Card";
import { ProgressBar } from "../tremor/ProgressBar";
import { Totals } from "./Summary";
import { DayTime } from "@/app/(dashboard)/overview/page";

export type Meals = {
  time: DayTime;
  meal: Totals & { energy: number };
}

interface MealsProps {
  meals: Meals[] | undefined;
}

export function Meals({ meals }: MealsProps) {

  return (
    <Card>
      <div className="mx-auto max-w-sm space-y-2">
        {map(meals, (meal) => (
          <div key={meal.time}>
            <div className="flex items-baseline justify-between space-x-3">
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                {capitalize(meal.time)}<br/>
                <small className="text-gray-500 dark:text-gray-400">{meal.meal.calories}/{meal.meal.energy}</small>
              </span>
              <div>
                <ProgressBar variant="default" value={meal.meal.calories} max={meal.meal.energy}
                label={`${(meal.meal.calories/meal.meal.energy * 100).toFixed(0)}%`}
                className="w-60" />
                <ul role="list" className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-sm bg-blue-500 dark:bg-blue-500" aria-hidden="true" />
                    <span className="text-xs">{meal.meal.carbs} g</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-sm bg-amber-500 dark:bg-amber-500" aria-hidden="true" />
                    <span className="text-xs">{meal.meal.protein} g</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-sm bg-fuchsia-500 dark:bg-fuchsia-500" aria-hidden="true" />
                    <span className="text-xs">{meal.meal.fat} g</span>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}