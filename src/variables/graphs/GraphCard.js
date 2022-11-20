import React from "react";
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

const GraphCard = (props) => {
  // console.log(props.graph);
  const graph = {...props.graph};
  const allDates = [...graph.data.labels];

  const lastMeasureDay =  allDates[allDates.length-1].slice(8, 10);
  const lastMeasureHour =  allDates[allDates.length-1].slice(11, 13);
  const lastMeasureTimeStamp = allDates[allDates.length-1];

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
    const [selectedDay, selectedHour] = selectedValues;

    let selectedTimeStamp;

    for(let i=allDates.length-1;i>=0;i--){
      let day = allDates[i].slice(8, 10);
      if(day === selectedDay){
        let hour = allDates[i].slice(11, 13);
        if(hour === selectedHour){
          selectedTimeStamp = allDates[i];
        }
      }
    }
    return selectedTimeStamp;
  }

  const chooseValuesTimeRange = (START, STOP) => { // choose only the selecteed time interval 
    // console.log(START);
    // console.log(STOP);
    const startIndex = allDates.indexOf(START);
    const stopIndex = allDates.indexOf(STOP);
    graph.data.labels = graph.data.labels.slice(startIndex, stopIndex+1);
    graph.data.datasets[0].data = graph.data.datasets[0].data.slice(startIndex, stopIndex+1); //slice wants to have one more stopping index
  }

  if(props.graphRange === '24hours'){
    const valideTimeStampSTART = getValideTimeStamp(getYesterday());
    const valideTimeStampSTOP = lastMeasureTimeStamp;
    chooseValuesTimeRange(valideTimeStampSTART, valideTimeStampSTOP);    
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
            </div>
          </CardFooter>
        </Card>
      </Col>
    </Row>
  );
}

export default GraphCard;
