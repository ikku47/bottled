import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Styles from "./message.module.scss";

function isUrl(str) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

export default function Message() {
  let { id } = useParams();
  const [result, setresult] = useState({});
  const apiCall = () => {
    Axios.get(`/${id}`)
      .then(function (response) {
        // handle success
        if (isUrl(response.data.message)) {
          window.location = response.data.message;
        } else setresult(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  useEffect(() => {
    apiCall();
  }, []);

  return (
    <div className={Styles.container}>
      <div className={Styles.message}>
        <p className="">{result.message}</p>
      </div>
      <div className={Styles.timer}>
        Message will disappear in <span data-time="3267">54m 27s</span>
      </div>
    </div>
  );
}
