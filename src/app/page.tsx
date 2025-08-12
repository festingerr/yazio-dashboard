import { Suspense } from 'react'
import NutritionDashboard from './components/NutritionDashboard'
import Loading from './loading'

export default function HomePage() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
      <Suspense fallback={<Loading />}>
        <NutritionDashboard />
      </Suspense>
    </div>
  )
}
