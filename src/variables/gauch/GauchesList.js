import React from 'react';
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
import GaucheCard from './GaucheCard';
import {
  sensors
} from "variables/charts.js";


const GauchesList = (props) => {
  // console.log(props.gauches);
  return (
      <Row>
          {
            sensors.map((sensor, key)=>{
              let gauch = props.gauches[sensor];
              // console.log({gauch, sensor});
              return(
                <GaucheCard gauch={gauch} gauchName={sensor} key={key} onRefresh={props.onRefresh}/>
              )
            })
          }
      </Row>
  );
}

export default GauchesList;
