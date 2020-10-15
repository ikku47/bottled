import Axios from "axios";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import Styles from "./message.module.scss";

function formatUrl(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "http://" + url;
  }
  return url;
}

export default function Message() {
  let { id } = useParams();
  const [result, setresult] = useState({});
  const apiCall = () => {
    Axios.get(`/${id}`)
      .then(function (response) {
        // handle success
        if (response.data.type === "link") {
          window.location = formatUrl(response.data.message);
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
        Message will disappear &nbsp;
        <span>
          <Moment interval={1000} fromNow>
            {result.expiry}
          </Moment>
        </span>
      </div>
    </div>
  );
}
