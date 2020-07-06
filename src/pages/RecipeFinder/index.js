import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRecipes } from "../../store/recipe/selectors";
import { selectIngredients } from "../../store/ingredients/selector";
import { getRecipes, getDietRecipes } from "../../store/recipe/actions";
import { getIngredients } from "../../store/ingredients/actions";

export default function RecipeFinder() {
  const [recipes, setRecipes] = useState();
  const [input, setInput] = useState({
    ingredient: "",
    flavourProfile: "",
    dishType: "",
    diet: "",
  });

  const Recipes = useSelector(selectRecipes);
  console.log(Recipes);
  const Ingredients = useSelector(selectIngredients);
  const dispatch = useDispatch();

  function filterRecipe() {
    // if (Ingredients.length) {
    //   const findByIngredient = Ingredients.find((Ingredient) => {
    //     return Ingredient.name === input.ingredient;
    //   });
    //   if (
    //     input.flavourProfile === "sweet" ||
    //     input.flavourProfile === "salty" ||
    //     input.flavourProfile === "savoury" ||
    //     "spicy"
    //   ) {
    //     const filteredByFlavour = findByIngredient.recipes.filter((item) => {
    //       return item.flavourProfile === input.flavourProfile;
    //     });
    //     setRecipes(filteredByFlavour);
    //   } else {
    //     return setRecipes(findByIngredient.recipes);
    //   }
    // }
  }

  function handleClick(e) {
    console.log("what is this", input);
    dispatch(getDietRecipes(input.diet));
    filterRecipe();
  }

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    //checks if there is no recipes or ingredients if so it will go and fetch them
    if (Recipes) {
      dispatch(getRecipes);
      dispatch(getIngredients);
    }
  }, []);
  console.log(input);
  return (
    <div>
      <h2>Please answer these questions!</h2>

      {
        <form>
          <select onChange={handleChange} name="diet">
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="glutenFree">Gluten-free</option>
          </select>
          {Ingredients.length ? (
            <div>
              <input
                name="ingredient"
                type="text"
                list="ingredient"
                onChange={handleChange}
              />
              <datalist id="ingredient">
                {Ingredients.map((ingredient) => {
                  return <option key={ingredient.id} value={ingredient.name} />;
                })}
              </datalist>

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
