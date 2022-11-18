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
    return (
      <>
        <div className="content">
          <GauchesList gauches={data.gauches} onRefresh={refreshData}/>
          <GraphCard graph={data.graphs.Temperature} onRefresh={refreshData}/>
          <GraphCard graph={data.graphs.Humidity} onRefresh={refreshData}/>
          {/* <Row>
            <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Email Statistics</CardTitle>
                  <p className="card-category">Last Campaign Performance</p>
                </CardHeader>
                <CardBody style={{ height: "266px" }}>
                  <Pie
                    data={data.graphs.emailGraph.data}
                    options={data.graphs.emailGraph.options}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                    <i className="fa fa-circle text-primary" /> Opened{" "}
                    <i className="fa fa-circle text-warning" /> Read{" "}
                    <i className="fa fa-circle text-danger" /> Deleted{" "}
                    <i className="fa fa-circle text-gray" /> Unopened
                  </div>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-calendar" /> Number of emails sent
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="6">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h5">NASDAQ: AAPL</CardTitle>
                  <p className="card-category">Line Chart with Points</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={data.graphs.NASDAQgraph.data}
                    options={data.graphs.NASDAQgraph.options}
                    width={2}
                    height={1}
                  />
                </CardBody>
                <CardFooter>
                  <div className="chart-legend">
                    <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                    <i className="fa fa-circle text-warning" /> BMW 5 Series
                  </div>
                  <hr />
                  <div className="card-stats">
                    <i className="fa fa-check" /> Data information certified
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row> */}
        </div>
      </>
    );
  }


}

export default Dashboard;
