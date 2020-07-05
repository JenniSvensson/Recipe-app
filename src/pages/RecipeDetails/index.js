import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipes } from "../../store/recipe/actions";
import { selectRecipes, selectRecipeById } from "../../store/recipe/selectors";
export default function RecipeDetails() {
  const params = useParams();
  const RecipeId = parseInt(params.id);
  const dispatch = useDispatch();
  const Recipes = useSelector(selectRecipes);
  const thisRecipe = useSelector(selectRecipeById(RecipeId));
  console.log(thisRecipe);

  useEffect(() => {
    //checks if there is no recipes if so it will go and fetch them
    if (Recipes) {
      dispatch(getRecipes);
    }
  }, []);

  return (
    <div>
      {thisRecipe ? (
        <div>
          <h2>{thisRecipe.name}</h2>
          <img src={`${thisRecipe.imageUrl}`} />
          <p>{thisRecipe.preperationTime} min</p>
          <h4>Ingredients</h4>
          {thisRecipe.ingredients.map((ingredient) => {
            return (
              <li key={ingredient.id}>
                {ingredient.recipeIngredients.amount} {ingredient.name}
              </li>
            );
          })}
          <h4>Instructions</h4>
          {thisRecipe.instructions}
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
