// import { useEffect, useState } from "react"
// import { useSelector } from "react-redux"
// import { Link } from "react-router-dom"

// import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
// import { getInstructorData } from "../../../services/operations/profileAPI"
// import InstructorChart from "./InstructorDashboard/InstructorChart"

// export default function Instructor() {
//   const { token } = useSelector((state) => state.auth)
//   const { user } = useSelector((state) => state.profile)

//   const [loading, setLoading] = useState(false)
//   const [instructorData, setInstructorData] = useState([])
//   const [courses, setCourses] = useState([])

//   useEffect(() => {
//     const fetchData = async () => {
//       // Don't call protected APIs without token
//       if (!token) {
//         console.log("Token is not available")
//         return
//       }

//       setLoading(true)

//       try {
//         const instructorApiData = await getInstructorData(token)
//         const result = await fetchInstructorCourses(token)

//         console.log("Instructor Data:", instructorApiData)
//         console.log("Instructor Courses:", result)

//         if (Array.isArray(instructorApiData)) {
//           setInstructorData(instructorApiData)
//         }

//         if (Array.isArray(result)) {
//           setCourses(result)
//         }
//       } catch (error) {
//         console.log("Instructor dashboard error:", error)
//       }

//       setLoading(false)
//     }

//     fetchData()
//   }, [token])

//   const totalAmount = instructorData.reduce(
//     (acc, curr) => acc + (curr.totalAmountGenerated || 0),
//     0
//   )

//   const totalStudents = instructorData.reduce(
//     (acc, curr) => acc + (curr.totalStudentsEnrolled || 0),
//     0
//   )

//   return (
//     <div>
//       <div className="space-y-2">
//         <h1 className="text-2xl font-bold text-richblack-5">
//           Hi {user?.firstName} 👋
//         </h1>

//         <p className="font-medium text-richblack-200">
//           Let's start something new
//         </p>
//       </div>

//       {loading ? (
//         <div className="spinner"></div>
//       ) : courses.length > 0 ? (
//         <div>
//           <div className="my-4 flex h-[450px] space-x-4">
//             {/* Chart */}
//             {totalAmount > 0 || totalStudents > 0 ? (
//               <InstructorChart courses={instructorData} />
//             ) : (
//               <div className="flex-1 rounded-md bg-richblack-800 p-6">
//                 <p className="text-lg font-bold text-richblack-5">
//                   Visualize
//                 </p>

//                 <p className="mt-4 text-xl font-medium text-richblack-50">
//                   Not Enough Data To Visualize
//                 </p>
//               </div>
//             )}

//             {/* Statistics */}
//             <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
//               <p className="text-lg font-bold text-richblack-5">
//                 Statistics
//               </p>

//               <div className="mt-4 space-y-4">
//                 <div>
//                   <p className="text-lg text-richblack-200">
//                     Total Courses
//                   </p>

//                   <p className="text-3xl font-semibold text-richblack-50">
//                     {courses.length}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-lg text-richblack-200">
//                     Total Students
//                   </p>

//                   <p className="text-3xl font-semibold text-richblack-50">
//                     {totalStudents}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="text-lg text-richblack-200">
//                     Total Income
//                   </p>

//                   <p className="text-3xl font-semibold text-richblack-50">
//                     Rs. {totalAmount}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Courses */}
//           <div className="rounded-md bg-richblack-800 p-6">
//             <div className="flex items-center justify-between">
//               <p className="text-lg font-bold text-richblack-5">
//                 Your Courses
//               </p>

//               <Link to="/dashboard/my-courses">
//                 <p className="text-xs font-semibold text-yellow-50">
//                   View All
//                 </p>
//               </Link>
//             </div>

//             <div className="my-4 flex items-start space-x-6">
//               {courses.slice(0, 3).map((course) => (
//                 <div key={course._id} className="w-1/3">
//                   <img
//                     src={course.thumbnail}
//                     alt={course.courseName}
//                     className="h-[201px] w-full rounded-md object-cover"
//                   />

//                   <div className="mt-3 w-full">
//                     <p className="text-sm font-medium text-richblack-50">
//                       {course.courseName}
//                     </p>

//                     <div className="mt-1 flex items-center space-x-2">
//                       <p className="text-xs font-medium text-richblack-300">
//                         {course.studentsEnroled?.length || 0} students
//                       </p>

//                       <p className="text-xs font-medium text-richblack-300">
//                         |
//                       </p>

