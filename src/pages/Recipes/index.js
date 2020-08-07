import React, { useEffect } from "react";
import { getRecipes } from "../../store/recipe/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectRecipes } from "../../store/recipe/selectors";
import { Link } from "react-router-dom";
import { Spinner, Container, Row, Card, Col, CardDeck } from "react-bootstrap";
export default function Recipes() {
  const dispatch = useDispatch();

  const Recipes = useSelector(selectRecipes);

  useEffect(() => {
    dispatch(getRecipes);
  }, [dispatch]);
  return (
    <div>
      <Container className="mt-5">
        <CardDeck>
          {Recipes.length ? (
            Recipes.map((recipe) => {
              return (
                <Col className="col-md-4 mt-4">
                  <Card className="h-100 shadow-sm bg-white rounded">
                    <Card.Img variant="top" src={`${recipe.imageUrl}`} />
                    <Card.Body>
                      <div>
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
                      <Link to={`/Recipes/${recipe.id}`}>
                        Go to the instructions
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <Container className="spinner">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Container>
          )}
        </CardDeck>
      </Container>
    </div>
  );
}
