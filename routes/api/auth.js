const express = require("express")
const axios = require("axios")
const router = express.Router()
require("dotenv").config()

const {
  signUp,
  gogleSignUpSignIn,
  signIn,
  requireSignIn,
  loadUser,
} = require("../../controllers/auth")
const {
  userSignUpValidator,
  userSignInValidator,
} = require("../../validators/index")

// api/auth/signup
router.post("/signup", userSignUpValidator, signUp)

// api/auth/signin
router.post("/signin", userSignInValidator, signIn)

// api/auth/google
router.get("/google", gogleSignUpSignIn)

//api/auth
router.get("/home", requireSignIn, loadUser)

module.exports = router
