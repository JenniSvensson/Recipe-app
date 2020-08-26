import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipes } from "../../store/recipe/actions";
import { selectRecipes, selectRecipeById } from "../../store/recipe/selectors";
import { Spinner, Container, Image, Row, Col } from "react-bootstrap";
export default function RecipeDetails() {
  const params = useParams();
  const RecipeId = parseInt(params.id);
  const dispatch = useDispatch();
  const Recipes = useSelector(selectRecipes);
  const thisRecipe = useSelector(selectRecipeById(RecipeId));

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
          <h2>{thisRecipe.name}</h2>

          <Image rounded fluid src={`${thisRecipe.imageUrl}`} />
          <Row>
            <p>{thisRecipe.preperationTime} min</p>{" "}
          </Row>
          <Row>
            <Col md={4}>
              {" "}
              <h3>Ingredients</h3>
              {thisRecipe.ingredients.map((ingredient) => {
                return (
                  <li key={ingredient.id}>
                    {ingredient.recipeIngredients.amount} {ingredient.name}
                  </li>
                );
              })}{" "}
            </Col>

            <Col md={{ span: 4 }}>
              {" "}
              <h3>Instructions</h3>
              {thisRecipe.instructions}
            </Col>
          </Row>
        </Container>
      ) : (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </div>
  );
}
