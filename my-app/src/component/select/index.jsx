import React from "react";
import Icon from "./icon";
import Styles from "./select.module.scss";

export default function Select({ options = [], ...props }) {
  return (
    <div className={Styles.container}>
      <select className={Styles.select} {...props}>
        {options.map((val) => (
          <option value={val.value} selected="">
            {val.label}
          </option>
        ))}
      </select>
      <i>
        <Icon />
      </i>
    </div>
  );
}
