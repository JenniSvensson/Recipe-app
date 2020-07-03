import { apiUrl } from "../../config/constants";
import axios from "axios";

export function fetchedIngredients(data) {
  return {
    type: "FETCH_INGREDIENTS",
    payload: data,
  };
}

export async function getIngredients(dispatch, getState) {
  try {
    const response = await axios.get(`${apiUrl}/ingredients`);
    console.log("got the data", response.data);
    dispatch(fetchedIngredients(response.data));
  } catch (error) {
    console.log("error", error);
  }
}
