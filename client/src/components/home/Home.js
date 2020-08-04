import React, { Fragment } from "react"
import { withRouter } from "react-router"
function Home(props) {
  const resetToken = () => {
    localStorage.removeItem("token")
    props.history.push("/signin")
  }
  return (
    <div className="page-center" style={{ textAlign: "center" }}>
      <div>Hey, you are logged In!</div>
      <button className="button button-primary" onClick={resetToken}>
        click here to Logout
      </button>
    </div>
  )
}

export default withRouter(Home)
