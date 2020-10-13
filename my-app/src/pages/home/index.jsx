import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import Styles from "./home.module.scss";

export default function Home() {
  const [result, setresult] = useState([]);
  const [data, setdata] = useState([]);

  const apiCall = () => {
    Axios.get("")
      .then(function (response) {
        // handle success
        setresult(response.data);
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
    setdata({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post("", data)
      .then(function (response) {
        apiCall();
      })
      .catch(function (error) {
        console.log(error.response.data);
        toast.error(error.message);
      });
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
      <h1>Write a bottled message</h1>
      <form className={Styles.from} onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          placeholder="write your message"
          value={data.message}
          onChange={handleChange}
        />
        <input
          type="number"
          name="expiry"
          placeholder="Self-destruct Timer in minutes"
          value={data.expiry}
          onChange={handleChange}
        />
        <input type="submit" value="Generate Link" onChange={handleSubmit} />
      </form>
      <table className={Styles.table}>
        <thead>
          <tr>
            <th>MESSAGE</th>
            <th>URL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {result.map((val) => (
            <tr key={val.id}>
              <td>{val.message}</td>
              <td>
                <Link to={val.id}>{val.id}</Link>
              </td>
              <th>
                <button onClick={() => handleShare(val.id)}>Share</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
