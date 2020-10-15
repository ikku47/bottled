import _ from "underscore";

export const isLoggedIn = () => {
  return !_.isEmpty(localStorage.getItem("token"));
};
