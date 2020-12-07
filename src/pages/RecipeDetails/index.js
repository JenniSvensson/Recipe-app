import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getRecipes } from "../../store/recipe/actions";
import { selectRecipes, selectRecipeById } from "../../store/recipe/selectors";
import { selectUser } from "../../store/user/selectors";
import { Spinner, Button, Container, Image, Row, Col } from "react-bootstrap";
export default function RecipeDetails() {
  const params = useParams();
  const RecipeId = parseInt(params.id);
  const dispatch = useDispatch();
  const Recipes = useSelector(selectRecipes);
  const thisRecipe = useSelector(selectRecipeById(RecipeId));
  const loggedInUser = useSelector(selectUser);
  const history = useHistory();
  function handleClick() {
    // dispatch(deleteRecipe(loggedInUser, thisRecipe.id));
  }

  useEffect(() => {
    //checks if there is no recipes if so it will go and fetch them
    if (Recipes) {
      dispatch(getRecipes);
    }
  });

  return (
    <div>
      {thisRecipe ? (
        <Container>
          <div>
            {/* If the loggedin user is the same as user id on recipe, give the */}
            {/* option to delete or edit recipe */}
            {thisRecipe.userId === loggedInUser.id ? (
              <div>
                {/* <Button className="mr-2">Edit</Button> */}
                <Button onClick={handleClick}>Delete</Button>
              </div>
            ) : (
              <p></p>
            )}
          </div>
          <Button variant="secondary" onClick={() => history.goBack()}>
            Go back
          </Button>
          <h2>{thisRecipe.name}</h2>
          <Image rounded fluid src={`${thisRecipe.imageUrl}`} />
          <Row>
            <p>
              <span role="img" aria-labelledby="timer">
                ⏲️
              </span>
              {thisRecipe.preperationTime}min
            </p>
            <p>
              <span role="img" aria-labelledby="fork and knife">
                🍴
              </span>
              {thisRecipe.dishType}
            </p>
            <p>
              <span role="img" aria-labelledby="tongue">
                👅
              </span>
              {thisRecipe.flavourProfile}
            </p>
          </Row>
          <Row>
            <Col md={4}>
              <h3>Ingredients</h3>
              {thisRecipe.ingredients.map((ingredient) => {
                return (
                  <li key={ingredient.id}>
                    {ingredient.recipeIngredients.amount} {ingredient.name}
                  </li>
                );
              })}
            </Col>

            <Col md={{ span: 4 }}>
              <h3>Instructions</h3>
              {thisRecipe.instructions}
            </Col>
          </Row>
        </Container>
      ) : (
        <Container className="spinner">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Container>
      )}
    </div>
  );
}
