import React, { useEffect } from "react";
import { getRecipes } from "../../store/recipe/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectRecipes } from "../../store/recipe/selectors";
import { Link } from "react-router-dom";
import { Spinner, Container, Row, Card, Col } from "react-bootstrap";
export default function Recipes() {
  const dispatch = useDispatch();

  const Recipes = useSelector(selectRecipes);

  useEffect(() => {
    dispatch(getRecipes);
  }, [dispatch]);
  return (
    <div>
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
                      <Link to={`/Recipes/${recipe.id}`}>
                        Go to the instructions
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
        </Row>
      </Container>
    </div>
  );
}
