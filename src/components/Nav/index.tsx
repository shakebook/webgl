import * as React from "react";
import { NavLink } from "react-router-dom";
import styles from "./index.module.css"
export default function () {
  const active = {
    color: "blue",
    textDecoration: "underline",
    fontWeight: "bold"
  }
  return <nav className={styles.nav}>
    <ul>
      <li>
        <NavLink
          style={({ isActive }) => isActive ? active : {}}
          to="/clearColor"
        >
          最简短的WebGL程序：清空绘图区
        </NavLink>
      </li>
      <li>
        <NavLink
          style={({ isActive }) => isActive ? active : {}}
          to="/helloPoint1"
        >
          WebGL程序：绘制一个点
        </NavLink>
      </li>
    </ul>
  </nav >
}