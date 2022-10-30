import * as React from "react";

const HelloPoint1 = React.lazy(() => import("src/pages/HelloPoint1"))
const HelloCanvas = React.lazy(() => import('src/pages/HelloCanvas'))
const NoMatch = React.lazy(() => import('src/pages/NoMatch'))

export const routers = [

  {
    name: 'home',
    path: '/',
    element: React.Fragment,
  },
  {
    name: 'clearColor',
    path: '/clearColor',
    element: HelloCanvas,
  },
  {
    name: 'helloPoint1',
    path: '/helloPoint1',
    element: HelloPoint1,
  },
  {
    name: 'NoMatch',
    path: '*',
    element: NoMatch,
  },
]