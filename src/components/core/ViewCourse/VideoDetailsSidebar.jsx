// import { useEffect, useState } from "react"
// import { BsChevronDown } from "react-icons/bs"
// import { IoIosArrowBack } from "react-icons/io"
// import { useSelector } from "react-redux"
// import { useLocation, useNavigate, useParams } from "react-router-dom"

// import IconBtn from "../../Common/IconBtn"

// export default function VideoDetailsSidebar({ setReviewModal }) {
//   const [activeStatus, setActiveStatus] = useState("")
//   const [videoBarActive, setVideoBarActive] = useState("")
//   const navigate = useNavigate()
//   const location = useLocation()
//   const { sectionId, subSectionId } = useParams()
//   const {
//     courseSectionData,
//     courseEntireData,
//     totalNoOfLectures,
//     completedLectures,
//   } = useSelector((state) => state.viewCourse)

//   useEffect(() => {
//     ;(() => {
//       if (!courseSectionData.length) return
//       const currentSectionIndx = courseSectionData.findIndex(
//         (data) => data._id === sectionId
//       )
//       const currentSubSectionIndx = courseSectionData?.[
//         currentSectionIndx
//       ]?.subSection.findIndex((data) => data._id === subSectionId)
//       const activeSubSectionId =
//         courseSectionData[currentSectionIndx]?.subSection?.[
//           currentSubSectionIndx
//         ]?._id
//       setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
//       setVideoBarActive(activeSubSectionId)
//     })()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [courseSectionData, courseEntireData, location.pathname])

//   return (
//     <>
//       <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
//         <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
//           <div className="flex w-full items-center justify-between ">
//             <div
//               onClick={() => {
//                 navigate(`/dashboard/enrolled-courses`)
//               }}
//               className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
//               title="back"
//             >
//               <IoIosArrowBack size={30} />
//             </div>
//             <IconBtn
//               text="Add Review"
//               customClasses="ml-auto"
//               onclick={() => setReviewModal(true)}
//             />
//           </div>
//           <div className="flex flex-col">
//             <p>{courseEntireData?.courseName}</p>
//             <p className="text-sm font-semibold text-richblack-500">
//               {completedLectures?.length} / {totalNoOfLectures}
//             </p>
//           </div>
//         </div>

//         <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
//           {courseSectionData.map((course, index) => (
//             <div
//               className="mt-2 cursor-pointer text-sm text-richblack-5"
//               onClick={() => setActiveStatus(course?._id)}
//               key={index}
//             >
//               {/* Section */}
//               <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
//                 <div className="w-[70%] font-semibold">
//                   {course?.sectionName}
//                 </div>
//                 <div className="flex items-center gap-3">
//                   {/* <span className="text-[12px] font-medium">
//                     Lession {course?.subSection.length}
//                   </span> */}
//                   <span
//                     className={`${
//                       activeStatus === course?.sectionName
//                         ? "rotate-0"
//                         : "rotate-180"
//                     } transition-all duration-500`}
//                   >
//                     <BsChevronDown />
//                   </span>
//                 </div>
//               </div>

//               {/* Sub Sections */}
//               {activeStatus === course?._id && (
//                 <div className="transition-[height] duration-500 ease-in-out">
//                   {course.subSection.map((topic, i) => (
//                     <div
//                       className={`flex gap-3  px-5 py-2 ${
//                         videoBarActive === topic._id
//                           ? "bg-yellow-200 font-semibold text-richblack-800"
//                           : "hover:bg-richblack-900"
//                       } `}
//                       key={i}
//                       onClick={() => {
//                         navigate(
//                           `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
//                         )
//                         setVideoBarActive(topic._id)
//                       }}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={completedLectures.includes(topic?._id)}
//                         onChange={() => {}}
//                       />
//                       {topic.title}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }




