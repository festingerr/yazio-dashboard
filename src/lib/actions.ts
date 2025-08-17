'use server';

import { Yazio } from 'yazio';
import dotenv from 'dotenv';
import { SummaryData } from "@/components/data/Summary";
import { forEach, reduce, transform } from 'lodash';
import { Meals } from "@/components/data/Meals";
import { ActivityData, Training } from "@/components/data/Activity";

dotenv.config();

const yazio = new Yazio({
  credentials: {
    username: process.env.YAZIO_USERNAME,
    password: process.env.YAZIO_PASSWORD,
  },
});

export type ProfileData = {
  username: string;
  initials: string;
  userview: string;
  height: number;
  dob: Date;
}

type ActivityObjectType = {
  energy: number,
  distance: number,
  duration: number,
  source: string | null,
  gateway: string,
  steps: number,
}

type ActivityReturned = ReturnType<typeof yazio.user.getExercises> & {
  activity: ActivityObjectType;
};

export async function getProfileData(): Promise<ProfileData | undefined>  {
  try {
    const profile = await yazio.user.get();
    return {
      username: `${profile.first_name} ${profile.last_name}`,
      initials: `${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}`,
      userview: profile.profile_image,
      height: profile.body_height,
      dob: new Date(profile.date_of_birth),
    };
  } catch (error) {
    console.error('Error fetching profile data:', error);
  }
}

export async function getActivityData(date: Date = new Date()): Promise<ActivityData | undefined> {
  const formattedDate = date.toISOString().split('T')[0];

  try {
    const activity = await yazio.user.getExercises({ date: formattedDate });
    const a = activity as unknown as ActivityReturned;

    console.log('Summary data:', a);

    return {
      steps: a.activity.steps || 0,
      distance: a.activity.distance || 0,
      calories: a.activity.energy || 0,
      training: activity.training.map((t): Training => ({
        name: t.name,
        duration: t.duration,
        distance: t.distance,
        calories: t.energy,
      })),
    };
  } catch (error) {
    console.error('Error fetching activity data:', error);
  }
}

export async function getSummaryData(date: Date = new Date()): Promise<SummaryData | undefined> {
  const formattedDate = date.toISOString().split('T')[0];
  try {
    const summary = await yazio.user.getDailySummary({ date: formattedDate });

    console.log('Summary data:', summary);

    const totals = reduce(summary.meals, (acc: any, meal) => {
      acc.energy_goal += meal.energy_goal;
      forEach(meal.nutrients, (value, key) => {
        acc.nutrients[key] = (acc.nutrients[key] || 0) + value;
      });
      return acc;
    }, { energy_goal: 0, nutrients: {} });

    return {
      steps: summary.steps,
      water: summary.water_intake,
      force: Math.round(summary.activity_energy),
      meals: transform(summary.meals, (result, v, k) => {
        result.push({
          time: k as any,
          meal: {
            fat: Math.round(v.nutrients['nutrient.fat']) || 0,
            carbs: Math.round(v.nutrients['nutrient.carb']) || 0,
            protein: Math.round(v.nutrients['nutrient.protein']) || 0,
          calories: Math.round(v.nutrients['energy.energy']) || 0,
          energy: Math.round(v.energy_goal) || 0,
        }
      })}, [] as Meals[]),
      total: {
        fat: Math.round(totals.nutrients['nutrient.fat']) || 0,
        carbs: Math.round(totals.nutrients['nutrient.carb']) || 0,
        protein: Math.round(totals.nutrients['nutrient.protein']) || 0,
        calories: Math.round(totals.nutrients['energy.energy']) || 0,
      },
      units: {
        mass: summary.units.unit_mass,
        energy: summary.units.unit_energy,
        length: summary.units.unit_length,
        serving: summary.units.unit_serving,
      },
      goals: {
        steps: summary.goals['activity.step'],
        force: summary.goals['energy.energy'],
        water: summary.goals.water,
      }
    }
  } catch (error) {
    console.error('Error fetching summary data:', error);
  }
}
