
// import { useEffect, useState } from "react"
// import ProgressBar from "@ramonak/react-progress-bar"
// import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

// export default function EnrolledCourses() {
//   const { token } = useSelector((state) => state.auth)
//   const navigate = useNavigate()

//   const [enrolledCourses, setEnrolledCourses] = useState(null)

//   useEffect(() => {
//     const fetchEnrolledCourses = async () => {
//       try {
//         const res = await getUserEnrolledCourses(token)
//         const filterPublishCourse = (res || []).filter(
//           (course) => course.status !== "Draft"
//         )

//         setEnrolledCourses(filterPublishCourse)
//       } catch (error) {
//         console.error("Could not fetch enrolled courses.", error)
//         setEnrolledCourses([])
//       }
//     }

//     if (token) {
//       fetchEnrolledCourses()
//     } else {
//       setEnrolledCourses([])
//     }
//   }, [token])

//   return (
//     <>
//       <div className="text-3xl text-richblack-50">Enrolled Courses</div>

//       {!enrolledCourses ? (
//         <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//           <div className="spinner"></div>
//         </div>
//       ) : !enrolledCourses.length ? (
//         <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
//           You have not enrolled in any course yet.
//         </p>
//       ) : (
//         <div className="my-8 text-richblack-5">
//           <div className="flex rounded-t-lg bg-richblack-500">
//             <p className="w-[45%] px-5 py-3">Course Name</p>
//             <p className="w-1/4 px-2 py-3">Duration</p>
//             <p className="flex-1 px-2 py-3">Progress</p>
//           </div>

//           {enrolledCourses.map((course, i, arr) => (
//             <div
//               className={`flex items-center border border-richblack-700 ${
//                 i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
//               }`}
//               key={course._id}
//             >
//               <div
//                 className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
//                 onClick={() => {
//                   navigate(
//                     `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
//                   )
//                 }}
//               >
//                 <img
//                   src={course.thumbnail}
//                   alt="course_img"
//                   className="h-14 w-14 rounded-lg object-cover"
//                 />

//                 <div className="flex max-w-xs flex-col gap-2">
//                   <p className="font-semibold">{course.courseName}</p>

//                   <p className="text-xs text-richblack-300">
//                     {(course.courseDescription || "").length > 50
//                       ? `${course.courseDescription.slice(0, 50)}...`
//                       : course.courseDescription || ""}
//                   </p>
//                 </div>
//               </div>

//               <div className="w-1/4 px-2 py-3">
//                 {course?.totalDuration}
//               </div>

//               <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
//                 <p>Progress: {course.progressPercentage || 0}%</p>

//                 <ProgressBar
//                   completed={course.progressPercentage || 0}
//                   height="8px"
//                   isLabelVisible={false}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   )
// }



