import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredRecipes,
  selectFilteredIngredients,
} from "../../store/recipe/selectors";
import { getDietRecipes } from "../../store/recipe/actions";
import { getIngredients } from "../../store/ingredients/actions";
import { Form, Spinner, Container, Image, Row } from "react-bootstrap";
import "./recipeFinder.scss";
import food from "./images/Choice-pana.png";
import RecipeCard from "../../components/RecipeCard";

export default function RecipeFinder() {
  const [input, setInput] = useState({
    ingredient: "",
    flavourProfile: "",
    dishType: "",
    diet: "",
  });

  const Ingredients = useSelector(selectFilteredIngredients);
  const filteredRecipes = useSelector(selectFilteredRecipes);
  const inputFromLocalStorage = localStorage.getItem("inputUser");

  const dispatch = useDispatch();
  let validRecipes = filteredRecipes;

  if (input.ingredient && validRecipes) {
    validRecipes = filteredRecipes.filter((recipie) => {
      const validingredients = recipie.ingredients.some(
        (ing) => ing.name === input.ingredient
      );
      return validingredients;
    });
  }

  if (validRecipes) {
    validRecipes = validRecipes.filter((recipe) => {
      const flavourProfileFilledIn = Boolean(input.flavourProfile);
      const dishTypeFilledIn = Boolean(input.dishType);
      switch (true) {
        case flavourProfileFilledIn && !dishTypeFilledIn:
          return recipe.flavourProfile === input.flavourProfile;

        case !flavourProfileFilledIn && dishTypeFilledIn:
          return recipe.dishType === input.dishType;

        case flavourProfileFilledIn && dishTypeFilledIn:
          return (
            recipe.flavourProfile === input.flavourProfile &&
            recipe.dishType === input.dishType
          );

        default:
          //if there is none don't filter
          return true;
      }
    });
  }

  function handleChange(e) {
    const userInput = { ...input, [e.target.name]: e.target.value };
    setInput(userInput);
    localStorage.setItem("inputUser", JSON.stringify(userInput));
  }

  useEffect(() => {
    //checks if there is no recipes or ingredients if so it will go and fetch them
    dispatch(getIngredients);
    dispatch(getDietRecipes(input.diet));
    if (inputFromLocalStorage) {
      setInput(JSON.parse(inputFromLocalStorage));
    }
  }, [
    dispatch,
    inputFromLocalStorage,
    input.diet,
    input.flavourProfile,
    input.dishType,
  ]);

  return (
    <div>
      {Ingredients.length ? (
        <div>
          <Container>
            <div className="header-row">
              <div className="header-column">
                <h1>Find the perfect recipe</h1>
                <p>
                  Having trouble deciding what to eat? no worries just fill in
                  these questions and we will find you the perfect match.
                </p>
              </div>
              <div className="header-column">
                <Image src={food} className="w-30 h-30" fluid alt="food" />
              </div>
            </div>
          </Container>

          <Container className=" mt-5">
            <h3>
              Let's start! Please answer these questions to find something nice
              to cook.
            </h3>
            <Form>
              <Form.Group>
                <p>I am going to eat </p>

                <Form.Group>
                  <Form.Control
                    onChange={handleChange}
                    name="dishType"
                    as="select"
                    className="selectInput"
                    value={`${input.dishType}`}
                  >
                    <option value=""></option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="dessert">Dessert</option>
                  </Form.Control>
                </Form.Group>
              </Form.Group>

              <p>I want it to be </p>
              <Form.Group>
                <Form.Control
                  onChange={handleChange}
                  className="selectInput"
                  name="diet"
                  as="select"
                  value={`${input.diet}`}
                >
                  <option value=""></option>
                  <option value="">All</option>
                  <option value="vegan">Vegan</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="glutenFree">Gluten-free</option>
                </Form.Control>
              </Form.Group>

              <p>I feel like something</p>
              <Form.Group>
                <Form.Control
                  onChange={handleChange}
                  name="flavourProfile"
                  as="select"
                  className="selectInput"
                  value={`${input.flavourProfile}`}
                >
                  <option value=""></option>
                  <option value="sweet">Sweet</option>
                  <option value="salty">Salty</option>
                  <option value="savoury">Savoury</option>
                  <option value="spicy">Spicy</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <p>It has to contain</p>

                <input
                  className="selectInput"
                  name="ingredient"
                  type="text"
                  list="ingredients"
                  value={`${input.ingredient}`}
                  onChange={handleChange}
                />
                <datalist id="ingredients">
                  {Ingredients.map((ing) => {
                    return <option key={ing.id} value={ing.name} />;
                  })}
                </datalist>
              </Form.Group>
            </Form>
          </Container>
        </div>
      ) : (
        <Container className=" mt-5 spinner">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Container>
      )}

      {(input.diet && validRecipes) ||
      (input.dishType && validRecipes) ||
      (input.flavourProfile && validRecipes) ||
      (input.ingredient && validRecipes) ? (
        <Container className="recipe-box">
          <br></br>
          <h2>
            Found {validRecipes.length} recipes that matches your conditions
          </h2>
          <Row>
            {validRecipes ? (
              validRecipes.map((recipe) => {
                return (
                  <RecipeCard
                    id={recipe.id}
                    imageUrl={recipe.imageUrl}
                    name={recipe.name}
                    preperationTime={recipe.preperationTime}
                    flavourProfile={recipe.flavourProfile}
                    dishType={recipe.dishType}
                    key={recipe.id + 1}
                    recipes={validRecipes}
                  />
                );
              })
            ) : (
              <p>loading</p>
            )}
          </Row>
          <br></br>
        </Container>
      ) : (
        <p></p>
      )}

      <div className="footer"></div>
    </div>
  );
}
