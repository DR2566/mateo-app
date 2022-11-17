
import React from "react";
import { Route, Switch, useLocation, Redirect } from "react-router-dom";

// import ionic styles
import '@ionic/react/css/core.css';

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";


import routes from "routes.js";

function Dashboard(props) {
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const mainPanel = React.useRef();


  const handleBgClick = ()=>{
    setBackgroundColor("white");
  }

  return (
    <div className="wrapper">
      <Sidebar
        {...props}
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

export default Dashboard;
