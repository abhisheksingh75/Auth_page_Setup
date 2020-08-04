import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link, Redirect } from "react-router-dom"
import { loaduser } from "../../utilities/loaduser"
import { withRouter } from "react-router"

function SignIn(props) {
  // response_type=code&
  const GOGLE_CLIENT_ID =
    "9115345402-ka6lgk50vcoqpdujmcvh22uum97le0j5.apps.googleusercontent.com"
  const gogleSignUpURL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOGLE_CLIENT_ID}&redirect_uri=http://localhost:3000/googlesignin&scope=openid%20profile%20email&access_type=offline&prompt=consent`
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [islogged, setIsLogged] = useState(false)

  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const config = {
      headers: {
        "content-type": "application/json",
      },
    }
    try {
      const res = await axios.post("/api/auth/signin", formData, config)
      console.log("res", res)
      if (res.data.token) {
        localStorage.setItem("token", res.data.token)
        props.history.push("/")
      }
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  return (
    <div className="container">
      <div className="login-form">
        <a
          className="button button-primary text-center full-width"
          href={gogleSignUpURL}
        >
          SignIn With Google
        </a>
        <h6>
          <span>Or</span>
        </h6>
        <form onSubmit={handleSubmit}>
          {/* email */}
          <input
            class="u-full-width"
            type="email"
            placeholder="Enter your email"
            id="emailInput"
            name="email"
            onChange={onChange}
          />
          {/* password */}
          <input
            class="u-full-width"
            type="password"
            placeholder="Enter your password"
            id="passwordInput"
            name="password"
            onChange={onChange}
          ></input>
          {/* submit button */}
          <input
            class="u-full-width button button-primary"
            type="submit"
            value="submit"
          />
        </form>
        <h5>
          Don't have an account? <Link to="/signup"> Signup Here</Link>
        </h5>
      </div>
    </div>
  )
}

export default withRouter(SignIn)
