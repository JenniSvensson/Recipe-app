import { apiUrl } from "../../config/constants";
import axios from "axios";

export async function getRecipes(dispatch, getState) {
  try {
    const response = await axios.get(`${apiUrl}/recipe`);

    console.log("got the data", response.data);
  } catch (error) {
    console.log("error", error);
  }
}
