import React from 'react';
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

const ErrorSite = () => {
  return (
    <div style={{textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Card style={{backgroundColor: 'hsla(0, 100%, 50%, 0.204)'}}>
        <CardBody>
          <p style={{fontSize: '175%', color: 'red'}}>
            We're sorry,<br/>
            something went wrong...
          </p>     
        </CardBody>
        <CardFooter>
          <img style={{width: '50%'}} src='https://bridgemastersinc.com/wp-content/uploads/2018/08/shutterstock_79376425-1024x717.jpg'/>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ErrorSite;
