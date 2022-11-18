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
              data={props.graph.data}
              options={props.graph.options}
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
