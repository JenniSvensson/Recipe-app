import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipes } from "../../store/recipe/actions";
import { selectRecipes } from "../../store/recipe/selectors";
export default function RecipeDetails() {
  const params = useParams();
  const RecipeId = parseInt(params.id);
  const dispatch = useDispatch();
  const Recipes = useSelector(selectRecipes);

  useEffect(() => {
    //checks if there is no recipes or ingredients if so it will go and fetch them
    if (Recipes) {
      dispatch(getRecipes);
    }
  }, []);

  return <div></div>;
}
