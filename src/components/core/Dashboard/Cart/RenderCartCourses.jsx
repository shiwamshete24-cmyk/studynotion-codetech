// import { FaStar } from "react-icons/fa"
// import { RiDeleteBin6Line } from "react-icons/ri"
// import ReactStars from "react-rating-stars-component"
// import { useDispatch, useSelector } from "react-redux"

// import { removeFromCart } from "../../../../slices/cartSlice"

// export default function RenderCartCourses() {
//   const { cart } = useSelector((state) => state.cart)
//   const dispatch = useDispatch()
//   return (
//     <div className="flex flex-1 flex-col">
//       {cart.map((course, indx) => (
//         <div
//           key={course._id}
//           className={`flex w-full flex-wrap items-start justify-between gap-6 ${
//             indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
//           } ${indx !== 0 && "mt-6"} `}
//         >
//           <div className="flex flex-1 flex-col gap-4 xl:flex-row">
//             <img
//               src={course?.thumbnail}
//               alt={course?.courseName}
//               className="h-[148px] w-[220px] rounded-lg object-cover"
//             />
//             <div className="flex flex-col space-y-1">
//               <p className="text-lg font-medium text-richblack-5">
//                 {course?.courseName}
//               </p>
//               <p className="text-sm text-richblack-300">
//                 {course?.category?.name}
//               </p>
//               <div className="flex items-center gap-2">
//                 <span className="text-yellow-5">4.5</span>
//                 <ReactStars
//                   count={5}
//                   value={course?.ratingAndReviews?.length}
//                   size={20}
//                   edit={false}
//                   activeColor="#ffd700"
//                   emptyIcon={<FaStar />}
//                   fullIcon={<FaStar />}
//                 />
//                 <span className="text-richblack-400">
//                   {course?.ratingAndReviews?.length} Ratings
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-end space-y-2">
//             <button
//               onClick={() => dispatch(removeFromCart(course._id))}
//               className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
//             >
//               <RiDeleteBin6Line />
//               <span>Remove</span>
//             </button>
//             <p className="mb-6 text-3xl font-medium text-yellow-100">
//               ₹ {course?.price}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }




import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"

import { removeFromCart } from "../../../../slices/cartSlice"

export default function RenderCartCourses() {
  const { cart = [] } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  return (
    <div className="flex w-full min-w-0 flex-col">
      {cart.map((course, index) => {
        const ratingCount = course?.ratingAndReviews?.length || 0

        return (
          <article
            key={course._id}
            className={`flex w-full min-w-0 flex-col gap-4 py-5 sm:gap-5 md:flex-row md:items-start md:justify-between ${
              index !== 0 ? "border-t border-richblack-700" : ""
            }`}
          >
            {/* Course information */}
            <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row">
              <img
                src={course?.thumbnail}
                alt={course?.courseName || "Course thumbnail"}
                loading="lazy"
                className="aspect-video w-full shrink-0 rounded-lg object-cover sm:w-40 md:w-44 lg:w-48"
              />

              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <h2 className="break-words text-base font-semibold text-richblack-5 sm:text-lg">
                  {course?.courseName}
                </h2>

                <p className="break-words text-sm text-richblack-300">
                  {course?.category?.name || "Course"}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-yellow-100">
                    4.5
                  </span>

                  <ReactStars
                    count={5}
                    value={4.5}
                    size={18}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />

                  <span className="text-xs text-richblack-300 sm:text-sm">
                    ({ratingCount} {ratingCount === 1 ? "rating" : "ratings"})
                  </span>
                </div>
              </div>
            </div>

            {/* Price and remove action */}
            <div className="flex w-full items-center justify-between gap-3 border-t border-richblack-700 pt-3 sm:border-0 sm:pt-0 md:w-auto md:min-w-[130px] md:flex-col md:items-end">
              <p className="text-xl font-semibold text-yellow-100 sm:text-2xl">
                ₹ {course?.price}
              </p>

              <button
                type="button"
                onClick={() => dispatch(removeFromCart(course._id))}
                aria-label={`Remove ${course?.courseName || "course"} from cart`}
                className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-richblack-600 bg-richblack-700 px-3 py-2.5 text-sm font-medium text-pink-200 transition hover:bg-richblack-600 focus:outline-none focus:ring-2 focus:ring-pink-200 sm:px-4"
              >
                <RiDeleteBin6Line className="text-lg" />
                <span>Remove</span>
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}
