import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import axios from "axios"
import queryString from "query-string"
import { withRouter } from "react-router"

function GoogleSignIn(props) {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    ;(async function handleSubmit(e) {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      }
      try {
        const res = await axios.get(
          `/api/auth/google?code=${
            queryString.parse(props.location.search).code
          }`,
          config
        )
        console.log("res", res)
        if (res) {
          localStorage.setItem("token", res.data.token)
          props.history.push("/")
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  return isLoading && <div>loading...</div>
}

export default withRouter(GoogleSignIn)
