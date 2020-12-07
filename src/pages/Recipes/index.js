import React, { useEffect, useState } from "react";
import { getRecipes } from "../../store/recipe/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectRecipes } from "../../store/recipe/selectors";
import { Spinner, Container, Row, Form, Button, Col } from "react-bootstrap";
import RecipeCard from "../../components/RecipeCard";
export default function Recipes() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const Recipes = useSelector(selectRecipes);
  var searchText = localStorage.getItem("search");
  let recipesToDisplay;

  if (Recipes && search) {
    recipesToDisplay = Recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(search.toLowerCase())
    );
  } else {
    recipesToDisplay = Recipes;
  }

  function handleSearch(e) {
    const searchInput = e.target.value;
    setSearch(searchInput);
    localStorage.setItem("search", searchInput);
  }

  function handleClear(e) {
    localStorage.removeItem("search");
    setSearch("");
  }

  useEffect(() => {
    dispatch(getRecipes);
    setSearch(searchText);
  }, [dispatch, searchText]);
  return (
    <div>
      <Container className="p-3">
        <h3 className="mt-2">Discover</h3>
        <Form className="d-flex justify-content-end ">
          <Form.Row>
            <Col xs={8}>
              <Form.Control
                className="search-bar"
                type="text"
                placeholder="Search by name"
                value={search}
                onChange={handleSearch}
              />
            </Col>
            <Col xs="auto">
              <Button onClick={handleClear} value={search} variant="secondary">
                Clear
              </Button>
            </Col>
          </Form.Row>
        </Form>
        <Row>
          {recipesToDisplay ? (
            recipesToDisplay.map((recipe) => {
              return (
                <RecipeCard
                  id={recipe.id}
                  imageUrl={recipe.imageUrl}
                  name={recipe.name}
                  preperationTime={recipe.preperationTime}
                  flavourProfile={recipe.flavourProfile}
                  dishType={recipe.dishType}
                  key={recipe.id + 1}
                />
              );
            })
          ) : (
            <Container className="spinner">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Container>
          )}
          <br></br>
          <div>
            {recipesToDisplay.length === 0 && search && (
              <h2>No recipe found. Try searching with a diffrent name</h2>
            )}
          </div>
        </Row>
        <br></br>
      </Container>
    </div>
  );
}
