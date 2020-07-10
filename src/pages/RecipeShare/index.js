import React, { useState, useEffect } from "react";
import { selectToken, selectUser } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addRecipe } from "../../store/recipe/actions";
import { Form, Button, Container } from "react-bootstrap";
export default function RecipeShare() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [time, setTime] = useState("");
  const [flavourProfile, setflavourProfile] = useState("sweet");
  const [dishType, setDishType] = useState("breakfast");
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const history = useHistory();
  const [inputIngredients, setInputIngredients] = useState([
    { amount: "", ingredient: "" },
  ]);

  function handleForm(e) {
    e.preventDefault();

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
    //reset form
    setName("");
    setInstructions("");
    setImageUrl("");
    setTime("");
    setflavourProfile("");
    setDishType("");
    setInputIngredients([{ amount: "", ingredient: "" }]);
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

  useEffect(() => {
    if (token === null) {
      history.push("/");
    }
  }, [token, history]);

  return (
    <Form>
      <Container>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Enter Name"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Instructions</Form.Label>
          <Form.Control
            value={instructions}
            onChange={(event) => setInstructions(event.target.value)}
            as="textarea"
            rows="5"
            placeholder="Enter Instructions"
            required
          />
        </Form.Group>

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

        <Form.Group>
          <Form.Label>Image Url</Form.Label>
          <Form.Control
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            type="text"
            placeholder="Enter Instructions"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Time</Form.Label>
          <Form.Control
            value={time}
            onChange={(event) => setTime(event.target.value)}
            type="text"
            placeholder="Enter Time"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Flavour profile</Form.Label>
          <Form.Control
            onChange={(event) => setflavourProfile(event.target.value)}
            name="flavourProfile"
            as="select"
          >
            <option value="sweet">Sweet</option>
            <option value="salty">Salty</option>
            <option value="savoury">Savoury</option>
            <option value="spicy">Spicy</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Dish type</Form.Label>
          <Form.Control
            onChange={(event) => setDishType(event.target.value)}
            name="dishType"
            as="select"
          >
            <option>breakfast</option>
            <option>lunch</option>
            <option>dinner</option>
            <option>dessert</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" value="Submit" onClick={handleForm}>
          Create recipe
        </Button>
      </Container>
    </Form>
  );
}
