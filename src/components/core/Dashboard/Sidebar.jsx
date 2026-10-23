// import { useState } from "react"
// import { VscSignOut } from "react-icons/vsc"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { sidebarLinks } from "../../../data/dashboard-links"
// import { logout } from "../../../services/operations/authAPI"
// import ConfirmationModal from "../../Common/ConfirmationModal"
// import SidebarLink from "./SidebarLink"

// export default function Sidebar() {
//   const { user, loading: profileLoading } = useSelector(
//     (state) => state.profile
//   )
//   const { loading: authLoading } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   // to keep track of confirmation modal
//   const [confirmationModal, setConfirmationModal] = useState(null)

//   if (profileLoading || authLoading) {
//     return (
//       <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
//         <div className="spinner"></div>
//       </div>
//     )
//   }

//   return (
//     <>
//       <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
//         <div className="flex flex-col">
//           {sidebarLinks.map((link) => {
//             if (link.type && user?.accountType !== link.type) return null
//             return (
//               <SidebarLink key={link.id} link={link} iconName={link.icon} />
//             )
//           })}
//         </div>
//         <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
//         <div className="flex flex-col">
//           <SidebarLink
//             link={{ name: "Settings", path: "/dashboard/settings" }}
//             iconName="VscSettingsGear"
//           />
//           <button
//             onClick={() =>
//               setConfirmationModal({
//                 text1: "Are you sure?",
//                 text2: "You will be logged out of your account.",
//                 btn1Text: "Logout",
//                 btn2Text: "Cancel",
//                 btn1Handler: () => dispatch(logout(navigate)),
//                 btn2Handler: () => setConfirmationModal(null),
//               })
//             }
//             className="px-8 py-2 text-sm font-medium text-richblack-300"
//           >
//             <div className="flex items-center gap-x-2">
//               <VscSignOut className="text-lg" />
//               <span>Logout</span>
//             </div>
//           </button>
//         </div>
//       </div>
//       {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
//     </>
//   )
// }
// ------------------------------------------------



import { useState } from "react"
import { VscSignOut, VscChromeClose } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import ConfirmationModal from "../../Common/ConfirmationModal"
import SidebarLink from "./SidebarLink"

export default function Sidebar({
  isOpen = false,
  onClose = () => {},
}) {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector(
    (state) => state.auth
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [confirmationModal, setConfirmationModal] = useState(null)

  const sidebarContent = (
    <>
      {/* Close button on mobile */}
      <div className="mb-4 flex justify-end px-4 md:hidden">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close sidebar"
          className="rounded-md p-2 text-richblack-100 hover:bg-richblack-700"
        >
          <VscChromeClose size={23} />
        </button>
      </div>

      {profileLoading || authLoading ? (
        <div className="grid flex-1 place-items-center">
          <div className="spinner" />
        </div>
      ) : (
        <>
          {/* Main links */}
          <div className="flex flex-col">
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) {
                return null
              }

              return (
                <div key={link.id} onClick={onClose}>
                  <SidebarLink
                    link={link}
                    iconName={link.icon}
                  />
                </div>
              )
            })}
          </div>

          <div className="mx-auto mb-6 mt-6 h-px w-10/12 bg-richblack-700" />

          {/* Settings and Logout */}
          <div className="flex flex-col">
            <div onClick={onClose}>
              <SidebarLink
                link={{
                  name: "Settings",
                  path: "/dashboard/settings",
                }}
                iconName="VscSettingsGear"
              />
            </div>

            <button
              type="button"
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="px-8 py-2 text-left text-sm font-medium text-richblack-300 transition-colors hover:text-richblack-5"
            >
              <div className="flex items-center gap-x-2">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </>
      )}
    </>
  )

  return (
    <>
      {/* Mobile sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex h-full w-[min(280px,85vw)]
          flex-col overflow-y-auto border-r border-richblack-700
          bg-richblack-800 py-6 shadow-xl
          transition-transform duration-300 ease-in-out
          md:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden w-[220px] shrink-0 flex-col border-r border-richblack-700 bg-richblack-800 py-10 md:flex">
        {profileLoading || authLoading ? (
          <div className="grid flex-1 place-items-center">
            <div className="spinner" />
          </div>
        ) : (
          <>
            <div className="flex flex-col">
              {sidebarLinks.map((link) => {
                if (link.type && user?.accountType !== link.type) {
                  return null
                }

                return (
                  <SidebarLink
                    key={link.id}
                    link={link}
                    iconName={link.icon}
                  />
                )
              })}
            </div>

            <div className="mx-auto mb-6 mt-6 h-px w-10/12 bg-richblack-700" />

            <div className="flex flex-col">
              <SidebarLink
                link={{
                  name: "Settings",
                  path: "/dashboard/settings",
                }}
                iconName="VscSettingsGear"
              />

              <button
                type="button"
                onClick={() =>
                  setConfirmationModal({
                    text1: "Are you sure?",
                    text2: "You will be logged out of your account.",
                    btn1Text: "Logout",
                    btn2Text: "Cancel",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmationModal(null),
                  })
                }
                className="px-8 py-2 text-left text-sm font-medium text-richblack-300 transition-colors hover:text-richblack-5"
              >
                <div className="flex items-center gap-x-2">
                  <VscSignOut className="text-lg" />
                  <span>Logout</span>
                </div>
              </button>
            </div>
          </>
        )}
      </aside>

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </>
  )
}

