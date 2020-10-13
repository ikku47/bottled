import Axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { isLoggedIn } from "actions/authentication";
import Styles from "./login.module.scss";

function Login({ history }) {
  useEffect(() => {
    if (isLoggedIn()) {
      history.push("/");
    }
  }, []);
  const [data, setdata] = useState({});
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setdata({ ...data, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post("/login", data)
      .then(function (response) {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        history.push("/");
      })
      .catch(function (error) {
        console.log(error.response.data);
        toast.error(error.message);
      });
  };

  return (
    <div className={Styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        <input type="submit" value="login" onChange={handleSubmit} />
      </form>
    </div>
  );
}

export default withRouter(Login);
