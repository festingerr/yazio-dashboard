export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#648772]"></div>
        <p className="text-[#648772] text-sm font-medium">Loading nutrition data...</p>
      </div>
    </div>
  )
}
