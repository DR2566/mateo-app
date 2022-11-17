import React from "react";
import { useState, useEffect } from "react";
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


function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userData, setUserData] = useState({});

  const refreshData2 = async () =>{
    setIsLoaded(false);
    const actualizedData = await refreshDataChart();
    let gauches = actualizedData[0];
    let graphs = actualizedData[1];
    let data = {graphs, gauches};
    // console.log(data);
    setUserData(prev=>data);
    setIsLoaded(true);
  }

  const refreshData = () =>{
    setIsLoaded(false);
    refreshDataChart()
      .then((data)=>{
        setUserData(prev=>data);
        setIsLoaded(true);
      })
  }

  useEffect(() => {
    refreshData();
  }, []);

  if(!isLoaded){
    return(
      <div className="content">
        <h3 style={{textAlign: "center"}}>loading...</h3>
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    )
  }else{
    return (
      <>
        <div className="content">
          hi
          <GauchesList gauches={userData.gauches} onRefresh={refreshData}/>
          <GraphCard graph={userData.graphs.Temperature} onRefresh={refreshData}/>
          <GraphCard graph={userData.graphs.Humidity} onRefresh={refreshData}/>
          {/* <Row>
            <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Email Statistics</CardTitle>
                  <p className="card-category">Last Campaign Performance</p>
                </CardHeader>
                <CardBody style={{ height: "266px" }}>
                  <Pie
                    data={userData.graphs.emailGraph.data}
                    options={userData.graphs.emailGraph.options}
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
                    data={userData.graphs.NASDAQgraph.data}
                    options={userData.graphs.NASDAQgraph.options}
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
