import React, { useEffect } from "react";
import { getRecipes } from "../../store/recipe/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectRecipes } from "../../store/recipe/selectors";
import { Spinner, Container, CardDeck } from "react-bootstrap";
import RecipeCard from "../../components/RecipeCard";
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
          {Recipes ? (
            Recipes.map((recipe) => {
              return (
                <RecipeCard
                  id={recipe.id}
                  imageUrl={recipe.imageUrl}
                  name={recipe.name}
                  preperationTime={recipe.preperationTime}
                  flavourProfile={recipe.flavourProfile}
                  dishType={recipe.dishType}
                  key={recipe.id + 1}
                />
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
