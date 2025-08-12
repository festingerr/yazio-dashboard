import React, { useState, useEffect } from 'react';
import {
  Card,
  Title,
  Text,
  Metric,
  DatePicker,
  Button,
  Grid,
  Flex,
  Badge,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  ProgressBar,
  DonutChart,
  AreaChart,
  BarChart,
  LineChart
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

  // Handle date change
  const handleDateChange = (field: keyof DateRange, value: string) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Initial data fetch
  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🥗 Yazio Dashboard</h1>
        <p>Track your nutrition data with ease</p>
      </header>

      <main className="app-main">
        {/* Date Selector */}
        <section className="date-selector">
          <h2>📅 Select Date Range</h2>
          <div className="date-inputs">
            <div className="date-input">
              <label htmlFor="start-date">Start Date:</label>
              <input
                id="start-date"
                type="date"
                value={dateRange.start}
                onChange={(e) => handleDateChange('start', e.target.value)}
              />
            </div>
            <div className="date-input">
              <label htmlFor="end-date">End Date:</label>
              <input
                id="end-date"
                type="date"
                value={dateRange.end}
                onChange={(e) => handleDateChange('end', e.target.value)}
              />
            </div>
            <button onClick={fetchMeals} disabled={loading} className="fetch-button">
              {loading ? 'Loading...' : '🔄 Refresh Data'}
            </button>
          </div>
        </section>

        {/* Error Display */}
        {error && (
          <section className="error">
            <p>❌ Error: {error}</p>
          </section>
        )}

        {/* Nutrition Summary */}
        <section className="nutrition-summary">
          <h2>📊 Nutrition Summary</h2>
          <div className="summary-grid">
            <div className="summary-card">
              <h3>🔥 Total Calories</h3>
              <p className="summary-value">{nutritionSummary.totalCalories.toLocaleString()}</p>
              <p className="summary-subtitle">
                Avg: {nutritionSummary.mealCount > 0 ? Math.round(nutritionSummary.totalCalories / nutritionSummary.mealCount) : 0} per meal
              </p>
            </div>
            <div className="summary-card">
              <h3>🥩 Protein</h3>
              <p className="summary-value">{nutritionSummary.totalProtein.toFixed(1)}g</p>
              <p className="summary-subtitle">
                Avg: {nutritionSummary.mealCount > 0 ? (nutritionSummary.totalProtein / nutritionSummary.mealCount).toFixed(1) : 0}g per meal
              </p>
            </div>
            <div className="summary-card">
              <h3>🍞 Carbs</h3>
              <p className="summary-value">{nutritionSummary.totalCarbs.toFixed(1)}g</p>
              <p className="summary-subtitle">
                Avg: {nutritionSummary.mealCount > 0 ? (nutritionSummary.totalCarbs / nutritionSummary.mealCount).toFixed(1) : 0}g per meal
              </p>
            </div>
            <div className="summary-card">
              <h3>🥑 Fat</h3>
              <p className="summary-value">{nutritionSummary.totalFat.toFixed(1)}g</p>
              <p className="summary-subtitle">
                Avg: {nutritionSummary.mealCount > 0 ? (nutritionSummary.totalFat / nutritionSummary.mealCount).toFixed(1) : 0}g per meal
              </p>
            </div>
          </div>
        </section>

        {/* Meals by Date */}
        <section className="meals-section">
          <h2>🍽️ Meals by Date</h2>
          {Object.keys(mealsByDate).length === 0 ? (
            <p className="no-data">No meal data available for the selected date range.</p>
          ) : (
            <div className="meals-by-date">
              {Object.entries(mealsByDate).map(([date, dateMeals]) => (
                <div key={date} className="date-group">
                  <h3 className="date-header">
                    📅 {new Date(date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </h3>
                  <div className="meals-table-wrapper">
                    <table className="meals-table">
                      <thead>
                        <tr>
                          <th>Meal</th>
                          <th>Calories</th>
                          <th>Protein (g)</th>
                          <th>Carbs (g)</th>
                          <th>Fat (g)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dateMeals.map((meal, index) => (
                          <tr key={index}>
                            <td className="meal-name">{meal.name}</td>
                            <td className="numeric">{meal.calories}</td>
                            <td className="numeric">{meal.protein.toFixed(1)}</td>
                            <td className="numeric">{meal.carbs.toFixed(1)}</td>
                            <td className="numeric">{meal.fat.toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="daily-total">
                          <td><strong>Daily Total</strong></td>
                          <td className="numeric">
                            <strong>{dateMeals.reduce((sum, meal) => sum + meal.calories, 0)}</strong>
                          </td>
                          <td className="numeric">
                            <strong>{dateMeals.reduce((sum, meal) => sum + meal.protein, 0).toFixed(1)}</strong>
                          </td>
                          <td className="numeric">
                            <strong>{dateMeals.reduce((sum, meal) => sum + meal.carbs, 0).toFixed(1)}</strong>
                          </td>
                          <td className="numeric">
                            <strong>{dateMeals.reduce((sum, meal) => sum + meal.fat, 0).toFixed(1)}</strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Daily Averages Table */}
        {Object.keys(mealsByDate).length > 0 && (
          <section className="daily-averages">
            <h2>📈 Daily Averages</h2>
            <div className="averages-table-wrapper">
              <table className="averages-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Average per Day</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>🔥 Calories</td>
                    <td className="numeric">
                      {Math.round(nutritionSummary.totalCalories / Object.keys(mealsByDate).length)}
                    </td>
                    <td className="numeric">{nutritionSummary.totalCalories.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>🥩 Protein (g)</td>
                    <td className="numeric">
                      {(nutritionSummary.totalProtein / Object.keys(mealsByDate).length).toFixed(1)}
                    </td>
                    <td className="numeric">{nutritionSummary.totalProtein.toFixed(1)}</td>
                  </tr>
                  <tr>
                    <td>🍞 Carbs (g)</td>
                    <td className="numeric">
                      {(nutritionSummary.totalCarbs / Object.keys(mealsByDate).length).toFixed(1)}
                    </td>
                    <td className="numeric">{nutritionSummary.totalCarbs.toFixed(1)}</td>
                  </tr>
                  <tr>
                    <td>🥑 Fat (g)</td>
                    <td className="numeric">
                      {(nutritionSummary.totalFat / Object.keys(mealsByDate).length).toFixed(1)}
                    </td>
                    <td className="numeric">{nutritionSummary.totalFat.toFixed(1)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>💚 Yazio Dashboard - Built with React & TypeScript</p>
      </footer>
    </div>
  );
};

export default App;
