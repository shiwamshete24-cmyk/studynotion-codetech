// import { FiTrash2 } from "react-icons/fi"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { deleteProfile } from "../../../../services/operations/SettingsAPI"

// export default function DeleteAccount() {
//   const { token } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   async function handleDeleteAccount() {
//     try {
//       dispatch(deleteProfile(token, navigate))
//     } catch (error) {
//       console.log("ERROR MESSAGE - ", error.message)
//     }
//   }

//   return (
//     <>
//       <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12">
//         <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
//           <FiTrash2 className="text-3xl text-pink-200" />
//         </div>
//         <div className="flex flex-col space-y-2">
//           <h2 className="text-lg font-semibold text-richblack-5">
//             Delete Account
//           </h2>
//           <div className="w-3/5 text-pink-25">
//             <p>Would you like to delete account?</p>
//             <p>
//               This account may contain Paid Courses. Deleting your account is
//               permanent and will remove all the contain associated with it.
//             </p>
//           </div>
//           <button
//             type="button"
//             className="w-fit cursor-pointer italic text-pink-300"
//             onClick={handleDeleteAccount}
//           >
//             I want to delete my account.
//           </button>
//         </div>
//       </div>
//     </>
//   )
// }




import { useState } from "react"
import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteProfile } from "../../../../services/operations/SettingsAPI"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  async function handleDeleteAccount() {
    if (loading) return

    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account? This action cannot be undone."
    )

    if (!confirmed) return

    setLoading(true)

    try {
      await dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.error("ERROR MESSAGE - ", error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="my-6 flex w-full min-w-0 flex-col gap-4 rounded-md border border-pink-700 bg-pink-900 p-4 sm:my-8 sm:flex-row sm:gap-5 sm:p-6 lg:my-10 lg:px-12 lg:py-8">
      {/* Delete icon */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-700 sm:h-14 sm:w-14">
        <FiTrash2 className="text-2xl text-pink-200 sm:text-3xl" />
      </div>

      {/* Account deletion details */}
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <h2 className="text-lg font-semibold text-richblack-5">
          Delete Account
        </h2>

        <div className="w-full break-words text-sm leading-6 text-pink-25 sm:text-base">
          <p>Would you like to delete your account?</p>

          <p className="mt-2">
            This account may contain paid courses. Deleting your
            account is permanent and will remove all content associated
            with it.
          </p>
        </div>

        <button
          type="button"
          disabled={loading}
          className="w-fit max-w-full break-words text-left italic text-pink-300 underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-60"
          onClick={handleDeleteAccount}
        >
          {loading
            ? "Deleting account..."
            : "I want to delete my account."}
        </button>
      </div>
    </div>
  )
}
