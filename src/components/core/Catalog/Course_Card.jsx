
// import { useEffect, useState } from "react"
// import { Link } from "react-router-dom"

// import GetAvgRating from "../../../utils/avgRating"
// import RatingStars from "../../Common/RatingStars"

// function CourseCard({ course, Height }) {
//   const [avgReviewCount, setAvgReviewCount] = useState(0)

//   useEffect(() => {
//     const count = GetAvgRating(course?.ratingAndReviews || [])
//     setAvgReviewCount(count)
//   }, [course?.ratingAndReviews])

//   return (
//     <Link to={`/courses/${course._id}`}>
//       <div>
//         <div className="rounded-lg">
//           <img
//             src={course?.thumbnail}
//             alt="Course thumbnail"
//             className={`${Height} w-full rounded-xl object-cover`}
//           />
//         </div>

//         <div className="flex flex-col gap-2 px-1 py-3">
//           <p className="text-xl text-richblack-5">
//             {course?.courseName}
//           </p>

//           <p className="text-sm text-richblack-50">
//             {course?.instructor?.firstName} {course?.instructor?.lastName}
//           </p>

//           <div className="flex items-center gap-2">
//             <span className="text-yellow-5">{avgReviewCount || 0}</span>

//             <RatingStars Review_Count={avgReviewCount} />

//             <span className="text-richblack-400">
//               {course?.ratingAndReviews?.length || 0} Ratings
//             </span>
//           </div>

//           <p className="text-xl text-richblack-5">
//             Rs. {course?.price}
//           </p>
//         </div>
//       </div>
//     </Link>
//   )
// }

// export default CourseCard



import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import GetAvgRating from "../../../utils/avgRating"
import RatingStars from "../../Common/RatingStars"

function CourseCard({ course, Height }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0)

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews || [])
    setAvgReviewCount(count)
  }, [course?.ratingAndReviews])

  return (
    <Link
      to={`/courses/${course?._id}`}
      className="block w-full min-w-0"
    >
      <div className="w-full min-w-0">
        {/* Course thumbnail */}
        <div className="overflow-hidden rounded-xl">
          <img
            src={course?.thumbnail}
            alt={course?.courseName || "Course thumbnail"}
            loading="lazy"
            className={`${
              Height || "aspect-video"
            } block w-full rounded-xl object-cover`}
          />
        </div>

        {/* Course details */}
        <div className="flex min-w-0 flex-col gap-2 px-1 py-3">
          <p className="break-words text-base font-semibold text-richblack-5 sm:text-lg lg:text-xl">
            {course?.courseName}
          </p>

          <p className="break-words text-sm text-richblack-50">
            {course?.instructor?.firstName}{" "}
            {course?.instructor?.lastName}
          </p>

          {/* Ratings */}
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-sm text-yellow-5">
              {avgReviewCount || 0}
            </span>

            <RatingStars Review_Count={avgReviewCount} />

            <span className="text-xs text-richblack-400 sm:text-sm">
              {course?.ratingAndReviews?.length || 0} Ratings
            </span>
          </div>

          {/* Price */}
          <p className="text-lg font-semibold text-richblack-5 sm:text-xl">
            Rs. {course?.price}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard
