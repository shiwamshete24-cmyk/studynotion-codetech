// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { BuyCourse } from "../../../../services/operations/studentFeaturesAPI"
// import IconBtn from "../../../Common/IconBtn"

// export default function RenderTotalAmount() {
//   const { total, cart } = useSelector((state) => state.cart)
//   const { token } = useSelector((state) => state.auth)
//   const { user } = useSelector((state) => state.profile)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const handleBuyCourse = () => {
//     const courses = cart.map((course) => course._id)
//     BuyCourse(token, courses, user, navigate, dispatch)
//   }

//   return (
//     <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
//       <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
//       <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
//       <IconBtn
//         text="Buy Now"
//         onclick={handleBuyCourse}
//         customClasses="w-full justify-center"
//       />
//     </div>
//   )
// }



import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { BuyCourse } from "../../../../services/operations/studentFeaturesAPI"
import IconBtn from "../../../Common/IconBtn"

export default function RenderTotalAmount() {
  const { total = 0, cart = [] } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [processing, setProcessing] = useState(false)

  const handleBuyCourse = async () => {
    if (processing || cart.length === 0) return

    if (!token || !user) {
      navigate("/login")
      return
    }

    setProcessing(true)

    try {
      const courses = cart.map((course) => course._id)
      await BuyCourse(token, courses, user, navigate, dispatch)
    } catch (error) {
      console.error("Unable to start course checkout:", error)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="w-full min-w-0 rounded-xl border border-richblack-700 bg-richblack-800 p-4 sm:p-5 lg:p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">
        Total Amount
      </p>

      <p className="mb-5 break-words text-2xl font-semibold text-yellow-100 sm:mb-6 sm:text-3xl">
        ₹ {Number(total).toLocaleString("en-IN")}
      </p>

      <div className="mb-5 border-t border-richblack-700" />

      <div className="mb-5 flex items-center justify-between gap-3 text-sm">
        <span className="text-richblack-300">Courses</span>
        <span className="font-medium text-richblack-5">
          {cart.length}
        </span>
      </div>

      <IconBtn
        text={processing ? "Processing..." : "Buy Now"}
        onclick={handleBuyCourse}
        disabled={processing || cart.length === 0}
        customClasses="w-full justify-center py-3 text-sm sm:text-base"
      />

      <p className="mt-3 text-center text-xs leading-5 text-richblack-300">
        Get access to your selected courses after successful checkout.
      </p>
    </div>
  )
}
