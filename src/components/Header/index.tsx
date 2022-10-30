import * as React from "react";
import styles from "./index.module.css"
import logo from "src/webgl.png";
export default function () {
  return <div className={styles.container}>
    <img src={logo} alt="logo" />
    <h1>WebGL权威指南</h1>
  </div>
}