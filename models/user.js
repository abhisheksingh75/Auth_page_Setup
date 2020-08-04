const mongoose = require("mongoose")
const crypto = require("crypto")
const { Console } = require("console")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 128,
      upperCase: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      maxlength: 128,
      unique: true,
      upperCase: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      trim: true,
    },
  },
  { timestamp: true }
)

userSchema
  .virtual("password")
  .set(function(password) {
    // create a tmp variable
    this._password = password
    // generate salt
    this.salt = this.makeSalt()
    //encrypt password
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() {
    return this._password
  })

userSchema.methods = {
  authenticate: function(plainPassword) {
    return this.encryptPassword(plainPassword) === this.hashed_password
  },
  encryptPassword: function(password) {
    if (!password) {
      return ""
    }
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex")
    } catch (error) {
      console.log("crypting error")
      return ""
    }
  },

  makeSalt: function() {
    return Math.round(new Date().valueOf * Math.random()) + ""
  },
}

module.exports = mongoose.model("user", userSchema)
