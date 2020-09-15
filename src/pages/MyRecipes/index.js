import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectToken, selectUser } from "../../store/user/selectors";
import { selectRecipeByUserId } from "../../store/recipe/selectors";
import { getRecipes } from "../../store/recipe/actions";
import RecipeCard from "../../components/RecipeCard";
import { Spinner, CardDeck, Container } from "react-bootstrap";

export default function MyRecipes() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const userRecipes = useSelector(selectRecipeByUserId(user.id));

  useEffect(() => {
    dispatch(getRecipes);
    //Checks if a user is logged in if not it will push user to front page
    if (token === null) {
      history.push("/");
    }
  }, [dispatch, token, history]);
  return (
    <div>
      <Container className="mt-5">
        <h1>Hello, {`${user.name}`}!</h1>
        <p>Here are the recipes you have created so far:</p>
        <CardDeck>
          {userRecipes ? (
            userRecipes.map((recipe) => {
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
