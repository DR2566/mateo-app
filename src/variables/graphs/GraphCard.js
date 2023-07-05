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

import Loading from "components/Loading/Loading";
import ErrorSite from "variables/ErrorSite/ErrorSite";
import { DataContext } from "variables/DataContext";

import { getGraphObject, getData} from "dataProcess";

const GraphCard = (props) => {
  const [selectedTimeInterval, setSelectedTimeInterval] = useState(false)
  const [currentGraph, setCurrentGraph] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [responseObject, setResponseObject] = useState(null)
  const [granularity, setGranularity] = useState('hour');

  const changeDataGranularityHandler = async(granularity) => {
    setLoaded(false);
    setGranularity(granularity)
    let graphObject = getGraphObject(responseObject, props.graphName, granularity);
    await setCurrentGraph(graphObject)
    setLoaded(true);
  }
  
  const pickerHandler = async(e) => {
    if(e.length === 2){
      await setSelectedTimeInterval((prev)=>{return [e[0].getTime()/1000, e[1].getTime()/1000]});
      loadData([e[0].getTime()/1000, e[1].getTime()/1000]);
    }
  }

  const loadData = async (timeInterval=false) => {
    setLoaded(false);
    let resObj = await getData(props.graphName, timeInterval)
    setResponseObject(prev=>resObj)
    let graphObject = getGraphObject(resObj, props.graphName, 'hour');
    setCurrentGraph(graphObject)
    setLoaded(true);
  }


  useEffect(()=>{
    loadData(false);
  }, [])


  return (
    <Row>
      <Col md="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h5">{props.graphName}</CardTitle>
            <p className="card-category">{(props.graphRange===1)? '24 hours data':props.graphRange}</p>
            {(error) // for the hide the time range
              ? null
              : <div style={{textAlign: 'center'}}>
                  <ButtonGroup>
                    <Button onClick={()=>changeDataGranularityHandler('hour')}>Hourly</Button>
                    <Button onClick={()=>changeDataGranularityHandler('quarter')}>1/4 Hour</Button>
                  </ButtonGroup>
                </div>
            }
          </CardHeader>
          {!loaded
            ? <CardBody><Loading/></CardBody>
            :
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
          }
          <CardFooter>
            <hr />
            <div className="stats">
              {(typeof props.graphRange === 'number')
                ? <DatePicker onErase={()=>{}} onChange={pickerHandler}/>
                : null
              }
            </div>
          </CardFooter>
        </Card>
      </Col>
    </Row>
  );

}

export default GraphCard;
