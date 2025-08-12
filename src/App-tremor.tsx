import React, { useState, useEffect } from 'react';
import {
  Card,
  Title,
  Text,
  Metric,
  Button,
  Grid,
  Badge,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  DonutChart,
  AreaChart,
  BarChart,
  Flex,
  Color
} from '@tremor/react';
import { fetchMealsData, type Meal } from './services/api';

interface NutritionSummary {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  mealCount: number;
}

interface DateRange {
  start: string;
  end: string;
}

const App: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days ago
    end: new Date().toISOString().split('T')[0] // today
  });

  // Calculate nutrition summary
  const nutritionSummary: NutritionSummary = React.useMemo(() => {
    return meals.reduce(
      (acc, meal) => ({
        totalCalories: acc.totalCalories + meal.calories,
        totalProtein: acc.totalProtein + meal.protein,
        totalCarbs: acc.totalCarbs + meal.carbs,
        totalFat: acc.totalFat + meal.fat,
        mealCount: acc.mealCount + 1,
      }),
      {
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        mealCount: 0,
      }
    );
  }, [meals]);

  // Fetch meals data
  const fetchMeals = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchMealsData(dateRange.start, dateRange.end);
      setMeals(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Group meals by date
  const mealsByDate = React.useMemo(() => {
    const grouped: { [date: string]: Meal[] } = {};
    meals.forEach(meal => {
      if (!grouped[meal.date]) {
        grouped[meal.date] = [];
      }
      grouped[meal.date].push(meal);
    });
    return grouped;
  }, [meals]);

  // Prepare chart data
  const chartData = React.useMemo(() => {
    const dailyData: { [date: string]: { calories: number; protein: number; carbs: number; fat: number } } = {};
    
    meals.forEach(meal => {
      if (!dailyData[meal.date]) {
        dailyData[meal.date] = { calories: 0, protein: 0, carbs: 0, fat: 0 };
      }
      dailyData[meal.date].calories += meal.calories;
      dailyData[meal.date].protein += meal.protein;
      dailyData[meal.date].carbs += meal.carbs;
      dailyData[meal.date].fat += meal.fat;
    });

    return Object.entries(dailyData).map(([date, data]) => ({
      date: new Date(date).toLocaleDateString(),
      ...data,
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [meals]);

  // Nutrition breakdown for donut chart
  const nutritionBreakdown = [
    { name: 'Protein', value: Math.round(nutritionSummary.totalProtein * 4), color: 'blue' as Color },
    { name: 'Carbs', value: Math.round(nutritionSummary.totalCarbs * 4), color: 'green' as Color },
    { name: 'Fat', value: Math.round(nutritionSummary.totalFat * 9), color: 'red' as Color },
  ];

  // Load data on mount and when date range changes
  useEffect(() => {
    fetchMeals();
  }, [dateRange]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Title className="text-3xl font-bold text-gray-900 mb-2">
            🥗 Yazio Nutrition Dashboard
          </Title>
          <Text className="text-gray-600">
            Track your nutrition data and analyze your eating patterns
          </Text>
        </div>

        {/* Date Range Controls */}
        <Card className="mb-8">
          <Title>📅 Date Range</Title>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Date
              </label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Date
              </label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <Button
                onClick={fetchMeals}
                loading={loading}
                className="w-full"
                color="blue"
              >
                🔄 Fetch Data
              </Button>
            </div>
          </div>
        </Card>

        {/* Error Display */}
        {error && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <Text className="text-red-700">❌ {error}</Text>
          </Card>
        )}

        {/* Summary Cards */}
        <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6 mb-8">
          <Card>
            <Text>🔥 Total Calories</Text>
            <Metric className="text-blue-600">
              {nutritionSummary.totalCalories.toLocaleString()}
            </Metric>
            <Text className="text-gray-600">
              {meals.length > 0 && Object.keys(mealsByDate).length > 0 && 
                `${(nutritionSummary.totalCalories / Object.keys(mealsByDate).length).toFixed(0)} avg/day`}
            </Text>
          </Card>
          
          <Card>
            <Text>🥩 Total Protein</Text>
            <Metric className="text-green-600">
              {nutritionSummary.totalProtein.toFixed(1)}g
            </Metric>
            <Text className="text-gray-600">
              {meals.length > 0 && Object.keys(mealsByDate).length > 0 && 
                `${(nutritionSummary.totalProtein / Object.keys(mealsByDate).length).toFixed(1)}g avg/day`}
            </Text>
          </Card>
          
          <Card>
            <Text>🍞 Total Carbs</Text>
            <Metric className="text-yellow-600">
              {nutritionSummary.totalCarbs.toFixed(1)}g
            </Metric>
            <Text className="text-gray-600">
              {meals.length > 0 && Object.keys(mealsByDate).length > 0 && 
                `${(nutritionSummary.totalCarbs / Object.keys(mealsByDate).length).toFixed(1)}g avg/day`}
            </Text>
          </Card>
          
          <Card>
            <Text>🥑 Total Fat</Text>
            <Metric className="text-red-600">
              {nutritionSummary.totalFat.toFixed(1)}g
            </Metric>
            <Text className="text-gray-600">
              {meals.length > 0 && Object.keys(mealsByDate).length > 0 && 
                `${(nutritionSummary.totalFat / Object.keys(mealsByDate).length).toFixed(1)}g avg/day`}
            </Text>
          </Card>
        </Grid>

        {/* Charts */}
        {chartData.length > 0 && (
          <Grid numItems={1} numItemsLg={2} className="gap-6 mb-8">
            <Card>
              <Title>📈 Daily Calories Trend</Title>
              <AreaChart
                className="h-72 mt-4"
                data={chartData}
                index="date"
                categories={["calories"]}
                colors={["blue"]}
                yAxisWidth={60}
                showLegend={false}
              />
            </Card>
            
            <Card>
              <Title>🍽️ Macronutrient Breakdown (Calories)</Title>
              <DonutChart
                className="h-72 mt-4"
                data={nutritionBreakdown}
                category="value"
                index="name"
                colors={["blue", "green", "red"]}
                showLabel={true}
              />
            </Card>
          </Grid>
        )}

        {/* Daily Macros Bar Chart */}
        {chartData.length > 0 && (
          <Card className="mb-8">
            <Title>📊 Daily Macronutrients</Title>
            <BarChart
              className="h-72 mt-4"
              data={chartData}
              index="date"
              categories={["protein", "carbs", "fat"]}
              colors={["blue", "green", "red"]}
              yAxisWidth={60}
              showLegend={true}
            />
          </Card>
        )}

        {/* Detailed Tables */}
        {Object.keys(mealsByDate).length > 0 && (
          <Card className="mb-8">
            <Title>🍽️ Meals by Date</Title>
            <div className="mt-4 space-y-6">
              {Object.entries(mealsByDate)
                .sort(([a], [b]) => b.localeCompare(a))
                .map(([date, dayMeals]) => (
                <div key={date}>
                  <Flex className="mb-3" justifyContent="between" alignItems="center">
                    <Text className="font-semibold text-lg">
                      📅 {new Date(date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Text>
                    <Badge color="blue" size="lg">
                      {dayMeals.reduce((sum, meal) => sum + meal.calories, 0).toLocaleString()} cal
                    </Badge>
                  </Flex>
                  
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Meal Type</TableHeaderCell>
                        <TableHeaderCell>Food Item</TableHeaderCell>
                        <TableHeaderCell>Calories</TableHeaderCell>
                        <TableHeaderCell>Protein (g)</TableHeaderCell>
                        <TableHeaderCell>Carbs (g)</TableHeaderCell>
                        <TableHeaderCell>Fat (g)</TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dayMeals.map((meal, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Badge color="gray">{meal.name}</Badge>
                          </TableCell>
                          <TableCell>{meal.name}</TableCell>
                          <TableCell>{meal.calories}</TableCell>
                          <TableCell>{meal.protein.toFixed(1)}</TableCell>
                          <TableCell>{meal.carbs.toFixed(1)}</TableCell>
                          <TableCell>{meal.fat.toFixed(1)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Empty State */}
        {meals.length === 0 && !loading && (
          <Card className="text-center py-12">
            <Text className="text-gray-500 text-lg mb-4">
              📭 No nutrition data found for the selected date range
            </Text>
            <Text className="text-gray-400">
              Try selecting a different date range or check your data source
            </Text>
          </Card>
        )}
      </div>
    </div>
  );
};

export default App;
