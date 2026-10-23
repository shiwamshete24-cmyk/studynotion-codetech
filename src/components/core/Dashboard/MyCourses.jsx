// import { useEffect, useState } from "react"
// import { VscAdd } from "react-icons/vsc"
// import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
// import IconBtn from "../../Common/IconBtn"
// import CoursesTable from "./InstructorCourses/CoursesTable"

// export default function MyCourses() {
//   const { token } = useSelector((state) => state.auth)
//   const navigate = useNavigate()
//   const [courses, setCourses] = useState([])

//   useEffect(() => {
//     const fetchCourses = async () => {
//       const result = await fetchInstructorCourses(token)
//       if (result) {
//         setCourses(result)
//       }
//     }
//     fetchCourses()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   return (
//     <div>
//       <div className="mb-14 flex items-center justify-between">
//         <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
//         <IconBtn
//           text="Add Course"
//           onclick={() => navigate("/dashboard/add-course")}
//         >
//           <VscAdd />
//         </IconBtn>
//       </div>
//       {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
//     </div>
//   )
// }



import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../Common/IconBtn"
import CoursesTable from "./InstructorCourses/CoursesTable"

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchCourses = async () => {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const result = await fetchInstructorCourses(token)

        if (isMounted && Array.isArray(result)) {
          setCourses(result)
        }
      } catch (error) {
        console.error("Failed to fetch instructor courses:", error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchCourses()

    return () => {
      isMounted = false
    }
  }, [token])

  return (
    <div className="w-full min-w-0">
      {/* Page heading */}
      <div className="mb-6 flex min-w-0 flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between lg:mb-14">
        <h1 className="text-2xl font-medium text-richblack-5 sm:text-3xl">
          My Courses
        </h1>

        <div className="self-start sm:self-auto sm:shrink-0">
          <IconBtn
            text="Add Course"
            onclick={() => navigate("/dashboard/add-course")}
          >
            <VscAdd />
          </IconBtn>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex min-h-[200px] items-center justify-center">
          <div className="spinner" />
        </div>
      ) : courses.length > 0 ? (
        <div className="w-full min-w-0">
          <CoursesTable courses={courses} setCourses={setCourses} />
        </div>
      ) : (
        <div className="rounded-md bg-richblack-800 px-4 py-12 text-center sm:px-6 sm:py-16">
          <p className="text-lg font-semibold text-richblack-5 sm:text-xl">
            You have not created any courses yet.
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard/add-course")}
            className="mt-4 rounded-md bg-yellow-50 px-5 py-2 font-semibold text-richblack-900 hover:bg-yellow-100"
          >
            Create your first course
          </button>
        </div>
      )}
    </div>
  )
}
