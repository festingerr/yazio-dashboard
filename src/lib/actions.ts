'use server';

import { Yazio } from 'yazio';
import dotenv from 'dotenv';

dotenv.config();

const yazio = new Yazio({
  credentials: {
    username: process.env.YAZIO_USERNAME,
    password: process.env.YAZIO_PASSWORD,
  },
});

export type Profile = {
  username: string;
  initials: string;
  userview: string;
  height: number;
  dob: Date;
}

export async function getProfileData(): Promise<Profile | undefined>  {
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

export async function getNutritionData(date?: string) {
  date = date || new Date().toISOString().split('T')[0];

  try {
    const yazio = new Yazio({
      credentials: {
        username: "q4gydkik9f@privaterelay.appleid.com",
        password: "QMxfGxXCTgSDY6NK2ucu",
      },
    });

    console.log('Fetching nutrition data for date:', date);

    // const targetDate = date ? new Date(date) : new Date()
    // const items = await yazio.user.getConsumedItems({ date });

    // const ppp = await yazio.products.get('f704e3d0-70ef-4553-9be1-9531973b756c');

    // const f = await yazio.products.search

    // console.log('Fetched items: ', ppp);

    return {
      success: true,
      // data: items
    }
  } catch (error) {
    console.error('Error fetching nutrition data:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch nutrition data'
    }
  }
}

export async function updateNutritionDate(formData: FormData) {
  const date = formData.get('date') as string
  return await getNutritionData(date)
}
