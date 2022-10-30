import * as React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../Nav";
import styles from "./index.module.css";
import Header from "../Header";

export default function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <Nav />
        <Outlet />
      </div>
    </div>
  );
}