//                       <p className="text-xs font-medium text-richblack-300">
//                         Rs. {course.price}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
//           <p className="text-center text-2xl font-bold text-richblack-5">
//             You have not created any courses yet
//           </p>

//           <Link to="/dashboard/add-course">
//             <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
//               Create a course
//             </p>
//           </Link>
//         </div>
//       )}
//     </div>
//   )
// }




import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../../services/operations/profileAPI"
import InstructorChart from "./InstructorDashboard/InstructorChart"

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      if (!token) return

      setLoading(true)

      try {
        const [instructorApiData, result] = await Promise.all([
          getInstructorData(token),
          fetchInstructorCourses(token),
        ])

        if (!isMounted) return

        if (Array.isArray(instructorApiData)) {
          setInstructorData(instructorApiData)
        }

        if (Array.isArray(result)) {
          setCourses(result)
        }
      } catch (error) {
        console.error("Instructor dashboard error:", error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [token])

  const totalAmount = instructorData.reduce(
    (acc, curr) => acc + (Number(curr.totalAmountGenerated) || 0),
    0
  )

  const totalStudents = instructorData.reduce(
    (acc, curr) =>
      acc + (Number(curr.totalStudentsEnrolled) || 0),
    0
  )

  return (
    <div className="w-full min-w-0">
      {/* Welcome section */}
      <div className="space-y-2">
        <h1 className="break-words text-2xl font-bold text-richblack-5 sm:text-3xl">
          Hi {user?.firstName} 👋
        </h1>

        <p className="font-medium text-richblack-200">
          Let's start something new
        </p>
      </div>

      {loading ? (
        <div className="flex min-h-[250px] items-center justify-center">
          <div className="spinner" />
        </div>
      ) : courses.length > 0 ? (
        <div className="min-w-0">
          {/* Chart and statistics */}
          <div className="my-6 grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
            {/* Chart */}
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorChart courses={instructorData} />
            ) : (
              <div className="min-w-0 rounded-md bg-richblack-800 p-4 sm:p-6">
                <p className="text-lg font-bold text-richblack-5">
                  Visualize
                </p>

                <p className="mt-4 text-base font-medium text-richblack-50 sm:text-xl">
                  Not Enough Data To Visualize
                </p>
              </div>
            )}

            {/* Statistics */}
            <div className="min-w-0 rounded-md bg-richblack-800 p-4 sm:p-6">
              <p className="text-lg font-bold text-richblack-5">
                Statistics
              </p>

              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3 xl:grid-cols-1">
                <div className="min-w-0">
                  <p className="text-sm text-richblack-200 sm:text-base">
                    Total Courses
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-richblack-50 sm:text-3xl">
                    {courses.length}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-richblack-200 sm:text-base">
                    Total Students
                  </p>
                  <p className="mt-1 break-words text-2xl font-semibold text-richblack-50 sm:text-3xl">
                    {totalStudents}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-richblack-200 sm:text-base">
                    Total Income
                  </p>
                  <p className="mt-1 break-words text-2xl font-semibold text-richblack-50 sm:text-3xl">
                    Rs. {totalAmount.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Your courses */}
          <div className="min-w-0 rounded-md bg-richblack-800 p-4 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-lg font-bold text-richblack-5">
                Your Courses
              </p>

              <Link
                to="/dashboard/my-courses"
                className="shrink-0 text-xs font-semibold text-yellow-50 hover:text-yellow-100"
              >
                View All
              </Link>
            </div>

            <div className="my-4 grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="min-w-0">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="aspect-video w-full rounded-md object-cover"
                  />

                  <div className="mt-3 min-w-0">
                    <p className="break-words text-sm font-medium text-richblack-50">
                      {course.courseName}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                      <p className="text-xs font-medium text-richblack-300">
                        {course.studentsEnroled?.length || 0} students
                      </p>

                      <span className="text-xs text-richblack-500">|</span>

                      <p className="text-xs font-medium text-richblack-300">
                        Rs. {Number(course.price || 0).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 rounded-md bg-richblack-800 px-4 py-12 sm:mt-12 sm:px-6 sm:py-20">
          <p className="text-center text-xl font-bold text-richblack-5 sm:text-2xl">
            You have not created any courses yet
          </p>

          <Link
            to="/dashboard/add-course"
            className="mt-3 block text-center text-base font-semibold text-yellow-50 hover:text-yellow-100 sm:text-lg"
          >
            Create a course
          </Link>
        </div>
      )}
    </div>
  )
}
