// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { Outlet, useParams } from "react-router-dom"

// import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
// import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
// import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
// import {
//   setCompletedLectures,
//   setCourseSectionData,
//   setEntireCourseData,
//   setTotalNoOfLectures,
// } from "../slices/viewCourseSlice"

// export default function ViewCourse() {
//   const { courseId } = useParams()
//   const { token } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()
//   const [reviewModal, setReviewModal] = useState(false)

//   useEffect(() => {
//     ;(async () => {
//       const courseData = await getFullDetailsOfCourse(courseId, token)
//       // console.log("Course Data here... ", courseData.courseDetails)
//       dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
//       dispatch(setEntireCourseData(courseData.courseDetails))
//       dispatch(setCompletedLectures(courseData.completedVideos))
//       let lectures = 0
//       courseData?.courseDetails?.courseContent?.forEach((sec) => {
//         lectures += sec.subSection.length
//       })
//       dispatch(setTotalNoOfLectures(lectures))
//     })()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   return (
//     <>
//       <div className="relative flex min-h-[calc(100vh-3.5rem)]">
//         <VideoDetailsSidebar setReviewModal={setReviewModal} />
//         <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
//           <div className="mx-6">
//             <Outlet />
//           </div>
//         </div>
//       </div>
//       {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
//     </>
//   )
// }




import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [reviewModal, setReviewModal] = useState(false)

  useEffect(() => {
    let isMounted = true

    const fetchCourseDetails = async () => {
      try {
        const courseData = await getFullDetailsOfCourse(courseId, token)

        if (!isMounted || !courseData?.courseDetails) return

        const courseDetails = courseData.courseDetails
        const sections = courseDetails.courseContent || []

        dispatch(setCourseSectionData(sections))
        dispatch(setEntireCourseData(courseDetails))
        dispatch(setCompletedLectures(courseData.completedVideos || []))

        const lectureCount = sections.reduce(
          (total, section) =>
            total + (section.subSection?.length || 0),
          0
        )

        dispatch(setTotalNoOfLectures(lectureCount))
      } catch (error) {
        console.error("Failed to load course details:", error)
      }
    }

    if (courseId && token) {
      fetchCourseDetails()
    }

    return () => {
      isMounted = false
    }
  }, [courseId, token, dispatch])

  return (
    <div className="relative flex min-h-[calc(100dvh-3.5rem)] w-full min-w-0 flex-col bg-richblack-900 lg:flex-row">
      {/* Mobile: collapsible course menu. Desktop: persistent sidebar. */}
      <VideoDetailsSidebar setReviewModal={setReviewModal} />

      {/* Video content remains visible on mobile, tablet and desktop. */}
      <main className="min-h-[50vh] w-full min-w-0 flex-1 overflow-x-hidden p-3 sm:p-5 lg:h-[calc(100dvh-3.5rem)] lg:min-h-0 lg:overflow-y-auto lg:p-6">
        <div className="mx-auto w-full min-w-0 max-w-[1200px]">
          <Outlet />
        </div>
      </main>

      {reviewModal && (
        <CourseReviewModal setReviewModal={setReviewModal} />
      )}
    </div>
  )
}
