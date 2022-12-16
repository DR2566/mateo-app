import React from 'react';
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
import {useEffect, useState} from 'react'
import TestList from '../variables/test/TestList'
import axios from 'axios';


const Test = () => {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({})

  const getData = () => {
    setLoaded(false);
    axios.get('http://student.gml.cz:3333/test')
      .then((res)=>{
        setData((prev)=>{
          return res.data[0]
        })
        setLoaded(true);
      })
      .catch((err)=>{console.log(err)})
  }

  const checkSensorsHandler = () =>  {
    getData();
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='content'>
      <Button active block color="light" style={{fontSize:'20px'}} onClick={checkSensorsHandler}>
        <i className="fas fa-sync-alt" /> CHECK SENSORS
      </Button>
      <TestList data={data} loaded={loaded}/>
    </div>  
  );
}

export default Test;