import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import IconBtn from "../../Common/IconBtn"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { courseId, sectionId, subSectionId } = useParams()

  const {
    courseSectionData = [],
    courseEntireData,
    totalNoOfLectures = 0,
    completedLectures = [],
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    const currentSection = courseSectionData.find(
      (section) => section._id === sectionId
    )

    if (currentSection) {
      setActiveStatus(currentSection._id)
    }
  }, [courseSectionData, sectionId, subSectionId, location.pathname])

  const goBack = () => {
    navigate("/dashboard/enrolled-courses")
    setMobileSidebarOpen(false)
  }

  const openLecture = (section, topic) => {
    navigate(
      `/view-course/${courseId || courseEntireData?._id}/section/${section._id}/sub-section/${topic._id}`
    )
    setActiveStatus(section._id)
    setMobileSidebarOpen(false)
  }

  const sidebarContent = (
    <>
      {/* Sidebar header */}
      <div className="flex shrink-0 flex-col gap-4 border-b border-richblack-600 px-4 py-4 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goBack}
            aria-label="Back to enrolled courses"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-richblack-100 text-richblack-700 transition hover:scale-95"
          >
            <IoIosArrowBack size={24} />
          </button>

          <div className="min-w-0 flex-1 text-right">
            <p className="break-words text-sm font-semibold text-richblack-5 sm:text-base">
              {courseEntireData?.courseName || "Course Content"}
            </p>
            <p className="mt-1 text-xs text-richblack-300">
              {completedLectures.length} / {totalNoOfLectures} lectures completed
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <IconBtn
            text="Add Review"
            customClasses="max-w-full text-sm"
            onclick={() => {
              setReviewModal(true)
              setMobileSidebarOpen(false)
            }}
          />
        </div>
      </div>

      {/* Scrollable lecture list */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {courseSectionData.map((section) => {
          const expanded = activeStatus === section._id
          const lectures = section.subSection || []

          return (
            <div key={section._id} className="mt-2 text-sm text-richblack-5">
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() =>
                  setActiveStatus(expanded ? "" : section._id)
                }
                className="flex w-full items-center justify-between gap-3 bg-richblack-700 px-4 py-4 text-left hover:bg-richblack-600 sm:px-5"
              >
                <span className="min-w-0 flex-1 break-words font-semibold">
                  {section.sectionName}
                </span>

                <span className="shrink-0 text-xs text-richblack-200">
                  {lectures.length} lectures
                </span>

                <BsChevronDown
                  className={`shrink-0 transition-transform duration-200 ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expanded && (
                <div className="bg-richblack-800">
                  {lectures.map((topic) => {
                    const isCompleted = completedLectures.includes(topic._id)
                    const isActive = subSectionId === topic._id

                    return (
                      <button
                        type="button"
                        key={topic._id}
                        onClick={() => openLecture(section, topic)}
                        className={`flex w-full min-w-0 items-start gap-3 px-4 py-3 text-left sm:px-5 ${
                          isActive
                            ? "bg-yellow-200 font-semibold text-richblack-900"
                            : "text-richblack-100 hover:bg-richblack-700"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isCompleted}
                          readOnly
                          tabIndex={-1}
                          aria-label={`${topic.title} ${
                            isCompleted ? "completed" : "not completed"
                          }`}
                          className="mt-1 h-4 w-4 shrink-0 accent-yellow-500"
                        />

                        <span className="min-w-0 flex-1 break-words leading-5">
                          {topic.title}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )

  return (
    <>
      {/* Mobile and tablet: collapsible course menu */}
      <div className="relative z-30 w-full shrink-0 border-b border-richblack-700 bg-richblack-800 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileSidebarOpen((open) => !open)}
          aria-expanded={mobileSidebarOpen}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
        >
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-richblack-5">
              Course Content
            </p>
            <p className="mt-1 text-xs text-richblack-300">
              {completedLectures.length} / {totalNoOfLectures} completed
            </p>
          </div>

          <BsChevronDown
            className={`shrink-0 transition-transform ${
              mobileSidebarOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {mobileSidebarOpen && (
          <div className="flex max-h-[60dvh] flex-col overflow-hidden border-t border-richblack-700">
            {sidebarContent}
          </div>
        )}
      </div>

      {/* Desktop: persistent sidebar */}
      <aside className="hidden h-[calc(100dvh-3.5rem)] w-[280px] shrink-0 flex-col overflow-hidden border-r border-richblack-700 bg-richblack-800 lg:flex xl:w-[320px]">
        {sidebarContent}
      </aside>
    </>
  )
}
