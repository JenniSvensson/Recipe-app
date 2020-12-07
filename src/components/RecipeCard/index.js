import React from "react";
import { Card, Col, CardDeck } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./RecipeCard.scss";

export default function RecipeCard(props) {
  return (
    <Col xl={4}>
      <CardDeck className="mt-5">
        <Card className="h-100 shadow-sm bg-white rounded recipe-card">
          <Card.Img variant="top" src={`${props.imageUrl}`} />
          <div className="recipe-body">
            Cooking time: {props.preperationTime} min <br></br>
            Flavour profile: {props.flavourProfile} <br></br>
            Dish type: {props.dishType}
            <br></br>
            <Link to={`/Recipes/${props.id}`}>Go to the instructions</Link>
          </div>
          <div className="recipe-title">
            <p>{props.name}</p>
          </div>
        </Card>
      </CardDeck>
    </Col>
  );
}
