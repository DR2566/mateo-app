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


function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState({});

  const refreshData = () =>{
    setIsLoaded(false);
    refreshDataChart()
      .then((data)=>{
        setData(prev=>data);
        setIsLoaded(true);
      })
  }

  useEffect(() => {
    refreshData();
  }, []);

  if(!isLoaded){
    return(
      <Loading/>
    )
  }else{
    console.log(data.gauches);
    return (
      <>
        <div className="content">
          <GauchesList gauches={data.gauches} onRefresh={refreshData}/>
          <GraphCard graph={data.graphs.Temperature} graphRange='24hours' onRefresh={refreshData}/>
          <GraphCard graph={data.graphs.Humidity} graphRange='24hours' onRefresh={refreshData}/>
          <GraphCard graph={data.graphs.Pressure} graphRange='24hours' onRefresh={refreshData}/>
        </div>
      </>
    );
  }


}

export default Dashboard;
