import React, { useEffect } from "react";
import { getRecipes } from "../../store/recipe/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectRecipes } from "../../store/recipe/selectors";

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
      {Recipes.length ? (
        Recipes.map((Recipe) => {
          return (
            <div key={Recipe.id}>
              <img src={`${Recipe.imageUrl}`} />
              <h3> {Recipe.name}</h3>
              <a href={`/Recipes/${Recipe.id}`}>See more details</a>
            </div>
          );
        })
      ) : (
        <p> Loading</p>
      )}
    </div>
  );
}
