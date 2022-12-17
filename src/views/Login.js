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
import LoginForm from 'variables/LoginForm/LoginForm';

export default function Login(props) {
  return (
    <div>
      <Row>
        <Col>
          <Card style={{width:'50%', margin: 'auto'}}>
            <CardHeader style={{textAlign:'center', fontSize:'40px'}}>
              Login
            </CardHeader>
            <CardBody>
              <LoginForm onSuccessLogin={props.onSuccessLogin}/>
            </CardBody>
            <CardFooter>
            </CardFooter>
          </Card>
        </Col>  
      </Row>
    </div>
  )
}
