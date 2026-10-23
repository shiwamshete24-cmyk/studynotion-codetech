// import { useEffect, useRef, useState } from "react"
// import { FiUpload } from "react-icons/fi"
// import { useDispatch, useSelector } from "react-redux"

// import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"
// import IconBtn from "../../../Common/IconBtn"

// export default function ChangeProfilePicture() {
//   const { token } = useSelector((state) => state.auth)
//   const { user } = useSelector((state) => state.profile)
//   const dispatch = useDispatch()

//   const [loading, setLoading] = useState(false)
//   const [imageFile, setImageFile] = useState(null)
//   const [previewSource, setPreviewSource] = useState(null)

//   const fileInputRef = useRef(null)

//   const handleClick = () => {
//     fileInputRef.current.click()
//   }

//   const handleFileChange = (e) => {
//     const file = e.target.files[0]
//     // console.log(file)
//     if (file) {
//       setImageFile(file)
//       previewFile(file)
//     }
//   }

//   const previewFile = (file) => {
//     const reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onloadend = () => {
//       setPreviewSource(reader.result)
//     }
//   }

//   const handleFileUpload = () => {
//     try {
//       console.log("uploading...")
//       setLoading(true)
//       const formData = new FormData()
//       formData.append("displayPicture", imageFile)
//       // console.log("formdata", formData)
//       dispatch(updateDisplayPicture(token, formData)).then(() => {
//         setLoading(false)
//       })
//     } catch (error) {
//       console.log("ERROR MESSAGE - ", error.message)
//     }
//   }

//   useEffect(() => {
//     if (imageFile) {
//       previewFile(imageFile)
//     }
//   }, [imageFile])
//   return (
//     <>
//       <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
//         <div className="flex items-center gap-x-4">
//           <img
//             src={previewSource || user?.image}
//             alt={`profile-${user?.firstName}`}
//             className="aspect-square w-[78px] rounded-full object-cover"
//           />
//           <div className="space-y-2">
//             <p>Change Profile Picture</p>
//             <div className="flex flex-row gap-3">
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 className="hidden"
//                 accept="image/png, image/gif, image/jpeg"
//               />
//               <button
//                 onClick={handleClick}
//                 disabled={loading}
//                 className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
//               >
//                 Select
//               </button>
//               <IconBtn
//                 text={loading ? "Uploading..." : "Upload"}
//                 onclick={handleFileUpload}
//               >
//                 {!loading && (
//                   <FiUpload className="text-lg text-richblack-900" />
//                 )}
//               </IconBtn>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }



import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"

import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../Common/IconBtn"

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]

    if (file) {
      setImageFile(file)
    }
  }

  useEffect(() => {
    if (!imageFile) {
      setPreviewSource(null)
      return
    }

    const reader = new FileReader()

    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }

    reader.readAsDataURL(imageFile)

    return () => {
      reader.onloadend = null
    }
  }, [imageFile])

  const handleFileUpload = async () => {
    if (!imageFile || loading) return

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("displayPicture", imageFile)

      await dispatch(updateDisplayPicture(token, formData))
      setImageFile(null)
      setPreviewSource(null)

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      console.error("Profile picture upload failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-5 rounded-md border border-richblack-700 bg-richblack-800 p-4 text-richblack-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 lg:px-12 lg:py-8">
      {/* Profile image and title */}
      <div className="flex min-w-0 items-center gap-4">
        <img
          src={previewSource || user?.image}
          alt={`profile-${user?.firstName}`}
          className="h-14 w-14 shrink-0 rounded-full object-cover sm:h-[78px] sm:w-[78px]"
        />

        <div className="min-w-0">
          <p className="break-words font-medium">
            Change Profile Picture
          </p>
          {imageFile && (
            <p className="mt-1 break-all text-xs text-richblack-300">
              {imageFile.name}
            </p>
          )}
        </div>
      </div>

      {/* File selection and upload buttons */}
      <div className="flex flex-wrap items-center gap-3 sm:shrink-0">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png,image/gif,image/jpeg,image/webp"
        />

        <button
          type="button"
          onClick={handleClick}
          disabled={loading}
          className="rounded-md bg-richblack-700 px-5 py-2 font-semibold text-richblack-50 transition-colors hover:bg-richblack-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Select
        </button>

        <div className="shrink-0">
          <IconBtn
            text={loading ? "Uploading..." : "Upload"}
            onclick={handleFileUpload}
          >
            {!loading && (
              <FiUpload className="text-lg text-richblack-900" />
            )}
          </IconBtn>
        </div>
      </div>
    </div>
  )
}
