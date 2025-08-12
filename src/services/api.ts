// services/api.ts
export interface Meal {
  date: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// This would normally make HTTP calls to your backend API
// For now, we'll simulate the data locally
export async function fetchMealsData(startDate: string, endDate: string): Promise<Meal[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate sample data based on date range
  const start = new Date(startDate);
  const end = new Date(endDate);
  const sampleMeals: Meal[] = [];
  
  // Generate meals for each day in the range
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    
    // Add sample meals for each day with some randomization
    const mealsForDay = [
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
    ];
    
    // Randomly include snacks
    if (Math.random() > 0.5) {
      mealsForDay.push({
        date: dateStr,
        name: "Snack",
        calories: 100 + Math.floor(Math.random() * 100),
        protein: 3 + Math.floor(Math.random() * 5),
        carbs: 15 + Math.floor(Math.random() * 10),
        fat: 5 + Math.floor(Math.random() * 5)
      });
    }
    
    sampleMeals.push(...mealsForDay);
  }
  
  return sampleMeals;
}
