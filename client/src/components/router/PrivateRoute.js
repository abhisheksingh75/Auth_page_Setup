import React, { useEffect, useState } from "react"
import { Route, Redirect } from "react-router-dom"
import { loaduser } from "../../utilities/loaduser"

function PrivateRoute({ component: Component, ...rest }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    ;(async function callLoadUser() {
      if (await loaduser()) {
        setIsAuthenticated(true)
        setIsLoading(false)
      } else {
        setIsAuthenticated(false)
        setIsLoading(false)
      }
    })()
  }, [])

  return (
    !isLoading && (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />
        }
      />
    )
  )
}

export default PrivateRoute
