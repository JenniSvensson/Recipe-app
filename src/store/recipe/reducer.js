const initialState = {
  recipes: [],
  filteredRecipes: [],
  searchedRecipes: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_RECIPES": {
      return {
        recipes: [...action.payload],
        filteredecipes: [...state.filteredRecipes],
        searchedRecipes: [...state.searchedRecipes],
      };
    }
    case "FETCH_DIETRECIPES": {
      return {
        recipes: [...state.recipes],
        filteredRecipes: [...action.payload],
        searchedRecipes: [...state.searchedRecipes],
      };
    }
    case "FETCH_SEARCHRECIPES": {
      return {
        recipes: [...state.recipes],
        filteredRecipes: [...state.filteredRecipes],
        searchedRecipes: [...action.payload],
      };
    }

    default: {
      return state;
    }
  }
};
