export function selectRecipes(reduxState) {
  const result = reduxState.recipes;
  return result;
}

export const selectRecipeById = (id) => (reduxState) => {
  if (reduxState.recipes.length) {
    const result = reduxState.recipes.find((recipe) => {
      return recipe.id === id;
    });

    return result;
  }
};
