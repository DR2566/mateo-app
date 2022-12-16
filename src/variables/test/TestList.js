import React from 'react';
import TestCard from './TestCard';
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
import { sensors } from 'variables/charts';

const TestList = (props) => {
  return (
    <>
      <Col lg="12" md="12" sm="12" xs="12">
        {sensors.map((sensor, key)=>{
          return(
            <TestCard sensor={sensor} value={props.data[sensor]} loaded={props.loaded} key={key}/>
          )
        })}
      </Col>
    </>
  );
}

export default TestList;
