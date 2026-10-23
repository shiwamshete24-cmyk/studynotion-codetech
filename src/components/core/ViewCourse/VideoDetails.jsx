
// import React, { useEffect, useRef, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate, useParams } from "react-router-dom"

// import "video-react/dist/video-react.css"
// import { BigPlayButton, Player } from "video-react"

// import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
// import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
// import IconBtn from "../../Common/IconBtn"

// const VideoDetails = () => {
//   const { courseId, sectionId, subSectionId } = useParams()
//   const navigate = useNavigate()
//   const playerRef = useRef(null)

//   const dispatch = useDispatch()

//   const { token } = useSelector((state) => state.auth)

//   const {
//     courseSectionData,
//     courseEntireData,
//     completedLectures,
//   } = useSelector((state) => state.viewCourse)

//   const [videoData, setVideoData] = useState(null)
//   const [previewSource, setPreviewSource] = useState("")
//   const [videoEnded, setVideoEnded] = useState(false)
//   const [loading, setLoading] = useState(false)

//   // Load the selected lecture whenever the route or course data changes
//   useEffect(() => {
//     if (!courseSectionData?.length) return

//     if (!courseId || !sectionId || !subSectionId) {
//       navigate("/dashboard/enrolled-courses")
//       return
//     }

//     const selectedSection = courseSectionData.find(
//       (section) => section._id === sectionId
//     )

//     if (!selectedSection) {
//       setVideoData(null)
//       return
//     }

//     const selectedVideo = selectedSection.subSection?.find(
//       (subSection) => subSection._id === subSectionId
//     )

//     if (!selectedVideo) {
//       setVideoData(null)
//       return
//     }

//     setVideoData(selectedVideo)
//     setPreviewSource(courseEntireData?.thumbnail || "")
//     setVideoEnded(false)
//   }, [
//     courseId,
//     sectionId,
//     subSectionId,
//     courseSectionData,
//     courseEntireData?.thumbnail,
//     navigate,
//   ])

//   // Find the current section index
//   const getCurrentSectionIndex = () => {
//     return courseSectionData.findIndex(
//       (section) => section._id === sectionId
//     )
//   }

//   // Check whether the current lecture is the first lecture
//   const isFirstVideo = () => {
//     const currentSectionIndex = getCurrentSectionIndex()

//     if (currentSectionIndex === -1) return true

//     const currentSection = courseSectionData[currentSectionIndex]

//     const currentSubSectionIndex = currentSection.subSection.findIndex(
//       (subSection) => subSection._id === subSectionId
//     )

//     return (
//       currentSectionIndex === 0 &&
//       currentSubSectionIndex === 0
//     )
//   }

//   // Check whether the current lecture is the last lecture
//   const isLastVideo = () => {
//     const currentSectionIndex = getCurrentSectionIndex()

//     if (currentSectionIndex === -1) return true

//     const currentSection = courseSectionData[currentSectionIndex]

//     const currentSubSectionIndex = currentSection.subSection.findIndex(
//       (subSection) => subSection._id === subSectionId
//     )

//     return (
//       currentSectionIndex === courseSectionData.length - 1 &&
//       currentSubSectionIndex === currentSection.subSection.length - 1
//     )
//   }

//   // Navigate to the next lecture
//   const goToNextVideo = () => {
//     const currentSectionIndex = getCurrentSectionIndex()

//     if (currentSectionIndex === -1) return

//     const currentSection = courseSectionData[currentSectionIndex]

//     const currentSubSectionIndex = currentSection.subSection.findIndex(
//       (subSection) => subSection._id === subSectionId
//     )

//     // Move to the next lecture in the same section
//     if (currentSubSectionIndex < currentSection.subSection.length - 1) {
//       const nextSubSection =
//         currentSection.subSection[currentSubSectionIndex + 1]

//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSection._id}`
//       )

//       return
//     }

//     // Move to the first lecture of the next section
//     if (currentSectionIndex < courseSectionData.length - 1) {
//       const nextSection = courseSectionData[currentSectionIndex + 1]
//       const nextSubSection = nextSection.subSection?.[0]

//       if (!nextSubSection) return

//       navigate(
//         `/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextSubSection._id}`
//       )
//     }
//   }

//   // Navigate to the previous lecture
//   const goToPrevVideo = () => {
//     const currentSectionIndex = getCurrentSectionIndex()

//     if (currentSectionIndex === -1) return

//     const currentSection = courseSectionData[currentSectionIndex]

//     const currentSubSectionIndex = currentSection.subSection.findIndex(
//       (subSection) => subSection._id === subSectionId
//     )

//     // Move to the previous lecture in the same section
//     if (currentSubSectionIndex > 0) {
//       const prevSubSection =
//         currentSection.subSection[currentSubSectionIndex - 1]

//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSection._id}`
//       )

//       return
//     }

//     // Move to the last lecture of the previous section
//     if (currentSectionIndex > 0) {
//       const prevSection = courseSectionData[currentSectionIndex - 1]
//       const prevSubSection =
//         prevSection.subSection?.[prevSection.subSection.length - 1]

