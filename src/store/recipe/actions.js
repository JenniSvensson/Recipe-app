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

export function addRecipe(
  name,
  instructions,
  imageUrl,
  time,
  flavourProfile,
  dishType,
  user
) {
  try {
    const id = parseInt(user.id);
    return async function thunk(dispatch, getState) {
      const response = await axios.post(
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
          userId: id,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
    };
  } catch (error) {
    console.log(error);
  }
}
