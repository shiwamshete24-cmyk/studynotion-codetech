
// import { Swiper, SwiperSlide } from "swiper/react"

// import "swiper/css"
// import "swiper/css/free-mode"
// import "swiper/css/pagination"

// import { FreeMode, Pagination } from "swiper"
// import CourseCard from "./Course_Card"

// function CourseSlider({ Courses }) {
//   return (
//     <>
//       {Courses?.length ? (
//         <Swiper
//           slidesPerView={1}
//           spaceBetween={25}
//           loop={true}
//           modules={[FreeMode, Pagination]}
//           breakpoints={{
//             1024: {
//               slidesPerView: 3,
//             },
//           }}
//           className="max-h-[30rem]"
//         >
//           {Courses.map((course) => (
//             <SwiperSlide key={course._id}>
//               <CourseCard course={course} Height="h-[250px]" />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       ) : (
//         <p className="text-xl text-richblack-5">No Course Found</p>
//       )}
//     </>
//   )
// }

// export default CourseSlider




import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

import { FreeMode, Pagination } from "swiper"
import CourseCard from "./Course_Card"

function CourseSlider({ Courses }) {
  return (
    <div className="w-full min-w-0">
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          loop={Courses.length > 3}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            480: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
          }}
          className="w-full !pb-12"
        >
          {Courses.map((course) => (
            <SwiperSlide key={course._id} className="h-auto">
              <CourseCard
                course={course}
                Height="aspect-video"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-base text-richblack-5 sm:text-xl">
          No Course Found
        </p>
      )}
    </div>
  )
}

export default CourseSlider
