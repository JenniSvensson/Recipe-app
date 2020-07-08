import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRecipes,
  selectfilteredRecipes,
  selectfilteredIngredients,
} from "../../store/recipe/selectors";
import { selectIngredients } from "../../store/ingredients/selector";
import { getRecipes, getDietRecipes } from "../../store/recipe/actions";
import { getIngredients } from "../../store/ingredients/actions";

export default function RecipeFinder() {
  const [recipes, setRecipes] = useState();
  const [input, setInput] = useState({
    ingredient: "",
    flavourProfile: "",
    dishType: "",
    diet: "all",
  });

  const Recipes = useSelector(selectRecipes);
  console.log(Recipes);
  const Ingredients = useSelector(selectfilteredIngredients);
  const filteredRecipes = useSelector(selectfilteredRecipes);
  const dispatch = useDispatch();

  function filterRecipe() {
    let validRecipes = filteredRecipes;

    if (input.ingredient) {
      validRecipes = filteredRecipes.filter((recipie) => {
        const validingredients = recipie.ingredients.some(
          (ing) => ing.name === input.ingredient
        );
        return validingredients;
      });
    }

    validRecipes = validRecipes.filter((recipe) => {
      const flavourProfileFilledIn = Boolean(input.flavourProfile);
      const dishTypeFilledIn = Boolean(input.dishType);
      switch (true) {
        case flavourProfileFilledIn && !dishTypeFilledIn:
          return recipe.flavourProfile === input.flavourProfile;

        case !flavourProfileFilledIn && dishTypeFilledIn:
          return recipe.dishType === input.dishType;

        case flavourProfileFilledIn && dishTypeFilledIn:
          return (
            recipe.flavourProfile === input.flavourProfile &&
            recipe.dishType === input.dishType
          );

        default:
          //if there is none don't filter
          return true;
      }
    });

    setRecipes(validRecipes);
  }

  function handleClick(e) {
    console.log("what is this", input);
    filterRecipe();
    console.log(recipes);
  }

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  console.log(Ingredients);

  useEffect(() => {
    //checks if there is no recipes or ingredients if so it will go and fetch them
    if (Recipes) {
      dispatch(getIngredients);
      dispatch(getDietRecipes(input.diet));
    }
  }, [input.diet]);
  console.log(input);
  return (
    <div>
      <h2>Please answer these questions to find something nice to cook.</h2>

      {
        <form>
          <select onChange={handleChange} name="diet">
            <option value="">All</option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="glutenFree">Gluten-free</option>
          </select>
          {Ingredients.length ? (
            <div>
              <select name="ingredient" type="text" onChange={handleChange}>
                {Ingredients.map((ingredient) => {
                  return (
                    <option key={ingredient.id} value={ingredient.name}>
                      {ingredient.name}
                    </option>
                  );
                })}
              </select>

              <input
                name="flavourProfile"
                type="text"
                list="flavourProfile"
                onChange={handleChange}
              />
              <datalist id="flavourProfile">
                {Recipes.map((recipe) => {
                  return (
                    <option key={recipe.id} value={recipe.flavourProfile} />
                  );
                })}
              </datalist>
              <input
                name="dishType"
                type="text"
                list="dishType"
                onChange={handleChange}
              />
              <datalist id="dishType">
                {Recipes.map((recipe) => {
                  return <option key={recipe.id} value={recipe.dishType} />;
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
              <a href={`/Recipes/${recipe.id}`}>See more details</a>
            </div>
          );
        })
      ) : (
        <p></p>
      )}
    </div>
  );
}
