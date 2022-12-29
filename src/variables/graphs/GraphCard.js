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
  Button,
  ButtonGroup,
  Dropdown
} from "reactstrap";
// core components
import {
  sensors,
  // erroriseSites
} from "variables/charts.js";
import DatePicker from 'variables/DatePicker/DatePicker';
import dataProcess from '../../dataProcess';

import Loading from "components/Loading/Loading";
import ErrorSite from "variables/ErrorSite/ErrorSite";

const GraphCard = (props) => {
  const [selectedTimeInterval, setSelectedTimeInterval] = useState([])
  const [currentGraph, setCurrentGraph] = useState({... props.graph});
  const [dataStep, setDataStep] = useState('hour');
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);


  const changeDataStepHandler = (step) => {
    setDataStep(prev=>step);
  }
  const eraseData = () => {
    setSelectedTimeInterval([dataProcess.getPastTime(1)[0],dataProcess.getPastTime(1)[1]]);
  }
  const croppGraphData = (timeIntervalList, dataList) => {
    timeIntervalList = timeIntervalList.slice(0, timeIntervalList.length-1).reverse();
    dataList = dataList.reverse();
    let clearedLabels = timeIntervalList.map(intDate=>{
      let date = new Date(intDate);
      let hour = String(date.getHours());
      let day = String(date.getDate());
      let month = String(date.getMonth()+1);
      return day +'.'+ month +'; '+ hour;
    });
    let data = dataList.map(hour=>{return hour[0]}); // arrays of arrays converted to only one array 
    let valideNumbers = data.filter(value=>value); // filter all non NaN values
    if(!valideNumbers.length){
      // erroriseSites();
      setError(true);
    }
    setCurrentGraph(prev=>{
      return {
        ...prev,
        data: {
          labels: clearedLabels,
          datasets: [
            {
              ...prev.data.datasets[0],
              data: data,
              borderColor: 'orange',
              backgroundColor: "orange",
            }
          ]
        },
      }
    });
  }
  const changeDataGraph = () => {
    let timeIntervalList = dataProcess.getLabelList([selectedTimeInterval[0], selectedTimeInterval[1]], dataStep);
    let dataList = dataProcess.getDataList(timeIntervalList, props.graph);    
    croppGraphData(timeIntervalList, dataList);
  }

  useEffect(()=>{
    changeDataGraph();
    if(currentGraph.name && !currentGraph.data.labels.length){
      setIsLoaded(true);
    }
  }, [selectedTimeInterval, dataStep]); //after useEffect below

  useEffect(() => {
    if(isLoaded){
      setIsLoaded(false);
    }
    const [start, stop] = dataProcess.getPastTime(1);
    setSelectedTimeInterval([start, stop]);
  }, []); //only once

  const pickerHandler = (e) => {
    if(e.length === 2){
      setSelectedTimeInterval(prev=>[e[0], e[1]]);
    }
  }
  if(!isLoaded){
    <Loading/>
  }else{
    // console.log(currentGraph);
    return (
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h5">{props.graph.name}</CardTitle>
              <p className="card-category">{(props.graphRange===1)? '24 hours data':props.graphRange}</p>
              {(error)
                ? null
                : <div style={{textAlign: 'center'}}>
                    <ButtonGroup>
                      <Button onClick={()=>changeDataStepHandler('hour')}>Hourly</Button>
                      <Button onClick={()=>changeDataStepHandler('quarter')}>1/4 Hour</Button>
                    </ButtonGroup>
                  </div>
              }
            </CardHeader>
            <CardBody>
              {(error)
                ? <ErrorSite/>
                : <Line
                    data={currentGraph.data}
                    options={currentGraph.options}
                    width={2}
                    height={1}
                  />
              } 
            </CardBody>
            <CardFooter>
              <hr />
              <div className="stats">
                {(typeof props.graphRange !== 'number')
                  ? <DatePicker onErase={eraseData} onChange={pickerHandler}/>
                  : null
                }
              </div>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    );
  }

}

export default GraphCard;
