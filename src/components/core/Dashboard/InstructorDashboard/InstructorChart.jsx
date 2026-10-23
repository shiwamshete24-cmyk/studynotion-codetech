// import { useState } from "react"
// import { Chart, registerables } from "chart.js"
// import { Pie } from "react-chartjs-2"

// Chart.register(...registerables)

// export default function InstructorChart({ courses }) {
//   // State to keep track of the currently selected chart
//   const [currChart, setCurrChart] = useState("students")

//   // Function to generate random colors for the chart
//   const generateRandomColors = (numColors) => {
//     const colors = []
//     for (let i = 0; i < numColors; i++) {
//       const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
//         Math.random() * 256
//       )}, ${Math.floor(Math.random() * 256)})`
//       colors.push(color)
//     }
//     return colors
//   }

//   // Data for the chart displaying student information
//   const chartDataStudents = {
//     labels: courses.map((course) => course.courseName),
//     datasets: [
//       {
//         data: courses.map((course) => course.totalStudentsEnrolled),
//         backgroundColor: generateRandomColors(courses.length),
//       },
//     ],
//   }

//   // Data for the chart displaying income information
//   const chartIncomeData = {
//     labels: courses.map((course) => course.courseName),
//     datasets: [
//       {
//         data: courses.map((course) => course.totalAmountGenerated),
//         backgroundColor: generateRandomColors(courses.length),
//       },
//     ],
//   }

//   // Options for the chart
//   const options = {
//     maintainAspectRatio: false,
//   }

//   return (
//     <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
//       <p className="text-lg font-bold text-richblack-5">Visualize</p>
//       <div className="space-x-4 font-semibold">
//         {/* Button to switch to the "students" chart */}
//         <button
//           onClick={() => setCurrChart("students")}
//           className={`rounded-sm p-1 px-3 transition-all duration-200 ${
//             currChart === "students"
//               ? "bg-richblack-700 text-yellow-50"
//               : "text-yellow-400"
//           }`}
//         >
//           Students
//         </button>
//         {/* Button to switch to the "income" chart */}
//         <button
//           onClick={() => setCurrChart("income")}
//           className={`rounded-sm p-1 px-3 transition-all duration-200 ${
//             currChart === "income"
//               ? "bg-richblack-700 text-yellow-50"
//               : "text-yellow-400"
//           }`}
//         >
//           Income
//         </button>
//       </div>
//       <div className="relative mx-auto aspect-square h-full w-full">
//         {/* Render the Pie chart based on the selected chart */}
//         <Pie
//           data={currChart === "students" ? chartDataStudents : chartIncomeData}
//           options={options}
//         />
//       </div>
//     </div>
//   )
// }



import { useMemo, useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

export default function InstructorChart({ courses = [] }) {
  const [currChart, setCurrChart] = useState("students")

  // Keep chart colors consistent across renders
  const colors = useMemo(() => {
    const palette = [
      "#FFD60A",
      "#FF6B6B",
      "#4D96FF",
      "#6BCB77",
      "#C77DFF",
      "#FF9F1C",
      "#4ECDC4",
      "#F06595",
      "#845EC2",
      "#00C9A7",
    ]

    return courses.map((_, index) => palette[index % palette.length])
  }, [courses])

  const chartDataStudents = useMemo(
    () => ({
      labels: courses.map((course) => course.courseName),
      datasets: [
        {
          label: "Students",
          data: courses.map(
            (course) => course.totalStudentsEnrolled ?? 0
          ),
          backgroundColor: colors,
          borderColor: "#161D29",
          borderWidth: 2,
        },
      ],
    }),
    [courses, colors]
  )

  const chartIncomeData = useMemo(
    () => ({
      labels: courses.map((course) => course.courseName),
      datasets: [
        {
          label: "Income",
          data: courses.map(
            (course) => course.totalAmountGenerated ?? 0
          ),
          backgroundColor: colors,
          borderColor: "#161D29",
          borderWidth: 2,
        },
      ],
    }),
    [courses, colors]
  )

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#DBDDEA",
          padding: 12,
          boxWidth: 12,
          usePointStyle: true,
        },
      },
    },
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4 rounded-md bg-richblack-800 p-4 sm:p-6">
      <p className="text-lg font-bold text-richblack-5">
        Visualize
      </p>

      {/* Chart selection */}
      <div className="flex flex-wrap gap-2 font-semibold">
        <button
          type="button"
          onClick={() => setCurrChart("students")}
          className={`rounded-md px-3 py-2 text-sm transition-colors ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400 hover:bg-richblack-700"
          }`}
        >
          Students
        </button>

        <button
          type="button"
          onClick={() => setCurrChart("income")}
          className={`rounded-md px-3 py-2 text-sm transition-colors ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400 hover:bg-richblack-700"
          }`}
        >
          Income
        </button>
      </div>

      {/* Responsive chart area */}
      {courses.length > 0 ? (
        <div className="relative mx-auto h-[280px] w-full min-w-0 sm:h-[320px] lg:h-[360px]">
          <Pie
            data={
              currChart === "students"
                ? chartDataStudents
                : chartIncomeData
            }
            options={options}
          />
        </div>
      ) : (
        <div className="flex min-h-[220px] items-center justify-center text-center text-sm text-richblack-300">
          No course data available to display.
        </div>
      )}
    </div>
  )
}
