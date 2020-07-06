export function selectRecipes(reduxState) {
  const result = reduxState.recipes.recipes;
  return result;
}

export const selectRecipeById = (id) => (reduxState) => {
  if (reduxState.recipes.recipes.length) {
    const result = reduxState.recipes.recipes.find((recipe) => {
      return recipe.id === id;
    });

    return result;
  }
};
