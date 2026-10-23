// import { useSelector } from "react-redux"

// import RenderCartCourses from "./RenderCartCourses"
// import RenderTotalAmount from "./RenderTotalAmount"

// export default function Cart() {
//   const { total, totalItems } = useSelector((state) => state.cart)
//   const { paymentLoading } = useSelector((state) => state.course)

//   if (paymentLoading)
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <div className="spinner"></div>
//       </div>
//     )

//   return (
//     <>
//       <h1 className="mb-14 text-3xl font-medium text-richblack-5">Cart</h1>
//       <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
//         {totalItems} Courses in Cart
//       </p>
//       {total > 0 ? (
//         <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
//           <RenderCartCourses />
//           <RenderTotalAmount />
//         </div>
//       ) : (
//         <p className="mt-14 text-center text-3xl text-richblack-100">
//           Your cart is empty
//         </p>
//       )}
//     </>
//   )
// }



import { useSelector } from "react-redux"

import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { total = 0, totalItems = 0 } = useSelector(
    (state) => state.cart
  )
  const { paymentLoading } = useSelector((state) => state.course)

  if (paymentLoading) {
    return (
      <div className="grid min-h-[60vh] w-full place-items-center">
        <div className="spinner" />
      </div>
    )
  }

  return (
    <div className="w-full min-w-0 text-richblack-5">
      {/* Page heading */}
      <h1 className="mb-6 text-2xl font-semibold sm:mb-10 sm:text-3xl">
        Cart
      </h1>

      {/* Cart item count */}
      <div className="border-b border-richblack-600 pb-3">
        <p className="text-sm font-medium text-richblack-300 sm:text-base">
          {totalItems} {totalItems === 1 ? "Course" : "Courses"} in Cart
        </p>
      </div>

      {total > 0 ? (
        <div className="mt-5 flex w-full min-w-0 flex-col gap-6 lg:mt-8 lg:flex-row lg:items-start lg:gap-8">
          {/* Cart items */}
          <div className="w-full min-w-0 flex-1">
            <RenderCartCourses />
          </div>

          {/* Order total and checkout */}
          <aside className="w-full min-w-0 rounded-xl border border-richblack-700 bg-richblack-800 p-4 sm:p-5 lg:sticky lg:top-6 lg:w-[300px] lg:flex-none xl:w-[340px]">
            <RenderTotalAmount />
          </aside>
        </div>
      ) : (
        <div className="mt-8 flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-richblack-700 bg-richblack-800 px-4 py-10 text-center sm:mt-12">
          <p className="text-xl font-semibold sm:text-2xl">
            Your cart is empty
          </p>

          <p className="mt-2 max-w-sm text-sm leading-6 text-richblack-300">
            Explore our courses and add one to your cart to get started.
          </p>
        </div>
      )}
    </div>
  )
}
