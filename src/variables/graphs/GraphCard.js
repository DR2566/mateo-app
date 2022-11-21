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
  sensors
} from "variables/charts.js";
import DatePicker from 'variables/DatePicker/DatePicker';

const GraphCard = (props) => {
  const [valideTimeStamps, setValideTimeStamps] = useState([]);
  const graph = {...props.graph};
  const allDates = [...graph.data.labels];

  const lastMeasureDay =  allDates[allDates.length-1].slice(8, 10);
  const lastMeasureHour =  allDates[allDates.length-1].slice(11, 13);
  const lastMeasureTimeStamp = allDates[allDates.length-1];
  allDates.map(date=>{
    console.log(date);
  })

  const getYesterday = () => { // gets the yesterday's day and hour
    let yesterdayDay = false;
    let yesterdayHour = lastMeasureHour;

    for(let i=allDates.length-1;i>=0;i--){
      let date = allDates[i].slice(8, 10);
      if(lastMeasureDay !== date){
        yesterdayDay = date;
        break;
      }
    }
    if(!yesterdayDay){
      yesterdayDay = lastMeasureDay;
      yesterdayHour = '0';
    }
    return [yesterdayDay, yesterdayHour];
  }

  const getValideTimeStamp = (selectedValues) => { //gets the valide timeStamp that is written in the Database due the selected time and day
    let selectedDay = selectedValues[0];
    let selectedHour = selectedValues[1];
    // console.log(selectedValues);
    let selectedTimeStamp = false;

    for(let i=allDates.length-1;i>=0;i--){
      let day = allDates[i].slice(8, 10);
      console.log(day, selectedDay);
      if(day == selectedDay){
        console.log('df');
        let hour = allDates[i].slice(11, 13);
        console.log(hour);
        if(hour == selectedHour){
          console.log('lll');
          selectedTimeStamp = allDates[i];
        }
      }
    }
    console.log(selectedTimeStamp, selectedDay, selectedHour);
    return selectedTimeStamp;
  }

  const chooseValuesTimeRange = (start, stop) => { // choose only the selecteed time interval 
    console.log(start, stop);
    if(!!start && !!stop){
      const startIndex = allDates.indexOf(start);
      const stopIndex = allDates.indexOf(stop);
      graph.data.labels = graph.data.labels.slice(startIndex, stopIndex+1);
      graph.data.datasets[0].data = graph.data.datasets[0].data.slice(startIndex, stopIndex+1); //slice wants to have one more stopping index
      setValideTimeStamps({});      
    }
  } // PROBLEM WITH GIVING REFERENCE OF ALLDATES, BECAUSE IT IS CROPPED OUT AND THEN THERE ARE NO VALUES THERE !!!!!

  useEffect(() => {
    const start = getValideTimeStamp(getYesterday());
    const stop = lastMeasureTimeStamp;
    chooseValuesTimeRange(start, stop);
  }, []);

  const pickerHandler = (e) => {
    const START = getValideTimeStamp([String(e[0].getDate()).padStart(2, "0"), String(e[0].getHours()).padStart(2, "0")]);
    const STOP = getValideTimeStamp([String(e[1].getDate()).padStart(2, "0"), String(e[1].getHours()).padStart(2, "0")]);
    console.log(START, STOP);
    chooseValuesTimeRange(START, STOP);
  }

  return (
    <Row>
      <Col md="12">
        <Card>
          <CardHeader>
            <CardTitle tag="h5">{props.graph.name}</CardTitle>
            <p className="card-category">24 Hours performance</p>
          </CardHeader>
          <CardBody>
            <Line
              data={graph.data}
              options={graph.options}
              width={2}
              height={1}
            />
          </CardBody>
          <CardFooter>
            <hr />
            <div className="stats">
              {/* <i className="fa fa-history" /> Updated 3 minutes ago */}
              {(props.graphRange ==='multi')
                ? <DatePicker onChange={pickerHandler}/>
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
