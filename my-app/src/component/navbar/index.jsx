import React from "react";
import { Link, withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { isLoggedIn } from "actions/authentication";
import Styles from "./navbar.module.scss";

function Navbar({ history }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };
  return (
    <nav className={Styles.container}>
      <span>
        <Link class="wordmark" href="/">
          <img src="/logo192.png" /> <span>Bottle</span>
        </Link>
      </span>
      <span>
        {isLoggedIn() && (
          <>
            <Link to="/">Send your own message.</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </span>
    </nav>
  );
}

export default withRouter(Navbar);
