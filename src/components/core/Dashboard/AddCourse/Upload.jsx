
// import { useEffect, useRef, useState } from "react"
// import { useDropzone } from "react-dropzone"
// import { FiUploadCloud } from "react-icons/fi"

// import "video-react/dist/video-react.css"
// import { Player } from "video-react"

// export default function Upload({
//   name,
//   label,
//   register,
//   setValue,
//   errors,
//   video = false,
//   viewData = null,
//   editData = null,
// }) {
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [previewSource, setPreviewSource] = useState(
//     viewData ? viewData : editData ? editData : ""
//   )
//   const inputRef = useRef(null)

//   const onDrop = (acceptedFiles) => {
//     const file = acceptedFiles[0]
//     if (file) {
//       previewFile(file)
//       setSelectedFile(file)
//     }
//   }

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: !video
//       ? { "image/*": [".jpeg", ".jpg", ".png"] }
//       : { "video/*": [".mp4"] },
//     onDrop,
//   })

//   const previewFile = (file) => {
//     const reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onloadend = () => {
//       setPreviewSource(reader.result)
//     }
//   }

//   useEffect(() => {
//     register(name, { required: true })
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [register])

//   useEffect(() => {
//     setValue(name, selectedFile)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectedFile, setValue])

//   return (
//     <div className="flex flex-col space-y-2">
//       <label className="text-sm text-richblack-5" htmlFor={name}>
//         {label} {!viewData && <sup className="text-pink-200">*</sup>}
//       </label>

//       <div
//         className={`${
//           isDragActive ? "bg-richblack-600" : "bg-richblack-700"
//         } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
//       >
//         {previewSource ? (
//           <div className="flex w-full flex-col p-6">
//             {!video ? (
//               <img
//                 src={previewSource}
//                 alt="Preview"
//                 className="h-full w-full rounded-md object-cover"
//               />
//             ) : (
//               <Player aspectRatio="16:9" playsInline src={previewSource} />
//             )}

//             {!viewData && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setPreviewSource("")
//                   setSelectedFile(null)
//                   setValue(name, null)
//                 }}
//                 className="mt-3 text-richblack-400 underline"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         ) : (
//           <div
//             className="flex w-full flex-col items-center p-6"
//             {...getRootProps()}
//           >
//             <input {...getInputProps()} ref={inputRef} />

//             <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
//               <FiUploadCloud className="text-2xl text-yellow-50" />
//             </div>

//             <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
//               Drag and drop an {!video ? "image" : "video"}, or click to{" "}
//               <span className="font-semibold text-yellow-50">Browse</span> a
//               file
//             </p>

//             <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
//               <li>Aspect ratio 16:9</li>
//               <li>Recommended size 1024x576</li>
//             </ul>
//           </div>
//         )}
//       </div>

//       {errors[name] && (
//         <span className="ml-2 text-xs tracking-wide text-pink-200">
//           {label} is required
//         </span>
//       )}
//     </div>
//   )
// }



import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"

import "video-react/dist/video-react.css"
import { Player } from "video-react"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const [ , setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData || editData || ""
  )

  const previewFile = useCallback((file) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }

    reader.readAsDataURL(file)
  }, [])

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles?.[0]

      if (file) {
        setSelectedFile(file)
        previewFile(file)
        setValue(name, file, {
          shouldValidate: true,
          shouldDirty: true,
        })
      }
    },
    [name, previewFile, setValue]
  )

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open,
  } = useDropzone({
    accept: !video
      ? {
          "image/jpeg": [".jpeg", ".jpg"],
          "image/png": [".png"],
        }
      : {
          "video/mp4": [".mp4"],
        },
    multiple: false,
    noClick: true,
    onDrop,
  })

  useEffect(() => {
    register(name, { required: !viewData })
  }, [name, register, viewData])

  useEffect(() => {
    if (viewData || editData) {
      setPreviewSource(viewData || editData)
    }
  }, [viewData, editData])

  const handleCancel = () => {
    setPreviewSource("")
    setSelectedFile(null)
    setValue(name, null, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  return (
    <div className="flex w-full min-w-0 flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>

      <div
        {...getRootProps()}
        className={`flex min-h-[220px] w-full min-w-0 cursor-pointer items-center justify-center overflow-hidden rounded-md border-2 border-dotted p-3 transition-colors sm:min-h-[250px] sm:p-5 ${
          isDragActive
            ? "bg-richblack-600"
            : "bg-richblack-700"
        }`}
      >
        <input {...getInputProps({ id: name })} />

        {previewSource ? (
          <div className="flex w-full min-w-0 flex-col gap-3">
            {!video ? (
              <img
                src={previewSource}
                alt="Course thumbnail preview"
                className="mx-auto max-h-[320px] w-full rounded-md object-contain"
              />
            ) : (
              <Player
                aspectRatio="16:9"
                playsInline
                src={previewSource}
              />
            )}

            {!viewData && (
              <button
                type="button"
                onClick={handleCancel}
                className="self-center rounded-md px-4 py-2 text-sm text-richblack-200 underline hover:text-white"
              >
                Remove {video ? "video" : "image"}
              </button>
            )}

            {!viewData && (
              <button
                type="button"
                onClick={open}
                className="self-center rounded-md bg-richblack-600 px-4 py-2 text-sm text-yellow-50 hover:bg-richblack-500"
              >
                Choose another file
              </button>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center py-5 text-center">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>

            <p className="mt-3 text-sm text-richblack-200">
              {isDragActive
                ? "Drop your file here"
                : "Drag and drop a file, or"}
            </p>

            <button
              type="button"
              onClick={open}
              className="mt-2 rounded-md px-4 py-2 text-sm font-semibold text-yellow-50 hover:bg-richblack-600"
            >
              Browse files
            </button>

            <ul className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>
                {video
                  ? "MP4 video only"
                  : "JPG, JPEG or PNG"}
              </li>
              {!video && <li>Recommended size 1024 × 576</li>}
            </ul>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}
