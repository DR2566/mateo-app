import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Temperature from "views/Temperature";
import Humidity from "views/Humidity";


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
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-chart-bar-32",
    component: Icons,
  },

];
export default routes;