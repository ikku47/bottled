import React, { useEffect } from "react";
import { withRouter, Route } from "react-router-dom";
import { isLoggedIn } from "actions/authentication";
import Navbar from "component/navbar";

function AuthRoute({ component: Component, history, ...rest }) {
  useEffect(() => {
    if (!isLoggedIn()) {
      history.push("/login");
    }
  }, [history]);
  return (
    <>
      <Route {...rest} render={(props) => <Component {...props} />} />
    </>
  );
}
export default withRouter(AuthRoute);
