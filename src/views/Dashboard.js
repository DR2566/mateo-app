import React from "react";
import { useState, useEffect, useContext } from "react";
// react plugin used to create charts
import { Line, Pie, Doughnut } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Button
} from "reactstrap";
// core components
import {
  refreshDataChart,
  sensors
} from "variables/charts.js";
import './Dashboard.css';
// import { IonButton, IonItem, IonLabel } from '@ionic/react';
import GauchesList from '../variables/gauch/GauchesList';
import GraphCard from "variables/graphs/GraphCard";

import Loading from "components/Loading/Loading";
import ErrorSite from "variables/ErrorSite/ErrorSite";
import { DataContext } from "variables/DataContext";


const Dashboard = (props) => {

  // let dataContext = useContext(DataContext);

  return (
    <>
      <div className="content">
        <p>

        </p>
        <GauchesList />
        <GraphCard graphName='Temperature' graphRange={'24 hours'}  /> 
        <GraphCard graphName='Humidity' graphRange={'24 hours'}  /> 
        <GraphCard graphName='Pressure' graphRange={'24 hours'}  /> 
        {/* <GraphCard graphName='Uv' graphRange={'24 hours'}  />  */}
      </div>
    </>
  );
}

export default Dashboard;