//       if (!prevSubSection) return

//       navigate(
//         `/view-course/${courseId}/section/${prevSection._id}/sub-section/${prevSubSection._id}`
//       )
//     }
//   }

//   // Mark the current lecture as completed
//   const handleLectureCompletion = async () => {
//     if (loading || completedLectures.includes(subSectionId)) return

//     setLoading(true)

//     try {
//       const res = await markLectureAsComplete(
//         {
//           courseId,
//           subsectionId: subSectionId,
//         },
//         token
//       )

//       if (res) {
//         dispatch(updateCompletedLectures(subSectionId))
//       }
//     } catch (error) {
//       console.error("Failed to mark lecture as completed:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Rewatch the current lecture
//   const handleRewatch = () => {
//     if (playerRef.current) {
//       playerRef.current.seek(0)
//       setVideoEnded(false)
//     }
//   }

//   return (
//     <div className="flex flex-col gap-5 text-white">
//       {!videoData ? (
//         <img
//           src={previewSource}
//           alt="Course preview"
//           className="h-full w-full rounded-md object-cover"
//         />
//       ) : (
//         <Player
//           ref={playerRef}
//           aspectRatio="16:9"
//           playsInline
//           onEnded={() => setVideoEnded(true)}
//           src={videoData.videoUrl}
//         >
//           <BigPlayButton position="center" />

//           {/* Display controls when the video ends */}
//           {videoEnded && (
//             <div
//               style={{
//                 backgroundImage:
//                   "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1))",
//               }}
//               className="absolute inset-0 z-[100] grid h-full place-content-center font-inter"
//             >
//               {!completedLectures.includes(subSectionId) && (
//                 <IconBtn
//                   disabled={loading}
//                   onclick={handleLectureCompletion}
//                   text={loading ? "Loading..." : "Mark As Completed"}
//                   customClasses="text-xl max-w-max px-4 mx-auto"
//                 />
//               )}

//               <IconBtn
//                 disabled={loading}
//                 onclick={handleRewatch}
//                 text="Rewatch"
//                 customClasses="text-xl max-w-max px-4 mx-auto mt-2"
//               />

//               <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
//                 {!isFirstVideo() && (
//                   <button
//                     disabled={loading}
//                     onClick={goToPrevVideo}
//                     className="blackButton"
//                   >
//                     Prev
//                   </button>
//                 )}

//                 {!isLastVideo() && (
//                   <button
//                     disabled={loading}
//                     onClick={goToNextVideo}
//                     className="blackButton"
//                   >
//                     Next
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}
//         </Player>
//       )}

//       <h1 className="mt-4 text-3xl font-semibold">
//         {videoData?.title}
//       </h1>

//       <p className="pt-2 pb-6">
//         {videoData?.description}
//       </p>
//     </div>
//   )
// }

// export default VideoDetails




