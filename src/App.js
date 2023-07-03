
import React, { useEffect, useState, useContext } from "react";
import { Route, Switch, useLocation, Redirect } from "react-router-dom";

// import ionic styles
import '@ionic/react/css/core.css';

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import ErrorSite from "variables/ErrorSite/ErrorSite";

// import {getData, makeVisualObjects} from "dataProcess";
import Loading from "components/Loading/Loading";

import routes from "routes.js";
import { DataContext } from "variables/DataContext";


const  App = (props) => {
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const mainPanel = React.useRef();


  return (
    <div className="wrapper">
      <Sidebar
        location={props.location}
        routes={routes}
        bgColor={backgroundColor}
      />

      <div className="main-panel" ref={mainPanel}>
        <DemoNavbar/>
          <Switch>
            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
            <Redirect from="/" to="/dashboard"/>
          </Switch>
        <Footer fluid />
      </div>
    </div>
  );
}

export default App