import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';


import App from "App";
import { DataContextProvider } from "variables/DataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <DataContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" render={(props) => <App {...props} />} />
        </Switch>      
  </BrowserRouter>
    </DataContextProvider>
);
