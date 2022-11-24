import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';


import AdminLayout from "layouts/Admin.js";
import { IonApp } from "@ionic/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <DataContextProvider>
        <Switch>
          <Route path="/" render={(props) => <AdminLayout {...props} />} />
        </Switch>      
    </DataContextProvider>
  </BrowserRouter>
);
