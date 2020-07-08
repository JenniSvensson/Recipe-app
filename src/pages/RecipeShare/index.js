import React, { useState, useEffect } from "react";
import { selectToken, selectUser } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addRecipe } from "../../store/recipe/actions";
export default function RecipeShare() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [time, setTime] = useState("");
  const [flavourProfile, setflavourProfile] = useState("sweet");
  const [dishType, setDishType] = useState("breakfast");
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const history = useHistory();
  const [inputIngredients, setInputIngredients] = useState([
    { amount: "", ingredient: "" },
  ]);

  function handleForm(e) {
    dispatch(
      addRecipe(
        name,
        instructions,
        imageUrl,
        time,
        flavourProfile,
        dishType,
        inputIngredients,
        user
      )
    );
    e.preventDefault();
  }

  const handleRemoveClick = (index) => {
    const list = [...inputIngredients];
    list.splice(index, 1);
    setInputIngredients(list);
  };

  const handleAddClick = () => {
    setInputIngredients([...inputIngredients, { amount: "", ingredient: "" }]);
    console.log(inputIngredients);
  };

  function handleInputChange(e, index) {
    const { name, value } = e.target;
    const ingredientsList = [...inputIngredients];
    ingredientsList[index][name] = value;
    setInputIngredients(ingredientsList);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name </label>
        <input
          onChange={(event) => setName(event.target.value)}
          type="text"
          name="name"
        />
        <br></br>
        <label htmlFor="instructions">Instructions</label>
        <input
          type="text"
          name="Instructions"
          onChange={(event) => setInstructions(event.target.value)}
        />
        <br></br>
        {inputIngredients.map((inputIngredient, index) => {
          return (
            <div key={index}>
              <input
                name="amount"
                type="text"
                placeholder="Enter amount"
                value={inputIngredient.amount}
                onChange={(e) => handleInputChange(e, index)}
              />
              <input
                name="ingredient"
                placeholder="Enter ingredient"
                value={inputIngredient.ingredient}
                onChange={(e) => handleInputChange(e, index)}
              />

              <div>
                {inputIngredients.length !== 1 && (
                  <button onClick={() => handleRemoveClick(index)}>
                    Remove
                  </button>
                )}
                {inputIngredients.length - 1 === index && (
                  <button onClick={handleAddClick}>Add</button>
                )}
              </div>
            </div>
          );
        })}

        <br></br>
        <label htmlFor="imageUrl">Image Url </label>
        <input
          type="text"
          name="imageUrl"
          onChange={(event) => setImageUrl(event.target.value)}
        />
        <br></br>
        <label htmlFor="time">Time</label>
        <input
          type="number"
          name="time"
          onChange={(event) => setTime(event.target.value)}
        />
        <br></br>
        <label htmlFor="flavourProfile">Flavour profile</label>
        <select
          name="flavourProfile"
          onChange={(event) => setflavourProfile(event.target.value)}
        >
          <option>sweet</option>
          <option>salty</option>
          <option>spicy</option>
          <option>savory</option>
        </select>
        <br></br>
        <label htmlFor="dishType">Dish type </label>

        <select
          type="text"
          name="dishType"
          onChange={(event) => setDishType(event.target.value)}
        >
          <option>breakfast</option>
          <option>lunch</option>
          <option>dinner</option>
          <option>dessert</option>
        </select>

        <br></br>
        <input type="submit" value="Submit" onClick={handleForm} />
      </form>
    </div>
  );
}
