// Import required modules
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const User = require("../models/User")

// Load environment variables
dotenv.config()


// ==========================================
// AUTH MIDDLEWARE
// ==========================================

exports.auth = async (req, res, next) => {
  try {
    // Get token from cookie
    let token = req.cookies?.token

    // If token is not in cookie, check request body
    if (!token) {
      token = req.body?.token
    }

    // If token is not in body, check Authorization header
    if (!token) {
      const authHeader = req.header("Authorization")

      if (
        authHeader &&
        authHeader.startsWith("Bearer ")
      ) {
        token = authHeader.replace("Bearer ", "")
      }
    }

    // Token not found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      })
    }

    // Verify token
    try {
      const decode = jwt.verify(
        token,
        process.env.JWT_SECRET
      )

      console.log("DECODED TOKEN:", decode)

      // Store decoded user information
      req.user = decode

    } catch (error) {
      console.log("JWT VERIFY ERROR:", error.message)

      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      })
    }

    // Continue to next middleware
    next()

  } catch (error) {
    console.log("AUTH MIDDLEWARE ERROR:", error)

    return res.status(401).json({
      success: false,
      message: "Something Went Wrong While Validating the Token",
    })
  }
}


// ==========================================
// STUDENT
// ==========================================

exports.isStudent = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({
      email: req.user.email,
    })

    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      })
    }

    if (userDetails.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a Protected Route for Students",
      })
    }

    next()

  } catch (error) {
    console.log("IS STUDENT ERROR:", error)

    return res.status(500).json({
      success: false,
      message: "User Role Can't be Verified",
    })
  }
}


// ==========================================
// ADMIN
// ==========================================

exports.isAdmin = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({
      email: req.user.email,
    })

    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      })
    }

    if (userDetails.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a Protected Route for Admin",
      })
    }

    next()

  } catch (error) {
    console.log("IS ADMIN ERROR:", error)

    return res.status(500).json({
      success: false,
      message: "User Role Can't be Verified",
    })
  }
}


// ==========================================
// INSTRUCTOR
// ==========================================

exports.isInstructor = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({
      email: req.user.email,
    })

    console.log("USER DETAILS:", userDetails)

    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      })
    }

    console.log(
      "ACCOUNT TYPE:",
      userDetails.accountType
    )

    if (userDetails.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a Protected Route for Instructor",
      })
    }

    next()

  } catch (error) {
    console.log("IS INSTRUCTOR ERROR:", error)

    return res.status(500).json({
      success: false,
      message: "User Role Can't be Verified",
    })
  }
}