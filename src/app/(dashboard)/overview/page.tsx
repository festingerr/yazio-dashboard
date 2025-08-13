"use client"

import Dashboard from "@/components/Dashboard"
import { Button } from "@/components/Button"

export default function OverviewPage() {
  return (
    <main>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
            Support Dashboard
          </h1>
          <p className="text-gray-500 sm:text-sm/6 dark:text-gray-500">
            Real-time monitoring of support metrics with AI-powered insights
          </p>
        </div>
        <Button
          // onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-base sm:text-sm"
        >
          Create Ticket
          {/* <RiAddLine className="-mr-0.5 size-5 shrink-0" aria-hidden="true" /> */}
        </Button>
        {/* <TicketDrawer open={isOpen} onOpenChange={setIsOpen} /> */}
      </div>
    </main>
    // <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
    //   <Suspense fallback={<Loading />}>
    //     <Dashboard />
    //   </Suspense>
    // </div>
  )
}
