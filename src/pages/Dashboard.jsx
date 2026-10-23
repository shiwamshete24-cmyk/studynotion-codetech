// import { useSelector } from "react-redux"
// import { Outlet } from "react-router-dom"

// import Sidebar from "../components/core/Dashboard/Sidebar"

// function Dashboard() {
//   const { loading: profileLoading } = useSelector((state) => state.profile)
//   const { loading: authLoading } = useSelector((state) => state.auth)

//   if (profileLoading || authLoading) {
//     return (
//       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//         <div className="spinner"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="relative flex min-h-[calc(100vh-3.5rem)]">
//       <Sidebar />
//       <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
//         <div className="mx-auto w-11/12 max-w-[1000px] py-10">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard

// ------------------------------------------------------------------


import { useState } from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { VscMenu } from "react-icons/vsc"

import Sidebar from "../components/core/Dashboard/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector(
    (state) => state.auth
  )

  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] w-full bg-richblack-900">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex min-h-[calc(100vh-3.5rem)] min-w-0 flex-1 flex-col">

        {/* Mobile-only menu bar */}
        <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-richblack-700 bg-richblack-900 px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open dashboard sidebar"
            className="rounded-md p-2 text-richblack-5 transition-colors hover:bg-richblack-700"
          >
            <VscMenu size={25} />
          </button>

          <span className="text-lg font-semibold text-richblack-5">
            Dashboard
          </span>
        </div>

        {/* Page content */}
        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-[1000px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard

