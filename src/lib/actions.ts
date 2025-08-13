'use server';

import { Yazio } from 'yazio';

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
