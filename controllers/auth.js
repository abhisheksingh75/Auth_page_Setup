const User = require("../models/user")
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")
const { json } = require("express")
const { prependListener } = require("../models/user")
const axios = require("axios")
const { v4: uuid } = require("uuid")
require("dotenv").config()

exports.signUp = async (req, res) => {
  //check for errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const firstError = errors.errors[0].msg
    return res.status(400).json({ msg: firstError })
  }

  try {
    let user = new User(req.body)
    user.email = user.email.toUpperCase()
    const userExists = await User.findOne({ email: user.email })
    if (userExists) {
      return res.status(400).json({ error: "Email already registered" })
    }
    await user.save()
    user.salt = undefined
    user.hashed_password = undefined
    //generate a signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "480h",
    })
    const { _id, name, email } = user
    res.json({ token, user: { _id, name, email } })
    return
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

exports.signIn = async (req, res) => {
  try {
    // check if user exists
    const userExists = await User.findOne({
      email: req.body.email.toUpperCase(),
    })

    if (!userExists) {
      return res.status(400).json({ error: "Invalid Credentials email" })
    }

    // authenticate
    if (!userExists.authenticate(req.body.password)) {
      return res.status(400).json({ error: "Invalid Credentials pas" })
    }
    // generate token and seent to client
    //generate a signed token
    const token = jwt.sign({ _id: userExists._id }, process.env.JWT_SECRET, {
      expiresIn: "480h",
    })

    const { _id, name, email } = userExists
    return res.json({ token, user: { _id, name, email } })
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({ msg: error.message })
  }
}

// google signup and signIn
exports.gogleSignUpSignIn = async (req, res) => {
  if (req.query.code !== undefined) {
    try {
      const { data } = await axios({
        url: `https://oauth2.googleapis.com/token`,
        method: "post",
        data: {
          client_id: process.env.GOGLE_CLIENT_ID,
          client_secret: process.env.GOGLE_CLIENT_SECRET,
          redirect_uri: "http://localhost:3000/googlesignin",
          grant_type: "authorization_code",
          code: req.query.code,
        },
      })
      console.log("aaaa")
      //get data
      const UserData = await axios({
        url: "https://www.googleapis.com/oauth2/v3/userinfo",
        method: "get",
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      })
      console.log("qqqq")
      //verify user info
      if (UserData.data.email_verified) {
        const user = await User.findOne({
          email: UserData.data.email.toUpperCase(),
        })
        console.log("Asasdasdas")
        // if user doesn't exists
        if (!user) {
          const user = new User({
            name: UserData.data.name,
            email: UserData.data.email.toUpperCase(),
            password: uuid(),
          })
          await user.save()
        }
        console.log(user)
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "480h",
        })
        console.log(user)
        const { _id, email, name } = user
        return res.json({ token, user: { _id, email, name } })
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  } else {
    return res.status(400).json({ msg: "Failed google login" })
  }
}

exports.requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "Authorization",
  algorithms: ["HS256"],
})

exports.loadUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.Authorization._id })
    //return to user
    const { _id, name, email, role } = user
    return res.json({ _id, name, email, role })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
