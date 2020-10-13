import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthRoute from "AuthRoute";
import Home from "pages/home";
import login from "pages/login";
import "./App.css";
import Message from "pages/message";
import Navbar from "component/navbar";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Switch>
        <Route exact path="/login" component={login} />
        <Route
          exact
          path="/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12})"
          component={Message}
        />
        <AuthRoute exact path="/" component={Home} />
        {/* <AuthRoute component={Page404} /> */}
      </Switch>
    </div>
  );
}

export default App;
