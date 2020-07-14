import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectfilteredRecipes,
  selectfilteredIngredients,
  selectSearchedRecipes,
} from "../../store/recipe/selectors";
// import { selectIngredients } from "../../store/ingredients/selector";
import { getDietRecipes, getSearchedRecipe } from "../../store/recipe/actions";
import { getIngredients } from "../../store/ingredients/actions";
import {
  Form,
  Button,
  Spinner,
  Container,
  Row,
  Card,
  Col,
} from "react-bootstrap";
import "./recipeFinder.css";
import { Link } from "react-router-dom";
export default function RecipeFinder() {
  const [input, setInput] = useState({
    ingredient: "",
    flavourProfile: "sweet",
    dishType: "breakfast",
    diet: "all",
  });

  // const Recipes = useSelector(selectRecipes);
  const Ingredients = useSelector(selectfilteredIngredients);
  const filteredRecipes = useSelector(selectfilteredRecipes);
  const searchedRecipes = useSelector(selectSearchedRecipes);
  const dispatch = useDispatch();

  function filterRecipe() {
    let validRecipes = filteredRecipes;
    if (input.ingredient) {
      validRecipes = filteredRecipes.filter((recipie) => {
        const validingredients = recipie.ingredients.some(
          (ing) => ing.name === input.ingredient
        );
        return validingredients;
      });
    }

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

    dispatch(getSearchedRecipe(validRecipes));
  }

  function handleClick(e) {
    filterRecipe();
  }

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    //checks if there is no recipes or ingredients if so it will go and fetch them

    dispatch(getIngredients);
    dispatch(getDietRecipes(input.diet));
  }, [dispatch, input.diet]);

  return (
    <div>
      {Ingredients.length ? (
        <div>
          <Container>
            <h3>
              Please answer these questions to find something nice to cook.
            </h3>

            <Form>
              <Form.Group>
                <p>I am going to eat </p>

                <Form.Group>
                  <Form.Control
                    onChange={handleChange}
                    name="dishType"
                    as="select"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="dessert">Dessert</option>
                  </Form.Control>
                </Form.Group>
              </Form.Group>

              <p>I want it to be </p>
              <Form.Group>
                <Form.Control onChange={handleChange} name="diet" as="select">
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
                >
                  <option value="sweet">Sweet</option>
                  <option value="salty">Salty</option>
                  <option value="savoury">Savoury</option>
                  <option value="spicy">Spicy</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <p>It has to contain</p>

                <input
                  className="inputForm"
                  name="ingredient"
                  type="text"
                  list="ingredients"
                  onChange={handleChange}
                />
                <datalist id="ingredients">
                  {Ingredients.map((ing) => {
                    return <option key={ing.id} value={ing.name} />;
                  })}
                </datalist>
              </Form.Group>
            </Form>

            <br></br>

            <Button variant="primary" onClick={handleClick}>
              Search
            </Button>
          </Container>
        </div>
      ) : (
        <Container>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Container>
      )}
      <br></br>
      <Container>
        <Row>
          {searchedRecipes ? (
            searchedRecipes.map((recipe) => {
              return (
                <Col xs={3} className="mb-5 " key={recipe.id}>
                  <Card className="h-100 shadow-sm bg-white rounded">
                    <Card.Img variant="top" src={`${recipe.imageUrl}`} />
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex mb-2 justify-content-between ">
                        <Card.Title className="mb-0 font-weight-bold">
                          {recipe.name}
                        </Card.Title>
                      </div>

                      <Card.Text>
                        Cooking time: {recipe.preperationTime} min
                        <br></br>
                        Flavourprofile: {recipe.flavourProfile}
                        <br></br>
                        Dish type: {recipe.dishType}
                      </Card.Text>
                      <Link to={`/Recipes/${recipe.id}`}>
                        Go to the instructions
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <p></p>
          )}
        </Row>
      </Container>
    </div>
  );
}
