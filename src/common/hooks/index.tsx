import React from "react";
import { useLocation, Navigate } from "react-router-dom";

export function useRedirect() {
  const location = useLocation();

  const loader = async () => {
    const pathname = location.pathname;
    { pathname === '/' && <Navigate replace to="/clearColor" /> }
  };

  return { loader }
}

