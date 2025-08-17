"use client"

import { Card } from "../tremor/Card";
import { CategoryBar } from "../tremor/CategoryBar";
import { Meals } from "./Meals";

export type Units = {
  mass: string;
  energy: string;
  length: string;
  serving: string;
}

export type Totals = {
  fat: number;
  carbs: number;
  protein: number;
  calories: number;
}

export type SummaryData = {
  units: Units;

  steps: number;
  force: number;
  water: number;

  total: Totals;

  meals: Meals[];

  goals: {
    force: number;
    water: number;
    steps: number;
  };
}

interface SummaryProps {
  summary: SummaryData | undefined;
}

export function Summary({ summary }: SummaryProps) {
  return (
    <Card className="flex flex-col justify-between">
      <div>
        <div className="flex justify-between">
          <div>
            <dt className="text-sm font-medium text-gray-900 dark:text-gray-50">
              Eaten Calories
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-50">
              {summary?.total.calories} <small>{summary?.units.energy}</small>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-900 dark:text-gray-50 text-right">
              Burned Calories
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-50 text-right">
              {summary?.force} <small>{summary?.units.energy}</small>
            </dd>
          </div>
        </div>
      </div>
      <div>
        <CategoryBar
          values={[summary?.total.carbs || 0, summary?.total.protein || 0, summary?.total.fat || 0]}
          className="mt-6"
          colors={["blue", "amber", "fuchsia"]}
          showLabels={false}
        />
        <ul
          role="list"
          className="mt-4 flex flex-wrap gap-x-10 gap-y-4 text-sm"
        >
          <li>
            <span className="text-base font-semibold text-gray-900 dark:text-gray-50">
              {summary?.total.carbs} {summary?.units.serving}
            </span>
            <div className="flex items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-sm bg-blue-500 dark:bg-blue-500"
                aria-hidden="true"
              />
              <span className="text-sm">Carbs</span>
            </div>
          </li>
          <li>
            <span className="text-base font-semibold text-gray-900 dark:text-gray-50">
              {summary?.total.protein || 0} {summary?.units.serving}
            </span>
            <div className="flex items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-sm bg-amber-500 dark:bg-amber-500"
                aria-hidden="true"
              />
              <span className="text-sm">Protein</span>
            </div>
          </li>
          <li>
            <span className="text-base font-semibold text-gray-900 dark:text-gray-50">
              {summary?.total.fat || 0} {summary?.units.serving}
            </span>
            <div className="flex items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-sm bg-fuchsia-500 dark:bg-fuchsia-500"
                aria-hidden="true"
              />
              <span className="text-sm">Fat</span>
            </div>
          </li>
        </ul>
      </div>
    </Card>
  )
}
