import Axios from "axios";
import Select from "component/select";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import Styles from "./home.module.scss";
import Moment from "react-moment";

const OPTIONS = {
  TYPES: [
    { value: "message", label: "message" },
    { value: "link", label: "link" },
  ],
  TIMER: [
    { value: 60, label: "1 minute" },
    { value: 600, label: "10 minutes" },
    { value: 3600, label: "1 hour" },
    { value: 86400, label: "1 day" },
    { value: 604800, label: "1 week" },
  ],
};

function buttonProps(status) {
  switch (status) {
    case 1:
      return {
        style: { backgroundColor: "#b433ff" },
        value: "Genetrating....",
      };
    case 2:
      return {
        style: { backgroundColor: "#30fcccf2", color: "black" },
        value: "Success",
      };
    default:
      return {
        style: {},
        value: "Genetrate",
      };
  }
}

export default function Home() {
  const [result, setresult] = useState([]);
  const [apistatus, setapistatus] = useState(0);
  const [error, seterror] = useState({});
  const [data, setdata] = useState({
    timer: 600,
    type: "message",
  });

  const apiCall = () => {
    Axios.get("")
      .then(function (response) {
        // handle success
        setresult(response.data.reverse());
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  useEffect(() => {
    apiCall();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setapistatus(0);
    setdata({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.message) {
      setapistatus(1);
      Axios.post("", data)
        .then(function (response) {
          apiCall();
          setapistatus(2);
          setdata({ ...data, message: "" });
        })
        .catch(function (error) {
          console.log(error.response.data);
          toast.error(error.message);
        });
    } else {
      seterror({ message: "No message provided" });
    }
  };

  const handleShare = (id) => {
    const shareData = {
      title: "Bottled Message",
      text: "Check this url",
      url: id,
    };
    try {
      navigator.share(shareData);
    } catch (err) {}
  };

  return (
    <div className={Styles.container}>
      <h1 className={Styles.heading}>
        Write a bottled
        <Select
          onChange={handleChange}
          name="type"
          options={OPTIONS.TYPES}
          value={data.type}
        />
      </h1>
      <form className={Styles.from} onSubmit={handleSubmit}>
        <input
          className={Styles.message}
          type="text"
          name="message"
          placeholder="write your message"
          value={data.message}
          onChange={handleChange}
        />

        <input
          className={Styles.button}
          type={"submit"}
          {...buttonProps(apistatus)}
        />
      </form>
      {error.message && (
        <div className={Styles.error}>
          <h2>😓 Oops!</h2>
          <p>{error.message}</p>
        </div>
      )}
      <div className={Styles.timer}>
        <h3>Self-destruct Timer</h3>
        <Select
          onChange={handleChange}
          name="timer"
          options={OPTIONS.TIMER}
          value={data.timer}
        />
      </div>
      <table className={Styles.table}>
        <thead>
          <tr>
            <th>MESSAGE</th>
            <th>URL</th>
            <th>EXPIRY DATE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {result.map((val) => (
            <tr key={val.id}>
              <td>{val.message}</td>
              <td>
                <Link to={val.id}>{`${window.location.href}${val.id}`}</Link>
              </td>
              <td>
                <Moment>{val.expiry}</Moment>
              </td>
              <td>
                <button onClick={() => handleShare(val.id)}>Share</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
