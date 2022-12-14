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


function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
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
    return (
      <>
        <div className="content">
          <GauchesList gauches={data.gauches} onRefresh={refreshData}/>
          <GraphCard graph={data.graphs.Temperature} graphRange={1} onRefresh={refreshData}/> 
          {/* the graphRange is how much back of days we want to get data*/}
          <GraphCard graph={data.graphs.Humidity} graphRange={1} onRefresh={refreshData}/>
          <GraphCard graph={data.graphs.Pressure} graphRange={1} onRefresh={refreshData}/>
          <GraphCard graph={data.graphs.Uv} graphRange={1} onRefresh={refreshData}/>
        </div>
      </>
    );
  }


}

export default Dashboard;
