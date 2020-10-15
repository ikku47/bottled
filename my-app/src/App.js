import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AuthRoute from "AuthRoute";
import Navbar from "component/navbar";
import "./App.scss";
const Message = lazy(() => import("pages/message"));
const login = lazy(() => import("pages/login"));
const Home = lazy(() => import("pages/home"));

function WaitingComponent(Component) {
  return (props) => (
    <Suspense
      fallback={
        <div className="loading">
          <>Loading</>
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );
}


function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/login" component={WaitingComponent(login)} />
        <Route
          exact
          path="/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12})"
          component={WaitingComponent(Message)}
        />
        <AuthRoute exact path="/" component={WaitingComponent(Home)} />
      </Switch>
    </div>
  );
}

export default App;
