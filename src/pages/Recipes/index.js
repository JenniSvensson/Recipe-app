import React, { useEffect } from "react";
import { getRecipes } from "../../store/recipe/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Recipes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes);
  }, [dispatch]);
  return (
    <div>
      <h2>Discover</h2>
    </div>
  );
}
