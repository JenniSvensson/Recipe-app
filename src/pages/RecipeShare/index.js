import React, { useState, useEffect } from "react";
import { selectToken, selectUser } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addRecipe } from "../../store/recipe/actions";
import { Form, Button, Container } from "react-bootstrap";
import "./recipeShare.css";
import { useFormik } from "formik";
export default function RecipeShare() {
  const dispatch = useDispatch();
  // const [name, setName] = useState("");
  // const [instructions, setInstructions] = useState("");
  // const [imageUrl, setImageUrl] = useState("");
  // const [time, setTime] = useState("");
  // const [flavourProfile, setflavourProfile] = useState("sweet");
  // const [dishType, setDishType] = useState("breakfast");
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const history = useHistory();
  const [inputIngredients, setInputIngredients] = useState([
    { amount: "", ingredient: "" },
  ]);

  const initialValues = {
    name: "",
    instructions: "",
    imageUrl: "",
    time: "",
    flavourProfile: "",
    dishType: "",
    ingredientRow: {
      amount: "",
      ingredient: "",
    },
  };

  const onSubmit = (values) => {
    console.log("form data", values);
  };

  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.instructions) {
      errors.instructions = "Required";
    }
    if (!values.imageUrl) {
      errors.imageUrl = "Required";
    }
    if (!values.time) {
      errors.time = "Required";
    }
    if (!values.flavourProfile) {
      errors.flavourProfile = "Required";
    }
    if (!values.dishType) {
      errors.dishType = "Required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  console.log("formik errors", formik.errors);
  // function handleForm(e) {
  //   e.preventDefault();

  //   dispatch(
  //     addRecipe(
  //       name,
  //       instructions,
  //       imageUrl,
  //       time,
  //       flavourProfile,
  //       dishType,
  //       inputIngredients,
  //       user
  //     )
  //   );
  //   //reset form
  //   setName("");
  //   setInstructions("");
  //   setImageUrl("");
  //   setTime("");
  //   setflavourProfile("");
  //   setDishType("");
  //   setInputIngredients([{ amount: "", ingredient: "" }]);
  // }

  const handleRemoveClick = (index) => {
    const list = [...inputIngredients];
    list.splice(index, 1);
    setInputIngredients(list);
  };

  const handleAddClick = () => {
    setInputIngredients([...inputIngredients, { amount: "", ingredient: "" }]);
    console.log(inputIngredients);
  };

  // function handleInputChange(e, index) {
  //   const { name, value } = e.target;
  //   const ingredientsList = [...inputIngredients];
  //   ingredientsList[index][name] = value;
  //   setInputIngredients(ingredientsList);
  // }

  useEffect(() => {
    if (token === null) {
      history.push("/");
    }
  }, [token, history]);

  // console.log("form values", formik.values);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Container>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="Enter Name"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </Form.Group>

        <Form.Group controlId="formBasicInstructions">
          <Form.Label>Instructions</Form.Label>
          <Form.Control
            name="instructions"
            value={formik.values.instructions}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            as="textarea"
            rows="5"
            placeholder="Enter Instructions"
          />
          {formik.touched.Instructions && formik.errors.Instructions ? (
            <div className="error">{formik.errors.Instructions}</div>
          ) : null}
        </Form.Group>

        {inputIngredients.map((inputIngredient, index) => {
          return (
            <div key={index}>
              <input
                name="ingredientRow.amount"
                type="text"
                placeholder="Enter amount"
                onChange={formik.handleChange}
                // value={inputIngredient.amount}
                // onChange={(e) => handleInputChange(e, index)}
              />
              <input
                name="ingredientRow.ingredient"
                placeholder="Enter ingredient"
                onChange={formik.handleChange}
                // value={inputIngredient.ingredient}
                // onChange={(e) => handleInputChange(e, index)}
              />
              <Form.Check
                inline
                label="gluten"
                type="checkbox"
                onChange={formik.handleChange}
                id="gluten"
              />
              <Form.Check
                inline
                label="2"
                type="checkbox"
                onChange={formik.handleChange}
                id="inline-checkbox-2"
              />
              <Form.Check
                inline
                label="2"
                type="checkbox"
                id="inline-checkbox-2"
                onChange={formik.handleChange}
              />
              <Form.Check
                inline
                label="2"
                type="checkbox"
                onChange={formik.handleChange}
                id="inline-checkbox-2"
              />
              <Form.Check
                inline
                label="2"
                type="checkbox"
                onChange={formik.handleChange}
                id="inline-checkbox-2"
              />
              <Form.Check
                inline
                label="2"
                type="checkbox"
                onChange={formik.handleChange}
                id="inline-checkbox-2"
              />
              <Form.Check
                inline
                label="2"
                type="checkbox"
                onChange={formik.handleChange}
                id="inline-checkbox-2"
              />
              <Form.Check
                inline
                label="2"
                type="checkbox"
                onChange={formik.handleChange}
                id="inline-checkbox-2"
              />
              <Form.Check
                inline
                label="2"
                type="checkbox"
                onChange={formik.handleChange}
                id="inline-checkbox-2"
              />
              <Form.Check
                inline
                label="2"
                type="checkbox"
                onChange={formik.handleChange}
                id="inline-checkbox-2"
              />
              <Form.Check
                inline
                label="2"
                type="checkbox"
                onChange={formik.handleChange}
                id="inline-checkbox-2"
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

        <Form.Group controlId="formBasicImageUrl">
          <Form.Label>Image Url</Form.Label>
          <Form.Control
            name="imageUrl"
            value={formik.values.imageUrl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="Enter image url"
          />
          {formik.touched.imageUrl && formik.errors.imageUrl ? (
            <div className="error">{formik.errors.imageUrl}</div>
          ) : null}
        </Form.Group>

        <Form.Group controlId="formBasicTime">
          <Form.Label>Time</Form.Label>
          <Form.Control
            name="time"
            value={formik.values.time}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            placeholder="Enter Time"
          />
          {formik.touched.time && formik.errors.time ? (
            <div className="error">{formik.errors.time}</div>
          ) : null}
        </Form.Group>

        <Form.Group controlId="formBasicFlavourProfile">
          <Form.Label>Flavour profile</Form.Label>
          <Form.Control
            value={formik.values.flavourProfile}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="flavourProfile"
            as="select"
          >
            <option value="sweet">Sweet</option>
            <option value="salty">Salty</option>
            <option value="savoury">Savoury</option>
            <option value="spicy">Spicy</option>
          </Form.Control>
          {formik.touched.flavourProfile && formik.errors.flavourProfile ? (
            <div className="error">{formik.errors.flavourProfile}</div>
          ) : null}
        </Form.Group>

        <Form.Group controlId="formBasicDishType">
          <Form.Label>Dish type</Form.Label>
          <Form.Control
            // onChange={(event) => setDishType(event.target.value)}
            value={formik.values.dishType}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            name="dishType"
            as="select"
          >
            <option>breakfast</option>
            <option>lunch</option>
            <option>dinner</option>
            <option>dessert</option>
          </Form.Control>
          {formik.touched.dishType && formik.errors.dishType ? (
            <div className="error">{formik.errors.dishType}</div>
          ) : null}
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Container>
    </Form>
  );
}
