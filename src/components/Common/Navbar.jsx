// import { useEffect, useState } from "react"
// import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
// import { BsChevronDown } from "react-icons/bs"
// import { useSelector } from "react-redux"
// import { Link, matchPath, useLocation } from "react-router-dom"

// import logo from "../../assets/Logo/Logo-Full-Light.png"
// import { NavbarLinks } from "../../data/navbar-links"
// import { apiConnector } from "../../services/apiConnector"
// import { categories } from "../../services/apis"
// import { ACCOUNT_TYPE } from "../../utils/constants"
// import ProfileDropdown from "../core/Auth/ProfileDropdown"

// // const subLinks = [
// //   {
// //     title: "Python",
// //     link: "/catalog/python",
// //   },
// //   {
// //     title: "javascript",
// //     link: "/catalog/javascript",
// //   },
// //   {
// //     title: "web-development",
// //     link: "/catalog/web-development",
// //   },
// //   {
// //     title: "Android Development",
// //     link: "/catalog/Android Development",
// //   },
// // ];

// function Navbar() {
//   const { token } = useSelector((state) => state.auth)
//   const { user } = useSelector((state) => state.profile)
//   const { totalItems } = useSelector((state) => state.cart)
//   const location = useLocation()

//   const [subLinks, setSubLinks] = useState([])
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     ;(async () => {
//       setLoading(true)
//       try {
//         const res = await apiConnector("GET", categories.CATEGORIES_API)

//         // FIX: Make sure subLinks always remains an array
//         setSubLinks(res?.data?.data || [])
//       } catch (error) {
//         console.log("Could not fetch Categories.", error)

//         // FIX: If API fails, keep subLinks as an empty array
//         setSubLinks([])
//       }
//       setLoading(false)
//     })()
//   }, [])

//   // console.log("sub links", subLinks)

//   const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname)
//   }

//   return (
//     <div
//       className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
//         location.pathname !== "/" ? "bg-richblack-800" : ""
//       } transition-all duration-200`}
//     >
//       <div className="flex w-11/12 max-w-maxContent items-center justify-between">
//         {/* Logo */}
//         <Link to="/">
//           <img
//             src={logo}
//             alt="Logo"
//             width={160}
//             height={32}
//             loading="lazy"
//           />
//         </Link>

//         {/* Navigation links */}
//         <nav className="hidden md:block">
//           <ul className="flex gap-x-6 text-richblack-25">
//             {NavbarLinks.map((link, index) => (
//               <li key={index}>
//                 {link.title === "Catalog" ? (
//                   <>
//                     <div
//                       className={`group relative flex cursor-pointer items-center gap-1 ${
//                         matchRoute("/catalog/:catalogName")
//                           ? "text-yellow-25"
//                           : "text-richblack-25"
//                       }`}
//                     >
//                       <p>{link.title}</p>
//                       <BsChevronDown />

//                       <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
//                         <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>

//                         {loading ? (
//                           <p className="text-center">Loading...</p>
//                         ) : subLinks?.length > 0 ? (
//                           <>
//                             {subLinks
//                               ?.filter(
//                                 (subLink) => subLink?.courses?.length > 0
//                               )
//                               ?.map((subLink, i) => (
//                                 <Link
//                                   to={`/catalog/${subLink.name
//                                     .split(" ")
//                                     .join("-")
//                                     .toLowerCase()}`}
//                                   className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
//                                   key={i}
//                                 >
//                                   <p>{subLink.name}</p>
//                                 </Link>
//                               ))}
//                           </>
//                         ) : (
//                           <p className="text-center">No Courses Found</p>
//                         )}
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <Link to={link?.path}>
//                     <p
//                       className={`${
//                         matchRoute(link?.path)
//                           ? "text-yellow-25"
//                           : "text-richblack-25"
//                       }`}
//                     >
//                       {link.title}
//                     </p>
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Login / Signup / Dashboard */}
//         <div className="hidden items-center gap-x-4 md:flex">
//           {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
//             <Link to="/dashboard/cart" className="relative">
//               <AiOutlineShoppingCart className="text-2xl text-richblack-100" />

//               {totalItems > 0 && (
//                 <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>
//           )}

//           {token === null && (
//             <Link to="/login">
//               <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
//                 Log in
//               </button>
//             </Link>
//           )}

//           {token === null && (
//             <Link to="/signup">
//               <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
//                 Sign up
//               </button>
//             </Link>
//           )}

//           {token !== null && <ProfileDropdown />}
//         </div>

//         <button className="mr-4 md:hidden">
//           <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Navbar



// -------------------------



import { useEffect, useState } from "react"
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineClose,
} from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropdown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)

  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false)

  useEffect(() => {
    let isMounted = true

    const getCategories = async () => {
      setLoading(true)

      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)

        if (isMounted) {
          setSubLinks(res?.data?.data || [])
        }
      } catch (error) {
        console.error("Could not fetch Categories.", error)

        if (isMounted) {
          setSubLinks([])
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    getCategories()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setMobileCatalogOpen(false)
  }, [location.pathname])

  const matchRoute = (route) => {
    if (!route) return false
    return Boolean(matchPath({ path: route }, location.pathname))
  }

  const availableCategories = subLinks.filter(
    (subLink) => subLink?.courses?.length > 0
  )

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setMobileCatalogOpen(false)
  }

  const getCategoryPath = (name) =>
    `/catalog/${name.split(" ").join("-").toLowerCase()}`

  return (
    <header
      className={`relative z-50 flex h-14 items-center justify-center border-b border-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={closeMobileMenu} className="shrink-0">
          <img
            src={logo}
            alt="Logo"
            width={160}
            height={32}
            loading="lazy"
            className="h-auto w-[125px] sm:w-[160px]"
          />
        </Link>

        {/* Desktop navigation - original Catalog behavior preserved */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={link.title || index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />

                    {/* Category dropdown */}
                    <div className="invisible absolute left-1/2 top-1/2 z-[1000] flex w-[200px] -translate-x-1/2 translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-1/2 top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5" />

                      {!loading &&
                        availableCategories.map((subLink) => (
                          <Link
                            to={getCategoryPath(subLink.name)}
                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                            key={subLink._id || subLink.name}
                          >
                            <p>{subLink.name}</p>
                          </Link>
                        ))}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop login, cart and profile */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />

              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 min-w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 px-1 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null ? (
            <>
              <Link
                to="/login"
                className="rounded-lg border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100"
              >
                Log in
              </Link>

              <Link
                to="/signup"
                className="rounded-lg border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100"
              >
                Sign up
              </Link>
            </>
          ) : (
            <ProfileDropdown />
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          className="rounded-md p-2 text-richblack-100 hover:bg-richblack-700 md:hidden"
        >
          {mobileMenuOpen ? (
            <AiOutlineClose size={25} />
          ) : (
            <AiOutlineMenu size={25} />
          )}
        </button>
      </div>

      {/* Mobile vertical menu */}
      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full z-[100] max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-b border-richblack-700 bg-richblack-900 p-5 shadow-xl md:hidden">
          <nav>
            <ul className="flex flex-col gap-2 text-richblack-25">
              {NavbarLinks.map((link, index) => (
                <li key={link.title || index}>
                  {link.title === "Catalog" ? (
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          setMobileCatalogOpen((prev) => !prev)
                        }
                        aria-expanded={mobileCatalogOpen}
                        className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left hover:bg-richblack-800"
                      >
                        <span>Catalog</span>
                        <BsChevronDown
                          className={`transition-transform ${
                            mobileCatalogOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {mobileCatalogOpen && (
                        <div className="ml-3 mt-1 flex flex-col border-l border-richblack-600 pl-3">
                          {!loading &&
                            availableCategories.map((subLink) => (
                              <Link
                                key={subLink._id || subLink.name}
                                to={getCategoryPath(subLink.name)}
                                onClick={closeMobileMenu}
                                className="rounded-md px-3 py-2 text-sm hover:bg-richblack-800 hover:text-yellow-25"
                              >
                                {subLink.name}
                              </Link>
                            ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={closeMobileMenu}
                      className={`block rounded-md px-3 py-3 hover:bg-richblack-800 ${
                        matchRoute(link.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile cart and account actions */}
          <div className="mt-4 flex flex-col gap-2 border-t border-richblack-700 pt-4">
            {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link
                to="/dashboard/cart"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-md px-3 py-3 text-richblack-25 hover:bg-richblack-800"
              >
                <AiOutlineShoppingCart className="text-xl" />
                <span>Cart ({totalItems})</span>
              </Link>
            )}

            {token === null ? (
              <>
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="rounded-lg border border-richblack-700 px-4 py-3 text-center text-richblack-25 hover:bg-richblack-800"
                >
                  Log in
                </Link>

                <Link
                  to="/signup"
                  onClick={closeMobileMenu}
                  className="rounded-lg border border-richblack-700 px-4 py-3 text-center text-richblack-25 hover:bg-richblack-800"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard/my-profile"
                onClick={closeMobileMenu}
                className="rounded-md px-3 py-3 text-richblack-25 hover:bg-richblack-800"
              >
                My Profile
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
