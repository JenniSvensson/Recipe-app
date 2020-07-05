import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { selectToken, selectUser } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

export default function RecipeShare() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [time, setTime] = useState("");
  const [flavourProfile, setflavourProfile] = useState("salty");
  const [dishType, setDishType] = useState("dinner");
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const history = useHistory();

  function handleForm(e) {
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
            type="number"
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
            type="text"
            placeholder="Enter cookingtime"
            required
          />
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
