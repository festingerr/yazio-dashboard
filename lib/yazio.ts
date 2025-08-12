import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export interface Meal {
  date: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// For CLI usage (returns 2D array for Google Sheets)
export async function fetchMeals(startDate: string, endDate: string): Promise<any[][]> {
  const meals = await fetchMealsData(startDate, endDate);
  
  // Convert to 2D array format for Google Sheets
  const headers = ["Date", "Meal", "Calories", "Protein (g)", "Carbs (g)", "Fat (g)"];
  const rows = meals.map(meal => [
    meal.date,
    meal.name,
    meal.calories.toString(),
    meal.protein.toString(),
    meal.carbs.toString(),
    meal.fat.toString()
  ]);
  
  return [headers, ...rows];
}

// For React app usage (returns structured data)
export async function fetchMealsData(startDate: string, endDate: string): Promise<Meal[]> {
  // This is a placeholder implementation for fetching Yazio data
  // You'll need to implement the actual Yazio API integration here
  // For now, this returns sample data
  
  console.log(`Fetching meals from ${startDate} to ${endDate}`);
  
  // Generate sample data based on date range
  const start = new Date(startDate);
  const end = new Date(endDate);
  const sampleMeals: Meal[] = [];
  
  // Generate meals for each day in the range
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    
    // Add sample meals for each day
    sampleMeals.push(
      {
        date: dateStr,
        name: "Breakfast",
        calories: 300 + Math.floor(Math.random() * 100),
        protein: 12 + Math.floor(Math.random() * 8),
        carbs: 35 + Math.floor(Math.random() * 20),
        fat: 10 + Math.floor(Math.random() * 8)
      },
      {
        date: dateStr,
        name: "Lunch",
        calories: 450 + Math.floor(Math.random() * 150),
        protein: 20 + Math.floor(Math.random() * 15),
        carbs: 50 + Math.floor(Math.random() * 25),
        fat: 15 + Math.floor(Math.random() * 10)
      },
      {
        date: dateStr,
        name: "Dinner",
        calories: 500 + Math.floor(Math.random() * 200),
        protein: 25 + Math.floor(Math.random() * 20),
        carbs: 45 + Math.floor(Math.random() * 30),
        fat: 20 + Math.floor(Math.random() * 15)
      }
    );
  }
  
  return sampleMeals;
}
