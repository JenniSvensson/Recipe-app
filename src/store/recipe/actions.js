import { apiUrl } from "../../config/constants";
import axios from "axios";
import { showMessageWithTimeout } from "../appState/actions";

export function fetchedRecipes(data) {
  return {
    type: "FETCH_RECIPES",
    payload: data,
  };
}

export function fetchedDietRecipes(data) {
  return {
    type: "FETCH_DIETRECIPES",
    payload: data,
  };
}

export function updateRecipesStore(data) {
  return {
    type: "DELETE_RECIPE",
    payload: data,
  };
}

export function getSearchedRecipe(data) {
  return {
    type: "FETCH_SEARCHRECIPES",
    payload: data,
  };
}

export async function getRecipes(dispatch, getState) {
  try {
    const response = await axios.get(`${apiUrl}/recipe`);

    dispatch(fetchedRecipes(response.data));
  } catch (error) {
    console.log("error", error);
  }
}

export function getDietRecipes(diet) {
  return async function thunk(dispatch, getState) {
    try {
      const response = await axios.get(`${apiUrl}/recipe/diet?diet=${diet}`);

      dispatch(fetchedDietRecipes(response.data));
    } catch (error) {
      console.log("error", error);
    }
  };
}

export function addRecipe(
  name,
  instructions,
  imageUrl,
  time,
  flavourProfile,
  dishType,
  inputIngredients,
  user
) {
  try {
    const id = parseInt(user.id);
    return async function thunk(dispatch, getState) {
      await axios.post(
        // API endpoint:
        `${apiUrl}/recipe`,
        // Data to be sent along:
        {
          name: name,
          instructions: instructions,
          imageUrl: imageUrl,
          preperationTime: time,
          flavourProfile: flavourProfile,
          dishType: dishType,
          ingredients: inputIngredients,
          userId: id,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      dispatch(
        showMessageWithTimeout("success", true, "Recipe have been created")
      );
    };
  } catch (error) {
    console.log(error);
  }
}

export function deleteRecipe(user, recipeId) {
  try {
    return async function thunk(dispatch, getState) {
      const id = parseInt(user.id);
      await axios.delete(
        // API endpoint:
        `${apiUrl}/recipe/${id}/recipes/${recipeId}`,
        // Data to be sent along:
        {
          headers: { Authorization: `Bearer ${user.token}` },
          data: { userId: id, recipeId: recipeId },
        }
      );
      dispatch(updateRecipesStore());

      console.log(user.id, recipeId);
    };
  } catch (error) {
    console.log(error);
  }
}
