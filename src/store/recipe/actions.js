import { apiUrl } from "../../config/constants";
import axios from "axios";

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
    };
  } catch (error) {
    console.log(error);
  }
}
