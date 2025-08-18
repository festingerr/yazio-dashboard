'use client'

import { DayTime, dayTimes } from "@/app/(dashboard)/overview/page";
import { Card } from "../tremor/Card";
import { Divider } from "../tremor/Divider";
import { capitalize } from "lodash";
import { ProgressCircle } from "../tremor/ProgressCircle";
import { Meals } from "./Meals";
import { CategoryBar } from "../tremor/CategoryBar";

export type ProductsData = {
  name: string;
  amount: number;
  energy: number;
  daytime: DayTime;
  serving: string | null;
  quantity: number | null;
}

interface ProductsProps {
  meals: Meals[] | undefined;
  products: ProductsData[] | undefined;
}

export function Products({ meals, products }: ProductsProps) {
  return (
    <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-2">
      {dayTimes.map((dt) => {
        const meal = meals?.find((m) => m.time === dt);

        const filling = (meal?.meal.calories || 0) / (meal?.meal.energy || 1) * 100;

        return (
          <Card key={dt}>
            <div className="flex justify-between">
              <div className="mt-4 flex items-center justify-start gap-x-5 shrink-0">
                <ProgressCircle value={filling} radius={20} strokeWidth={4}>
                  <span className="text-xs font-light text-gray-900 dark:text-gray-50">
                    <small>{Math.round(filling)}%</small>
                  </span>
                </ProgressCircle>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    {capitalize(dt)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    <small>{meal?.meal.calories || 0} from {meal?.meal.energy} kcal</small>
                  </p>
                </div>
              </div>
              <div className="flex-1 ml-10">
                <CategoryBar
                  values={[meal?.meal.carbs || 0, meal?.meal.protein || 0, meal?.meal.fat || 0]}
                  className="mt-6"
                  colors={["blue", "amber", "fuchsia"]}
                  showLabels={false}
                />
                <ul role="list" className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-sm bg-blue-500 dark:bg-blue-500" aria-hidden="true" />
                    <span className="text-xs">Carbs {meal?.meal.carbs} g</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-sm bg-amber-500 dark:bg-amber-500" aria-hidden="true" />
                    <span className="text-xs">Protein {meal?.meal.protein} g</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-sm bg-fuchsia-500 dark:bg-fuchsia-500" aria-hidden="true" />
                    <span className="text-xs">Fat {meal?.meal.fat} g</span>
                  </div>
                </ul>
              </div>
            </div>
            <Divider />
            <div>
              <p className="mt-8 flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                <span>Product</span>
                <span>Weight / Energy</span>
              </p>
              <ul role="list" className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                {products?.filter((v) => v.daytime === dt).map((product) => (
                  <li key={product.name} className="flex items-center justify-between space-x-6 space-y-2">
                    <div className="flex items-center space-x-2.5 truncate">
                      <span className="truncate dark:text-gray-300">
                        {product.name}
                        {product.serving && product.quantity && (
                          <span className="ml-1 text-gray-400">
                            ({product.quantity} {product.serving})
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium tabular-nums text-gray-900 dark:text-gray-50">
                        {product.amount}&nbsp;g
                      </span>
                      <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-medium tabular-nums text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        {Math.round(product.energy)}&nbsp;kcal
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        );
      })}
    </dl>
  )
}
