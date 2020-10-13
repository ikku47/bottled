import _ from "underscore";
export const isLoggedIn = () => {
    const token = localStorage.getItem("token");
   return !_.isEmpty(token)
}
