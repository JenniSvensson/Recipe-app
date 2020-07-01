import { apiUrl } from "../../config/constants";
import axios from "axios";

export function fetchedRecipes(data) {
  return {
    type: "FETCH_RECIPES",
    payload: data,
  };
}

export async function getRecipes(dispatch, getState) {
  try {
    const response = await axios.get(`${apiUrl}/recipe`);

    console.log("got the data", response.data);
    dispatch(fetchedRecipes(response.data));
  } catch (error) {
    console.log("error", error);
  }
}
