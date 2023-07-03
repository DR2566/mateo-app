import React, { useEffect, useState } from 'react';
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
import { getGauchObject } from 'dataProcess';
import Loading from 'components/Loading/Loading';


const GaucheCard = (props) => {
  const [error, setError] = useState(false);
  const [currentGauch, setCurrentGauch] = useState({});
  const [loaded, setLoaded] = useState(false);

  const loadData = async () => {
    setLoaded(false);
    let gauchObject = await getGauchObject(props.gauchName);
    await setCurrentGauch(gauchObject)
    setLoaded(true);
  }

  useEffect(()=>{
    loadData()
  },[])

  return (
    <Col lg="6" md="6" sm="6" xs="12">
      <Card className="card-stats">
        <CardHeader>
          <CardTitle tag="h5">{props.gauchName}</CardTitle>
          <p className="card-category">Actual data</p>
        </CardHeader>
        {!loaded
        ? <CardBody><Loading/></CardBody>
        :
        <CardBody>
          {(error) 
            ? <ErrorSite/>
            : <Row>
                <Col g="12" md="12" sm="12" xs="12">
                  <Doughnut data={currentGauch.data} options={currentGauch.options} className="gauch-graph"></Doughnut>        
                </Col>
                <Col>
                  <div className={classes.valuesTag}>
                    <p>{currentGauch.range[0]}{currentGauch.unit}</p>
                    <p>{currentGauch.range[1]}{currentGauch.unit}</p>                
                  </div>
                </Col>
                <Col lg="12" md="12" sm="12" xs="12" className="gauch-value">
                  <p>{currentGauch.currentValue}{currentGauch.unit}</p>
                </Col>
              </Row>
          }
        </CardBody>
        }
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
