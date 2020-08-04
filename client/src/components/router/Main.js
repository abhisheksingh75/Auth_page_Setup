import React, { useEffect } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import SignUp from "../auth/SignUp"
import SignIn from "../auth/SignIn"
import Home from "../home/Home"
import PrivateRoute from "./PrivateRoute"
import GoogleSignIn from "../auth/GoogleSignIn"

function Main(props) {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp}></Route>
        <Route exact path="/signin" component={SignIn}></Route>
        <Route exact path="/googlesignin" component={GoogleSignIn}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Main
