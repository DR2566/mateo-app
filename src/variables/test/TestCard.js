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
import Loading from 'components/Loading/Loading';

const TestCard = (props) => {
  return (
    <>
      <Card>
        <CardBody style={{fontSize:'25px', padding:'30px'}}>
          <Row style={{display:'flex', alignItems: 'center'}}>
            <Col lg="4" md="6" sm="6" xs="8">
              <div style={{display:'inline', textAlign:'left'}}>
                {props.sensor} 
              </div>            
            </Col>
            <Col lg="4" md="3" sm="3" xs="3" style={{textAlign:'right', padding:'0', fontSize:'20px'}}>
              <div style={{margin:'0'}}>
                {(props.loaded) 
                  ? <p style={{margin:'0'}}>{props.value}</p>
                  : <Loading siteLoading="false"/>
                }
              </div>            
            </Col>
            <Col lg="4" md="3" sm="3" xs="1" style={{textAlign:'right',fontSize:'20px', padding:'0'}}>
              <div style={{display:'inline', textAlign:'right'}}>
                {((props.value!=='error') && (!!props.value) && (!!props.loaded))
                  ? <i className="nc-icon nc-check-2" /> 
                  : <i className="nc-icon nc-simple-remove"/>   
                }
              </div>            
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
}

export default TestCard;
