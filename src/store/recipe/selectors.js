export const selectRecipes = (reduxState) => {
  return reduxState.recipes.recipes;
};

export const selectRecipeById = (id) => (reduxState) => {
  if (reduxState.recipes.recipes.length) {
    const result = reduxState.recipes.recipes.find((recipe) => {
      return recipe.id === id;
    });

    return result;
  }
};

export const selectRecipeByUserId = (id) => (reduxState) => {
  if (reduxState.recipes.recipes.length) {
    const result = reduxState.recipes.recipes.filter((recipe) => {
      return recipe.userId === id;
    });

    return result;
  }
};

export const selectSearchedRecipes = (reduxState) => {
  return reduxState.recipes.searchedRecipes;
};

export const selectFilteredRecipes = (reduxState) => {
  return reduxState.recipes.filteredRecipes;
};

export const selectFilteredIngredients = (reduxState) => {
  return reduxState.ingredients;
};
