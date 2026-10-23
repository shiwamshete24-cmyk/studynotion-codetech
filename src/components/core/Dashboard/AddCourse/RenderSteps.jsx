// import { FaCheck } from "react-icons/fa"
// import { useSelector } from "react-redux"

// import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
// import CourseInformationForm from "./CourseInformation/CourseInformationForm"
// import PublishCourse from "./PublishCourse"

// export default function RenderSteps() {
//   const { step } = useSelector((state) => state.course)

//   const steps = [
//     {
//       id: 1,
//       title: "Course Information",
//     },
//     {
//       id: 2,
//       title: "Course Builder",
//     },
//     {
//       id: 3,
//       title: "Publish",
//     },
//   ]

//   return (
//     <>
//       <div className="relative mb-2 flex w-full justify-center">
//         {steps.map((item) => (
//           <>
//             <div
//               className="flex flex-col items-center "
//               key={item.id}
//             >
//               <button
//                 className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
//                   step === item.id
//                     ? "border-yellow-50 bg-yellow-900 text-yellow-50"
//                     : "border-richblack-700 bg-richblack-800 text-richblack-300"
//                 } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
//               >
//                 {step > item.id ? (
//                   <FaCheck className="font-bold text-richblack-900" />
//                 ) : (
//                   item.id
//                 )}
//               </button>
              
//             </div>
//             {item.id !== steps.length && (
//               <>
//                 <div
//                   className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
//                   step > item.id  ? "border-yellow-50" : "border-richblack-500"
//                 } `}
//                 ></div>
//               </>
//             )}
//           </>
//         ))}
//       </div>

//       <div className="relative mb-16 flex w-full select-none justify-between">
//         {steps.map((item) => (
//           <>
//             <div
//               className="flex min-w-[130px] flex-col items-center gap-y-2"
//               key={item.id}
//             >
              
//               <p
//                 className={`text-sm ${
//                   step >= item.id ? "text-richblack-5" : "text-richblack-500"
//                 }`}
//               >
//                 {item.title}
//               </p>
//             </div>
            
//           </>
//         ))}
//       </div>
//       {/* Render specific component based on current step */}
//       {step === 1 && <CourseInformationForm />}
//       {step === 2 && <CourseBuilderForm />}
//       {step === 3 && <PublishCourse />}
//     </>
//   )
// }



import { Fragment } from "react"
import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import PublishCourse from "./PublishCourse"

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course)

  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publish" },
  ]

  return (
    <div className="w-full min-w-0">
      {/* Step progress indicators */}
      <div className="mb-3 flex w-full items-center justify-center">
        {steps.map((item, index) => (
          <Fragment key={item.id}>
            <div className="flex shrink-0 flex-col items-center">
              <div
                className={`grid aspect-square w-8 place-items-center rounded-full border sm:w-[34px] ${
                  step === item.id
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : step > item.id
                      ? "border-yellow-50 bg-yellow-50 text-richblack-900"
                      : "border-richblack-700 bg-richblack-800 text-richblack-300"
                }`}
              >
                {step > item.id ? (
                  <FaCheck className="text-sm font-bold" />
                ) : (
                  item.id
                )}
              </div>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`mx-2 h-0 flex-1 border-b-2 border-dashed sm:mx-4 ${
                  step > item.id
                    ? "border-yellow-50"
                    : "border-richblack-500"
                }`}
              />
            )}
          </Fragment>
        ))}
      </div>

      {/* Step labels */}
      <div className="mb-10 grid w-full grid-cols-3 gap-1 sm:mb-16 sm:gap-2">
        {steps.map((item) => (
          <div
            key={item.id}
            className="min-w-0 text-center"
          >
            <p
              className={`break-words text-xs sm:text-sm ${
                step >= item.id
                  ? "text-richblack-5"
                  : "text-richblack-500"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Render the current step */}
      <div className="w-full min-w-0">
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishCourse />}
      </div>
    </div>
  )
}
