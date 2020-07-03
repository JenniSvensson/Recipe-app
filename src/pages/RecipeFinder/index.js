import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRecipes } from "../../store/recipe/selectors";
import { selectIngredients } from "../../store/ingredients/selector";
import { getRecipes } from "../../store/recipe/actions";
import { getIngredients } from "../../store/ingredients/actions";

export default function RecipeFinder() {
  const [recipes, setRecipes] = useState();
  const [ingredient, setIngredient] = useState();

  const Recipes = useSelector(selectRecipes);
  console.log(Recipes);

  const Ingredients = useSelector(selectIngredients);

  const dispatch = useDispatch();

  function handleClick(e) {
    const result = Ingredients.find((Ingredient) => {
      return Ingredient.name === ingredient;
    });

    setRecipes(result.recipes);
  }

  function handleChange(e) {
    setIngredient(e.target.value);
  }

  useEffect(() => {
    //checks if there is no recipes or ingredients if so it will go and fetch them
    if (Recipes) {
      dispatch(getRecipes);
      dispatch(getIngredients);
    }
  }, []);

  return (
    <div>
      <h2>Please answer these questions!</h2>

      {
        <form>
          {/* <select name="filterDiets">
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="glutenFree">Gluten-free</option>
          </select> */}
          {Ingredients.length ? (
            <div>
              <input type="text" list="data" onChange={handleChange} />
              <datalist id="data">
                {Ingredients.map((ingredient) => {
                  return <option key={ingredient.id} value={ingredient.name} />;
                })}
              </datalist>
              <input type="button" value="Search" onClick={handleClick} />
            </div>
          ) : (
            <p>Loading</p>
          )}
        </form>
      }

      {recipes ? (
        recipes.map((recipe) => {
          return (
            <div key={recipe.id}>
              <img src={`${recipe.imageUrl}`} />
              <h3> {recipe.name}</h3>
            </div>
          );
        })
      ) : (
        <p></p>
      )}
    </div>
  );
}
