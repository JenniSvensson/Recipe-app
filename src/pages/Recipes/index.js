import React, { useEffect } from "react";
import { getRecipes } from "../../store/recipe/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectRecipes } from "../../store/recipe/selectors";
import {
  Form,
  Button,
  Spinner,
  Container,
  Image,
  Row,
  Card,
  Badge,
  Col,
} from "react-bootstrap";
export default function Recipes() {
  const dispatch = useDispatch();

  const Recipes = useSelector(selectRecipes);
  console.log("these are the recipes", Recipes);
  console.log("this is the", Recipes.length);

  useEffect(() => {
    dispatch(getRecipes);
  }, [dispatch]);
  return (
    <div>
      <h2>Discover</h2>

      <Container>
        <Row>
          {Recipes.length ? (
            Recipes.map((recipe) => {
              return (
                <Col xs={3} className="mb-5 " key={recipe.id}>
                  <Card className="h-100 shadow-sm bg-white rounded">
                    <Card.Img variant="top" src={`${recipe.imageUrl}`} />
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex mb-2 justify-content-between ">
                        <Card.Title className="mb-0 font-weight-bold">
                          {recipe.name}
                        </Card.Title>
                      </div>

                      <Card.Text>
                        Cooking time: {recipe.preperationTime} min <br></br>
                        Flavourprofile: {recipe.flavourProfile}
                        <br></br>
                        Dish type: {recipe.dishType}
                      </Card.Text>
                      <Card.Link>
                        <a href={`/Recipes/${recipe.id}`}>
                          Go to the instructions
                        </a>
                      </Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <p> Loading</p>
          )}
        </Row>
      </Container>
    </div>
  );
}
