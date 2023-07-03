import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Temperature from "views/Temperature";
import Humidity from "views/Humidity";
import Pressure from "views/Pressure";
import Uv from 'views/Uv';
import DevOptions from 'views/DevOptions';
import ErrorSite from 'variables/ErrorSite/ErrorSite'


var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-layout-11",
    component: Dashboard,
  },
  {
    path: "/temperature",
    name: "Temperature",
    icon: "nc-icon nc-chart-bar-32",
    component: Temperature,
  },
  {
    path: "/humidity",
    name: "Humidity",
    icon: "nc-icon nc-chart-bar-32",
    component: Humidity,
  },
  {
    path: "/pressure",
    name: "Pressure",
    icon: "nc-icon nc-chart-bar-32",
    component: Pressure,
  },
  // {
  //   path: "/uv",
  //   name: "Uv",
  //   icon: "nc-icon nc-chart-bar-32",
  //   component: Uv,
  // },
  // {
  //   path: "/test",
  //   name: "DevOps",
  //   icon: "nc-icon nc-settings",
  //   component: DevOptions,
  // },
];
export default routes;