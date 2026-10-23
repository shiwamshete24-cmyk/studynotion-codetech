
// import { useState } from "react"
// import { useSelector } from "react-redux"
// import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
// import { FaCheck } from "react-icons/fa"
// import { FiEdit2 } from "react-icons/fi"
// import { HiClock } from "react-icons/hi"
// import { RiDeleteBin6Line } from "react-icons/ri"
// import { useNavigate } from "react-router-dom"

// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
// import { formatDate } from "../../../../services/formatDate"
// import {
//   deleteCourse,
//   fetchInstructorCourses,
// } from "../../../../services/operations/courseDetailsAPI"
// import { COURSE_STATUS } from "../../../../utils/constants"
// import ConfirmationModal from "../../../Common/ConfirmationModal"

// export default function CoursesTable({ courses, setCourses }) {
//   const navigate = useNavigate()
//   const { token } = useSelector((state) => state.auth)
//   const [loading, setLoading] = useState(false)
//   const [confirmationModal, setConfirmationModal] = useState(null)
//   const TRUNCATE_LENGTH = 30

//   const handleCourseDelete = async (courseId) => {
//     setLoading(true)

//     try {
//       await deleteCourse({ courseId }, token)

//       const result = await fetchInstructorCourses(token)
//       if (result) {
//         setCourses(result)
//       }

//       setConfirmationModal(null)
//     } catch (error) {
//       console.error("Could not delete course:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <>
//       <Table className="rounded-xl border border-richblack-800">
//         <Thead>
//           <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
//             <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
//               Courses
//             </Th>
//             <Th className="text-left text-sm font-medium uppercase text-richblack-100">
//               Duration
//             </Th>
//             <Th className="text-left text-sm font-medium uppercase text-richblack-100">
//               Price
//             </Th>
//             <Th className="text-left text-sm font-medium uppercase text-richblack-100">
//               Actions
//             </Th>
//           </Tr>
//         </Thead>

//         <Tbody>
//           {courses?.length === 0 ? (
//             <Tr>
//               <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
//                 No courses found
//               </Td>
//             </Tr>
//           ) : (
//             courses?.map((course) => (
//               <Tr
//                 key={course._id}
//                 className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
//               >
//                 <Td className="flex flex-1 gap-x-4">
//                   <img
//                     src={course?.thumbnail}
//                     alt={course?.courseName || "Course thumbnail"}
//                     className="h-[148px] w-[220px] rounded-lg object-cover"
//                   />

//                   <div className="flex flex-col justify-between">
//                     <p className="text-lg font-semibold text-richblack-5">
//                       {course.courseName}
//                     </p>

//                     <p className="text-xs text-richblack-300">
//                       {(course.courseDescription || "").split(" ").length >
//                       TRUNCATE_LENGTH
//                         ? `${(course.courseDescription || "")
//                             .split(" ")
//                             .slice(0, TRUNCATE_LENGTH)
//                             .join(" ")}...`
//                         : course.courseDescription || ""}
//                     </p>

//                     <p className="text-[12px] text-white">
//                       Created: {formatDate(course.createdAt)}
//                     </p>

//                     {course.status === COURSE_STATUS.DRAFT ? (
//                       <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
//                         <HiClock size={14} />
//                         Drafted
//                       </p>
//                     ) : (
//                       <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
//                         <span className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
//                           <FaCheck size={8} />
//                         </span>
//                         Published
//                       </p>
//                     )}
//                   </div>
//                 </Td>

//                 <Td className="text-sm font-medium text-richblack-100">
//                   2hr 30min
//                 </Td>

//                 <Td className="text-sm font-medium text-richblack-100">
//                   ₹{course.price}
//                 </Td>

//                 <Td className="text-sm font-medium text-richblack-100">
//                   <button
//                     type="button"
//                     disabled={loading}
//                     onClick={() =>
//                       navigate(`/dashboard/edit-course/${course._id}`)
//                     }
//                     title="Edit"
//                     className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
//                   >
//                     <FiEdit2 size={20} />
//                   </button>

//                   <button
//                     type="button"
//                     disabled={loading}
//                     onClick={() =>
//                       setConfirmationModal({
//                         text1: "Do you want to delete this course?",
//                         text2:
//                           "All the data related to this course will be deleted",
//                         btn1Text: loading ? "Loading..." : "Delete",
//                         btn2Text: "Cancel",
//                         btn1Handler: () => handleCourseDelete(course._id),
//                         btn2Handler: () => setConfirmationModal(null),
//                       })
//                     }
//                     title="Delete"
//                     className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
//                   >
//                     <RiDeleteBin6Line size={20} />
//                   </button>
//                 </Td>
//               </Tr>
//             ))
//           )}
//         </Tbody>
//       </Table>

//       {confirmationModal && (
//         <ConfirmationModal modalData={confirmationModal} />
//       )}
//     </>
//   )
// }



