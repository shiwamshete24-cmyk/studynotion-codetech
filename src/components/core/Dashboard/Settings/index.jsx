// import ChangeProfilePicture from "./ChangeProfilePicture"
// import DeleteAccount from "./DeleteAccount"
// import EditProfile from "./EditProfile"
// import UpdatePassword from "./UpdatePassword"

// export default function Settings() {
//   return (
//     <>
//       <h1 className="mb-14 text-3xl font-medium text-richblack-5">
//         Edit Profile
//       </h1>
//       {/* Change Profile Picture */}
//       <ChangeProfilePicture />
//       {/* Profile */}
//       <EditProfile />
//       {/* Password */}
//       <UpdatePassword />
//       {/* Delete Account */}
//       <DeleteAccount />
//     </>
//   )
// }



import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  return (
    <div className="w-full min-w-0">
      {/* Page title */}
      <h1 className="mb-6 text-2xl font-medium text-richblack-5 sm:mb-10 sm:text-3xl lg:mb-14">
        Edit Profile
      </h1>

      {/* Change Profile Picture */}
      <ChangeProfilePicture />

      {/* Profile Information */}
      <EditProfile />

      {/* Update Password */}
      <UpdatePassword />

      {/* Delete Account */}
      <DeleteAccount />
    </div>
  )
}
