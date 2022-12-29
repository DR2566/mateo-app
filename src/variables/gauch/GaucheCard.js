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
import ErrorSite from 'variables/ErrorSite/ErrorSite';
import classes from './GaucheCard.module.css';
import { useState } from 'react';


const GaucheCard = (props) => {
  let err = false

  if(!props.gauch.currentValue){
    props.onRefresh();
  }
  let maxValue = props.gauch.range[1];
  let minValue = props.gauch.range[0];
  if(Math.abs(maxValue) === Infinity || Math.abs(minValue) === Infinity){
    err = true;
  }

  return (
    <Col lg="6" md="6" sm="6" xs="12">
      <Card className="card-stats">
        <CardHeader>
          <CardTitle tag="h5">{props.gauchName}</CardTitle>
          <p className="card-category">Actual data</p>
        </CardHeader>
        <CardBody>
          {(err) 
            ? <ErrorSite/>
            : <Row>
                <Col g="12" md="12" sm="12" xs="12">
                  <Doughnut data={props.gauch.data} options={props.gauch.options} className="gauch-graph"></Doughnut>        
                </Col>
                <Col>
                  <div className={classes.valuesTag}>
                    <p>{props.gauch.range[0]}{props.gauch.unit}</p>
                    <p>{props.gauch.range[1]}{props.gauch.unit}</p>                
                  </div>
                </Col>
                <Col lg="12" md="12" sm="12" xs="12" className="gauch-value">
                  <p>{props.gauch.currentValue}{props.gauch.unit}</p>
                </Col>
              </Row>
          }
        </CardBody>
        <CardFooter>
          <hr />
          <div className="stats">
            <Button active block color="light" size="" onClick={props.onRefresh}>
              <i className="fas fa-sync-alt" /> Update Now
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Col>      
  );
}

export default GaucheCard;