import { useState } from "react"
import { useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { formatDate } from "../../../../services/formatDate"
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../utils/constants"
import ConfirmationModal from "../../../Common/ConfirmationModal"

export default function CoursesTable({ courses, setCourses }) {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)

  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const TRUNCATE_LENGTH = 30

  const handleCourseDelete = async (courseId) => {
    if (loading) return

    setLoading(true)

    try {
      await deleteCourse({ courseId }, token)

      const result = await fetchInstructorCourses(token)

      if (Array.isArray(result)) {
        setCourses(result)
      }

      setConfirmationModal(null)
    } catch (error) {
      console.error("Could not delete course:", error)
    } finally {
      setLoading(false)
    }
  }

  const truncateDescription = (description = "") => {
    const words = description.split(/\s+/).filter(Boolean)

    return words.length > TRUNCATE_LENGTH
      ? `${words.slice(0, TRUNCATE_LENGTH).join(" ")}...`
      : description
  }

  return (
    <>
      <div className="w-full min-w-0 overflow-x-auto rounded-xl border border-richblack-700">
        <Table className="w-full border-collapse">
          <Thead>
            <Tr className="border-b border-richblack-700 bg-richblack-800">
              <Th className="px-3 py-4 text-left text-xs font-medium uppercase text-richblack-100 sm:px-5 sm:text-sm">
                Courses
              </Th>

              <Th className="whitespace-nowrap px-3 py-4 text-left text-xs font-medium uppercase text-richblack-100 sm:px-5 sm:text-sm">
                Duration
              </Th>

              <Th className="whitespace-nowrap px-3 py-4 text-left text-xs font-medium uppercase text-richblack-100 sm:px-5 sm:text-sm">
                Price
              </Th>

              <Th className="whitespace-nowrap px-3 py-4 text-left text-xs font-medium uppercase text-richblack-100 sm:px-5 sm:text-sm">
                Actions
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {courses?.length === 0 ? (
              <Tr>
                <Td
                  colSpan={4}
                  className="px-4 py-10 text-center text-lg font-medium text-richblack-100 sm:text-2xl"
                >
                  No courses found
                </Td>
              </Tr>
            ) : (
              courses?.map((course) => (
                <Tr
                  key={course._id}
                  className="border-b border-richblack-700 last:border-b-0"
                >
                  {/* Course information */}
                  <Td className="min-w-[230px] px-3 py-5 sm:min-w-[320px] sm:px-5 sm:py-6">
                    <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:gap-4">
                      <img
                        src={course?.thumbnail}
                        alt={course?.courseName || "Course thumbnail"}
                        className="aspect-video w-full max-w-[180px] shrink-0 rounded-lg object-cover sm:h-[100px] sm:w-[150px]"
                      />

                      <div className="flex min-w-0 flex-col gap-2">
                        <p className="break-words text-sm font-semibold text-richblack-5 sm:text-base">
                          {course.courseName}
                        </p>

                        <p className="break-words text-xs leading-5 text-richblack-300">
                          {truncateDescription(course.courseDescription)}
                        </p>

                        <p className="text-xs text-white">
                          Created: {formatDate(course.createdAt)}
                        </p>

                        {course.status === COURSE_STATUS.DRAFT ? (
                          <p className="flex w-fit items-center gap-2 rounded-full bg-richblack-700 px-2 py-1 text-xs font-medium text-pink-100">
                            <HiClock size={14} />
                            Draft
                          </p>
                        ) : (
                          <p className="flex w-fit items-center gap-2 rounded-full bg-richblack-700 px-2 py-1 text-xs font-medium text-yellow-100">
                            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                              <FaCheck size={8} />
                            </span>
                            Published
                          </p>
                        )}
                      </div>
                    </div>
                  </Td>

                  {/* Duration */}
                  <Td className="whitespace-nowrap px-3 py-5 text-xs font-medium text-richblack-100 sm:px-5 sm:text-sm">
                    2hr 30min
                  </Td>

                  {/* Price */}
                  <Td className="whitespace-nowrap px-3 py-5 text-xs font-medium text-richblack-100 sm:px-5 sm:text-sm">
                    ₹{course.price}
                  </Td>

                  {/* Actions */}
                  <Td className="whitespace-nowrap px-3 py-5 sm:px-5">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        disabled={loading}
                        onClick={() =>
                          navigate(`/dashboard/edit-course/${course._id}`)
                        }
                        title="Edit course"
                        aria-label={`Edit ${course.courseName}`}
                        className="p-1 text-richblack-100 transition-colors hover:text-caribbeangreen-300 disabled:opacity-50"
                      >
                        <FiEdit2 size={19} />
                      </button>

                      <button
                        type="button"
                        disabled={loading}
                        onClick={() =>
                          setConfirmationModal({
                            text1: "Do you want to delete this course?",
                            text2:
                              "All the data related to this course will be deleted.",
                            btn1Text: loading ? "Loading..." : "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () =>
                              handleCourseDelete(course._id),
                            btn2Handler: () =>
                              setConfirmationModal(null),
                          })
                        }
                        title="Delete course"
                        aria-label={`Delete ${course.courseName}`}
                        className="p-1 text-richblack-100 transition-colors hover:text-[#ff0000] disabled:opacity-50"
                      >
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </div>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </div>

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </>
  )
}
