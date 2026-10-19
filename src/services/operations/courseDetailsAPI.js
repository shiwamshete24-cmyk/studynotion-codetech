
import { toast } from "react-hot-toast"

import { apiConnector } from "../apiConnector"
import { courseEndpoints } from "../apis"

const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints

// Common error message handler
const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message ||
  error?.message ||
  fallback

// Fetch all courses
export const getAllCourses = async () => {
  const toastId = toast.loading("Loading...")
  let result = []

  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_API)

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Courses")
    }

    result = response.data.data || []
  } catch (error) {
    console.error("GET_ALL_COURSE_API ERROR:", error)
    toast.error(getErrorMessage(error, "Could Not Fetch Courses"))
  } finally {
    toast.dismiss(toastId)
  }

  return result
}

// Fetch course details
export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading...")
  let result = null

  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, {
      courseId,
    })

    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Fetch Course Details"
      )
    }

    result = response.data
  } catch (error) {
    console.error("COURSE_DETAILS_API ERROR:", error)

    result = error?.response?.data || {
      success: false,
      message: getErrorMessage(error, "Could Not Fetch Course Details"),
    }
  } finally {
    toast.dismiss(toastId)
  }

  return result
}

// Fetch available course categories
export const fetchCourseCategories = async () => {
  let result = []

  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API)

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories")
    }

    result = response.data.data || []
  } catch (error) {
    console.error("COURSE_CATEGORIES_API ERROR:", error)
    toast.error(getErrorMessage(error, "Could Not Fetch Categories"))
  }

  return result
}

// Add course details
export const addCourseDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector(
      "POST",
      CREATE_COURSE_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details")
    }

    toast.success("Course Details Added Successfully")
    result = response.data.data
  } catch (error) {
    console.error("CREATE_COURSE_API ERROR:", error)
    toast.error(getErrorMessage(error, "Could Not Add Course"))
  } finally {
    toast.dismiss(toastId)
  }

  return result
}

// Edit course details
export const editCourseDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector(
      "POST",
      EDIT_COURSE_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details")
    }

    toast.success("Course Details Updated Successfully")
    result = response.data.data
  } catch (error) {
    console.error("EDIT_COURSE_API ERROR:", error)
    toast.error(getErrorMessage(error, "Could Not Update Course"))
  } finally {
    toast.dismiss(toastId)
  }

  return result
}

// Create a section
export const createSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector(
      "POST",
      CREATE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }

    toast.success("Course Section Created")
    result = response.data.updatedCourse
  } catch (error) {
    console.error("CREATE_SECTION_API ERROR:", error)
    toast.error(getErrorMessage(error, "Could Not Create Section"))
  } finally {
    toast.dismiss(toastId)
  }

  return result
}

// Create a subsection (lecture)
export const createSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector(
      "POST",
      CREATE_SUBSECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture")
    }

    toast.success("Lecture Added")
    result = response.data.data
  } catch (error) {
    console.error("CREATE_SUBSECTION_API ERROR:", error)
    toast.error(getErrorMessage(error, "Could Not Add Lecture"))
  } finally {
    toast.dismiss(toastId)
  }

  return result
}

// Update a section
export const updateSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector(
      "POST",
      UPDATE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response?.data?.success) {
      throw new Error("Could Not Update Section")
    }

    toast.success("Course Section Updated")
    result = response.data.data
  } catch (error) {
    console.error("UPDATE_SECTION_API ERROR:", error)
    toast.error(getErrorMessage(error, "Could Not Update Section"))
  } finally {
    toast.dismiss(toastId)
  }

  return result
}

// Update a subsection (lecture)
export const updateSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector(
      "POST",
      UPDATE_SUBSECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture")
    }

    toast.success("Lecture Updated")
    result = response.data.data
  } catch (error) {
    console.error("UPDATE_SUBSECTION_API ERROR:", error)
    toast.error(getErrorMessage(error, "Could Not Update Lecture"))
  } finally {
    toast.dismiss(toastId)
  }

  return result
}

// Delete a section
export const deleteSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector(
      "POST",
      DELETE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }

    toast.success("Course Section Deleted")
    result = response.data.data
  } catch (error) {
    console.error("DELETE_SECTION_API ERROR:", error)
    toast.error(getErrorMessage(error, "Could Not Delete Section"))
  } finally {
    toast.dismiss(toastId)
  }

  return result
}

// Delete a subsection (lecture)
export const deleteSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector(
      "POST",
      DELETE_SUBSECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture")
    }

    toast.success("Lecture Deleted")
    result = response.data.data
  } catch (error) {
    console.error("DELETE_SUBSECTION_API ERROR:", error)
    toast.error(getErrorMessage(error, "Could Not Delete Lecture"))
  } finally {
    toast.dismiss(toastId)
  }

  return result
}

// Fetch courses created by an instructor
export const fetchInstructorCourses = async (token) => {
  let result = []
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses")
    }

    result = response.data.data || []
  } catch (error) {
    console.error("GET_ALL_INSTRUCTOR_COURSES_API ERROR:", error)
    toast.error(
      getErrorMessage(error, "Could Not Fetch Instructor Courses")
    )
  } finally {
    toast.dismiss(toastId)
  }

  return result
}

// Delete a course
export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let result = null

  try {
    const response = await apiConnector(
      "DELETE",
      DELETE_COURSE_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }

    toast.success("Course Deleted")
    result = response.data.data ?? true
  } catch (error) {
    console.error("DELETE_COURSE_API ERROR:", error)
    toast.error(getErrorMessage(error, "Could Not Delete Course"))
  } finally {
    toast.dismiss(toastId)
  }

  return result
}

// Get full details of a course for an authenticated user
export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...")
  let result = null

  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Fetch Full Course Details"
      )
    }

    result = response.data.data
  } catch (error) {
    console.error("GET_FULL_COURSE_DETAILS_AUTHENTICATED ERROR:", error)

    result = error?.response?.data || {
      success: false,
      message: getErrorMessage(error, "Could Not Fetch Full Course Details"),
    }
  } finally {
    toast.dismiss(toastId)
  }

  return result
}

// Mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let result = false

  try {
    const response = await apiConnector(
      "POST",
      LECTURE_COMPLETION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (
      !response?.data?.success &&
      !response?.data?.message
    ) {
      throw new Error(
        response?.data?.error || "Could Not Mark Lecture As Complete"
      )
    }

    toast.success("Lecture Completed")
    result = true
  } catch (error) {
    console.error("LECTURE_COMPLETION_API ERROR:", error)
    toast.error(
      getErrorMessage(error, "Could Not Mark Lecture As Complete")
    )
  } finally {
    toast.dismiss(toastId)
  }

  return result
}

// Create a course rating
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false

  try {
    const response = await apiConnector(
      "POST",
      CREATE_RATING_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Create Rating"
      )
    }

    toast.success("Rating Created")
    success = true
  } catch (error) {
    console.error("CREATE_RATING_API ERROR:", error)
    toast.error(getErrorMessage(error, "Could Not Create Rating"))
  } finally {
    toast.dismiss(toastId)
  }

  return success
}