import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const res = await getUserEnrolledCourses(token)

        const filterPublishCourse = (res || []).filter(
          (course) => course.status !== "Draft"
        )

        setEnrolledCourses(filterPublishCourse)
      } catch (error) {
        console.error("Could not fetch enrolled courses.", error)
        setEnrolledCourses([])
      }
    }

    if (token) {
      fetchEnrolledCourses()
    } else {
      setEnrolledCourses([])
    }
  }, [token])

  const openCourse = (course) => {
    const sectionId = course.courseContent?.[0]?._id
    const subSectionId =
      course.courseContent?.[0]?.subSection?.[0]?._id

    if (!sectionId || !subSectionId) {
      navigate(`/view-course/${course._id}`)
      return
    }

    navigate(
      `/view-course/${course._id}/section/${sectionId}/sub-section/${subSectionId}`
    )
  }

  return (
    <div className="w-full min-w-0 text-richblack-5">
      <h1 className="mb-6 text-2xl font-semibold sm:text-3xl">
        Enrolled Courses
      </h1>

      {!enrolledCourses ? (
        <div className="grid min-h-[40vh] place-items-center">
          <div className="spinner" />
        </div>
      ) : enrolledCourses.length === 0 ? (
        <div className="flex min-h-[20vh] w-full items-center justify-center rounded-xl border border-richblack-700 bg-richblack-800 px-4 py-8 text-center">
          <p className="text-sm text-richblack-300 sm:text-base">
            You have not enrolled in any course yet.
          </p>
        </div>
      ) : (
        <div className="my-4 w-full min-w-0 sm:my-8">
          {/* Desktop and tablet table */}
          <div className="hidden overflow-hidden rounded-xl border border-richblack-700 md:block">
            <div className="grid grid-cols-12 items-center bg-richblack-700 text-sm font-semibold lg:text-base">
              <p className="col-span-6 px-4 py-4 lg:px-5">
                Course Name
              </p>
              <p className="col-span-3 px-3 py-4">
                Duration
              </p>
              <p className="col-span-3 px-3 py-4">
                Progress
              </p>
            </div>

            {enrolledCourses.map((course, index) => (
              <div
                key={course._id}
                className={`grid grid-cols-12 items-center gap-y-3 border-t border-richblack-700 ${
                  index % 2 === 0
                    ? "bg-richblack-800"
                    : "bg-richblack-900"
                }`}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => openCourse(course)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      openCourse(course)
                    }
                  }}
                  className="col-span-6 flex min-w-0 cursor-pointer items-center gap-3 px-4 py-4 lg:gap-4 lg:px-5"
                >
                  <img
                    src={course.thumbnail}
                    alt={course.courseName || "Course thumbnail"}
                    className="h-12 w-12 shrink-0 rounded-lg object-cover sm:h-16 sm:w-16"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="break-words font-semibold">
                      {course.courseName}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs text-richblack-300">
                      {course.courseDescription || ""}
                    </p>
                  </div>
                </div>

                <div className="col-span-3 px-3 py-4 text-sm lg:text-base">
                  {course.totalDuration || "N/A"}
                </div>

                <div className="col-span-3 min-w-0 px-3 py-4">
                  <p className="mb-2 text-xs sm:text-sm">
                    Progress: {course.progressPercentage || 0}%
                  </p>
                  <ProgressBar
                    completed={Math.min(
                      100,
                      Math.max(0, Number(course.progressPercentage) || 0)
                    )}
                    height="8px"
                    isLabelVisible={false}
                    bgColor="#FFD60A"
                    baseBgColor="#424854"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile course cards */}
          <div className="flex flex-col gap-4 md:hidden">
            {enrolledCourses.map((course) => (
              <div
                key={course._id}
                className="w-full min-w-0 overflow-hidden rounded-xl border border-richblack-700 bg-richblack-800"
              >
                <button
                  type="button"
                  onClick={() => openCourse(course)}
                  className="flex w-full min-w-0 items-start gap-3 p-3 text-left sm:p-4"
                >
                  <img
                    src={course.thumbnail}
                    alt={course.courseName || "Course thumbnail"}
                    className="h-20 w-20 shrink-0 rounded-lg object-cover sm:h-24 sm:w-24"
                  />

                  <div className="min-w-0 flex-1">
                    <h2 className="break-words text-sm font-semibold sm:text-base">
                      {course.courseName}
                    </h2>

                    <p className="mt-2 line-clamp-3 break-words text-xs leading-5 text-richblack-300 sm:text-sm">
                      {course.courseDescription || ""}
                    </p>

                    <span className="mt-2 inline-block text-xs font-medium text-yellow-50">
                      Continue Learning →
                    </span>
                  </div>
                </button>

                <div className="border-t border-richblack-700 px-3 py-3 sm:px-4">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                    <span className="text-richblack-300">
                      Duration
                    </span>
                    <span className="break-words text-right">
                      {course.totalDuration || "N/A"}
                    </span>
                  </div>

                  <div className="mb-2 flex items-center justify-between gap-3 text-xs sm:text-sm">
                    <span className="text-richblack-300">
                      Course Progress
                    </span>
                    <span className="shrink-0 font-medium">
                      {Math.min(
                        100,
                        Math.max(
                          0,
                          Number(course.progressPercentage) || 0
                        )
                      )}%
                    </span>
                  </div>

                  <ProgressBar
                    completed={Math.min(
                      100,
                      Math.max(0, Number(course.progressPercentage) || 0)
                    )}
                    height="8px"
                    isLabelVisible={false}
                    bgColor="#FFD60A"
                    baseBgColor="#424854"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