import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import "video-react/dist/video-react.css"
import { BigPlayButton, Player } from "video-react"

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import IconBtn from "../../Common/IconBtn"

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const playerRef = useRef(null)
  const dispatch = useDispatch()

  const { token } = useSelector((state) => state.auth)

  const {
    courseSectionData = [],
    courseEntireData,
    completedLectures = [],
  } = useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState(null)
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)

  // Load the selected lecture whenever route or course data changes
  useEffect(() => {
    if (!courseSectionData.length) return

    if (!courseId || !sectionId || !subSectionId) {
      navigate("/dashboard/enrolled-courses")
      return
    }

    const selectedSection = courseSectionData.find(
      (section) => section._id === sectionId
    )

    const selectedVideo = selectedSection?.subSection?.find(
      (subSection) => subSection._id === subSectionId
    )

    if (!selectedVideo) {
      setVideoData(null)
      setPreviewSource(courseEntireData?.thumbnail || "")
      setVideoEnded(false)
      return
    }

    setVideoData(selectedVideo)
    setPreviewSource(courseEntireData?.thumbnail || "")
    setVideoEnded(false)
  }, [
    courseId,
    sectionId,
    subSectionId,
    courseSectionData,
    courseEntireData?.thumbnail,
    navigate,
  ])

  // Get the current lecture position
  const getCurrentPosition = () => {
    const sectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    )

    if (sectionIndex === -1) return null

    const lectures = courseSectionData[sectionIndex].subSection || []
    const lectureIndex = lectures.findIndex(
      (lecture) => lecture._id === subSectionId
    )

    if (lectureIndex === -1) return null

    return { sectionIndex, lectureIndex }
  }

  // Check whether this is the first lecture
  const isFirstVideo = () => {
    const position = getCurrentPosition()
    if (!position) return true

    const { sectionIndex, lectureIndex } = position

    for (let i = 0; i < sectionIndex; i++) {
      if ((courseSectionData[i].subSection || []).length > 0) {
        return false
      }
    }

    return sectionIndex === 0 && lectureIndex === 0
  }

  // Check whether this is the last lecture
  const isLastVideo = () => {
    const position = getCurrentPosition()
    if (!position) return true

    const { sectionIndex, lectureIndex } = position
    const currentLectures =
      courseSectionData[sectionIndex].subSection || []

    for (let i = sectionIndex + 1; i < courseSectionData.length; i++) {
      if ((courseSectionData[i].subSection || []).length > 0) {
        return false
      }
    }

    return lectureIndex === currentLectures.length - 1
  }

  // Navigate to the next lecture, including across empty sections
  const goToNextVideo = () => {
    const position = getCurrentPosition()
    if (!position) return

    const { sectionIndex, lectureIndex } = position
    const currentSection = courseSectionData[sectionIndex]
    const lectures = currentSection.subSection || []

    if (lectureIndex < lectures.length - 1) {
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${lectures[lectureIndex + 1]._id}`
      )
      return
    }

    for (let i = sectionIndex + 1; i < courseSectionData.length; i++) {
      const nextSection = courseSectionData[i]
      const nextLecture = nextSection.subSection?.[0]

      if (nextLecture) {
        navigate(
          `/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextLecture._id}`
        )
        return
      }
    }
  }

  // Navigate to the previous lecture, including across empty sections
  const goToPrevVideo = () => {
    const position = getCurrentPosition()
    if (!position) return

    const { sectionIndex, lectureIndex } = position
    const currentSection = courseSectionData[sectionIndex]
    const lectures = currentSection.subSection || []

    if (lectureIndex > 0) {
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${lectures[lectureIndex - 1]._id}`
      )
      return
    }

    for (let i = sectionIndex - 1; i >= 0; i--) {
      const previousSection = courseSectionData[i]
      const previousLectures = previousSection.subSection || []
      const previousLecture = previousLectures[previousLectures.length - 1]

      if (previousLecture) {
        navigate(
          `/view-course/${courseId}/section/${previousSection._id}/sub-section/${previousLecture._id}`
        )
        return
      }
    }
  }

  // Mark the current lecture as completed
  const handleLectureCompletion = async () => {
    if (
      loading ||
      completedLectures.includes(subSectionId) ||
      !token
    ) {
      return
    }

    setLoading(true)

    try {
      const result = await markLectureAsComplete(
        {
          courseId,
          subsectionId: subSectionId,
        },
        token
      )

      if (result) {
        dispatch(updateCompletedLectures(subSectionId))
      }
    } catch (error) {
      console.error("Failed to mark lecture as completed:", error)
    } finally {
      setLoading(false)
    }
  }

  // Rewatch the current lecture
  const handleRewatch = () => {
    if (playerRef.current) {
      playerRef.current.seek(0)
      setVideoEnded(false)
    }
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-4 overflow-x-hidden text-white sm:gap-5">
      {/* Responsive video player */}
      <div className="relative w-full min-w-0 overflow-hidden rounded-lg bg-black">
        {videoData?.videoUrl ? (
          <Player
            ref={playerRef}
            aspectRatio="16:9"
            playsInline
            onEnded={() => setVideoEnded(true)}
            src={videoData.videoUrl}
          >
            <BigPlayButton position="center" />

            {videoEnded && (
              <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center gap-3 overflow-y-auto bg-black/75 p-3 sm:gap-4 sm:p-6">
                {!completedLectures.includes(subSectionId) && (
                  <IconBtn
                    disabled={loading}
                    onclick={handleLectureCompletion}
                    text={loading ? "Loading..." : "Mark As Completed"}
                    customClasses="mx-auto max-w-full px-3 py-2 text-sm sm:px-4 sm:text-base"
                  />
                )}

                <IconBtn
                  onclick={handleRewatch}
                  text="Rewatch"
                  customClasses="mx-auto max-w-full px-3 py-2 text-sm sm:px-4 sm:text-base"
                />

                <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                  {!isFirstVideo() && (
                    <button
                      type="button"
                      disabled={loading}
                      onClick={goToPrevVideo}
                      className="blackButton px-3 py-2 text-sm sm:px-4 sm:text-base"
                    >
                      Previous
                    </button>
                  )}

                  {!isLastVideo() && (
                    <button
                      type="button"
                      disabled={loading}
                      onClick={goToNextVideo}
                      className="blackButton px-3 py-2 text-sm sm:px-4 sm:text-base"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            )}
          </Player>
        ) : (
          <div className="grid aspect-video w-full place-items-center bg-richblack-800 px-4 text-center text-sm text-richblack-300">
            {videoData ? "Video URL is unavailable." : (
              previewSource ? (
                <img
                  src={previewSource}
                  alt="Course preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                "Loading lecture..."
              )
            )}
          </div>
        )}
      </div>

      {/* Lecture title and description */}
      <div className="w-full min-w-0 px-1 sm:px-0">
        <h1 className="break-words text-xl font-semibold leading-snug sm:text-2xl lg:text-3xl">
          {videoData?.title || "Select a lecture"}
        </h1>

        {videoData?.description && (
          <p className="whitespace-pre-wrap break-words pb-5 pt-3 text-sm leading-6 text-richblack-200 sm:pb-6 sm:pt-4 sm:text-base sm:leading-7">
            {videoData.description}
          </p>
        )}
      </div>
    </div>
  )
}

export default VideoDetails
