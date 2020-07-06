import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
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

  function handleForm(e) {
    dispatch(
      addRecipe(
        name,
        instructions,
        imageUrl,
        time,
        flavourProfile,
        dishType,
        user
      )
    );
    e.preventDefault();
  }

  return (
    <div>
      <Container>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Enter name"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Instructions</Form.Label>
          <Form.Control
            value={instructions}
            onChange={(event) => setInstructions(event.target.value)}
            type="text"
            placeholder="Enter instructions"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image url</Form.Label>
          <Form.Control
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            type="text"
            placeholder="Enter image url"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Time</Form.Label>
          <Form.Control
            value={time}
            onChange={(event) => setTime(event.target.value)}
            type="number"
            placeholder="Enter cookingtime"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Flavour profile </Form.Label>
          <Form.Control
            value={flavourProfile}
            onChange={(event) => setflavourProfile(event.target.value)}
            as="select"
          >
            <option>sweet</option>
            <option>salty</option>
            <option>spicy</option>
            <option>savory</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Dish type </Form.Label>
          <Form.Control
            value={dishType}
            onChange={(event) => setDishType(event.target.value)}
            as="select"
          >
            <option>breakfast</option>
            <option>lunch</option>
            <option>dinner</option>
            <option>dessert</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={handleForm}>
            Share Recipe
          </Button>
        </Form.Group>
      </Container>
    </div>
  );
}
