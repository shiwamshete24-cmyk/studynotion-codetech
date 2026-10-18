import { toast } from "react-hot-toast"

import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authAPI"

const {
  GET_USER_DETAILS_API,
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DATA_API,
} = profileEndpoints


// ==========================================
// GET USER DETAILS
// ==========================================

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")

    dispatch(setLoading(true))

    try {
      if (!token) {
        throw new Error("Authentication token not found")
      }

      const response = await apiConnector(
        "GET",
        GET_USER_DETAILS_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )

      console.log(
        "GET_USER_DETAILS API RESPONSE............",
        response
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`

      dispatch(
        setUser({
          ...response.data.data,
          image: userImage,
        })
      )

    } catch (error) {
      console.log(
        "GET_USER_DETAILS API ERROR............",
        error
      )

      dispatch(logout(navigate))

      toast.error("Could Not Get User Details")
    }

    toast.dismiss(toastId)

    dispatch(setLoading(false))
  }
}


// ==========================================
// GET ENROLLED COURSES
// ==========================================

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")

  let result = []

  try {
    if (!token) {
      throw new Error("Authentication token not found")
    }

    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    console.log(
      "GET_USER_ENROLLED_COURSES_API RESPONSE............",
      response
    )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    result = response.data.data || []

  } catch (error) {
    console.log(
      "GET_USER_ENROLLED_COURSES_API API ERROR............",
      error
    )

    toast.error("Could Not Get Enrolled Courses")
  }

  toast.dismiss(toastId)

  return result
}


// ==========================================
// GET INSTRUCTOR DATA
// ==========================================

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...")

  let result = []

  try {
    if (!token) {
      throw new Error("Authentication token not found")
    }

    const response = await apiConnector(
      "GET",
      GET_INSTRUCTOR_DATA_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    console.log(
      "GET_INSTRUCTOR_DATA_API RESPONSE............",
      response
    )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    // Depending on your backend response
    result = response?.data?.data || []

  } catch (error) {
    console.log(
      "GET_INSTRUCTOR_DATA_API API ERROR............",
      error
    )

    toast.error("Could Not Get Instructor Data")
  }

  toast.dismiss(toastId)

  return result
}