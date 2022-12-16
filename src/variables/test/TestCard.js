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
        <CardBody style={{fontSize:'30px', padding:'30px'}}>
          <div style={{display:'flex', justifyContent: 'space-around'}}>
            <div style={{display:'inline', textAlign:'left'}}>
              {props.sensor} 
            </div>
            <div>
              {(props.loaded) 
                ? <p>{props.value}</p>
                : <Loading siteLoading="false"/>
              }
            </div>
            <div style={{display:'inline', textAlign:'right'}}>
              {((props.value!=='error') && (!!props.value) && (!!props.loaded))
                ? <i className="nc-icon nc-check-2" /> 
                : <i className="nc-icon nc-simple-remove" />   
              }
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default TestCard;
