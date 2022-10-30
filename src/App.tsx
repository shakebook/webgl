import * as React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { routers } from "./router";
const Layout = React.lazy(() => import('./components/Layout'))

export default function App() {
  return (
    <React.Suspense>
      <Routes>
        <Route key="layout" path="/" element={<Layout />}>
          {
            routers.map(item => <Route key={item.name}

              path={item.path} element={useLocation().pathname === '/' ? <Navigate replace to="/clearColor" /> : <item.element />}
            />)
          }
        </Route>
      </Routes>
    </React.Suspense>
  );
}

