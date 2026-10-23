// import RenderSteps from "./RenderSteps"

// export default function AddCourse() {
//   return (
//     <>
//       <div className="flex w-full items-start gap-x-6">
//         <div className="flex flex-1 flex-col">
//           <h1 className="mb-14 text-3xl font-medium text-richblack-5">
//             Add Course
//           </h1>
//           <div className="flex-1">
//             <RenderSteps />
//           </div>
//         </div>
//         {/* Course Upload Tips */}
//         <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block">
//           <p className="mb-8 text-lg text-richblack-5">⚡ Course Upload Tips</p>
//           <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
//             <li>Set the Course Price option or make it free.</li>
//             <li>Standard size for the course thumbnail is 1024x576.</li>
//             <li>Video section controls the course overview video.</li>
//             <li>Course Builder is where you create & organize a course.</li>
//             <li>
//               Add Topics in the Course Builder section to create lessons,
//               quizzes, and assignments.
//             </li>
//             <li>
//               Information from the Additional Data section shows up on the
//               course single page.
//             </li>
//             <li>Make Announcements to notify any important</li>
//             <li>Notes to all enrolled students at once.</li>
//           </ul>
//         </div>
//       </div>
//     </>
//   )
// }



import RenderSteps from "./RenderSteps"

export default function AddCourse() {
  return (
    <div className="flex w-full min-w-0 flex-col items-stretch gap-6 xl:flex-row xl:items-start">
      {/* Main form section */}
      <div className="flex w-full min-w-0 flex-1 flex-col xl:w-auto">
        <h1 className="mb-6 text-2xl font-medium text-richblack-5 sm:mb-10 sm:text-3xl lg:mb-14">
          Add Course
        </h1>

        <div className="w-full min-w-0 flex-1">
          <RenderSteps />
        </div>
      </div>

      {/* Course Upload Tips */}
      <aside className="hidden w-full shrink-0 rounded-md border border-richblack-700 bg-richblack-800 p-6 xl:sticky xl:top-10 xl:block xl:w-[300px]">
        <p className="mb-6 text-lg text-richblack-5">
          ⚡ Course Upload Tips
        </p>

        <ul className="ml-5 list-disc space-y-4 text-xs leading-5 text-richblack-5">
          <li>Set the course price or make it free.</li>
          <li>Standard course thumbnail size is 1024 × 576.</li>
          <li>The video section controls the course overview video.</li>
          <li>Use Course Builder to create and organize your course.</li>
          <li>
            Add topics in Course Builder to create lessons, quizzes,
            and assignments.
          </li>
          <li>
            Information from Additional Data appears on the course
            details page.
          </li>
          <li>
            Make announcements to notify enrolled students about
            important updates.
          </li>
          <li>Add notes to help students understand your course.</li>
        </ul>
      </aside>
    </div>
  )
}
