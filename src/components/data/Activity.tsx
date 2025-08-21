"use client"

import { RemixiconComponentType, RiRidingLine } from "@remixicon/react";
import { Card } from "../tremor/Card";
import { ProgressCircle } from "../tremor/ProgressCircle";
import { createElement } from "react";

export type Training = {
    name: string;
    duration: number;
    distance: number;
    calories: number;
}

export type ActivityData = {
  steps: number;
  distance: number;
  calories: number;
  training: Training[];
}

interface ActivityProps {
  activity: ActivityData | undefined;
  stepsGoal: number;
}

const activitiesIconsMap: Record<string, RemixiconComponentType> = {
  cyclingwork: RiRidingLine,
  cyclingfast: RiRidingLine,
}

export default function Activity({ activity, stepsGoal }: ActivityProps) {
  return (
    <Card>
      <dt className="text-sm font-medium text-gray-900 dark:text-gray-50">
        Activity & Training
      </dt>
      <div>
        <div className="mt-4 flex items-center justify-start gap-x-5">
          <ProgressCircle value={Math.round((activity?.steps || 0) / stepsGoal * 100)} radius={20} color="bg-blue-500" strokeWidth={2}>
            <span className="text-xs font-light text-gray-900 dark:text-gray-50">
              <small>{Math.round((activity?.steps || 0) / stepsGoal * 100)}%</small>
            </span>
          </ProgressCircle>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
              🔥&nbsp;{Math.round(activity?.calories || 0)}&nbsp;kcal,
              🏁&nbsp;{((activity?.distance || 0) / 1000).toFixed(2)}&nbsp;km,
              🏃&nbsp;{activity?.steps} from {stepsGoal} steps
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              from Apple Health data
            </p>
          </div>
        </div>
        <div>
          <p className="mt-8 flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
            <span>Activity</span>
            <span>Distance / Energy</span>
          </p>
          <ul role="list" className="mt-2 divide-y divide-gray-200 text-sm text-gray-500 dark:divide-gray-800 dark:text-gray-500">
            {activity?.training.map((training) => (
              <li key={training.name} className="flex items-center justify-between space-x-6">
                <div className="flex items-center space-x-2.5 truncate">
                  <span className="truncate dark:text-gray-300">
                    {activitiesIconsMap[training.name] && createElement(activitiesIconsMap[training.name], { className: "inline-block mr-1 h-4" })}
                    {!activitiesIconsMap[training.name] && training.name}
                    { training.duration } min, <small>{training.name}</small>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium tabular-nums text-gray-900 dark:text-gray-500">
                    {(training.distance / 1000).toFixed(2)} km
                  </span>
                  <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-medium tabular-nums text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    {Math.round(training.calories)} kcal
                  </span>
                </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Card>
  ); 
}
