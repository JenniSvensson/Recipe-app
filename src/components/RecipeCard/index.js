import React from "react";
import { Card, Col, CardDeck } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function RecipeCard(props) {
  return (
    <Col className="col-md-4 mt-4">
      <Card className="h-100 shadow-sm bg-white rounded">
        <Card.Img variant="top" src={`${props.imageUrl}`} />
        <Card.Body>
          <div>
            <Card.Title className="mb-0 font-weight-bold">
              {props.name}
            </Card.Title>
          </div>
          <Card.Text>
            Cooking time: {props.preperationTime} min <br></br>
            Flavourprofile: {props.flavourProfile}
            <br></br>
            Dish type: {props.dishType}
          </Card.Text>
          <Link to={`/Recipes/${props.id}`}>Go to the instructions</Link>
          <br></br>
          <br></br>
        </Card.Body>
      </Card>
    </Col>
  );
}
