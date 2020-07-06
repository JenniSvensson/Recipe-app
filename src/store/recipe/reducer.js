const initialState = {
  recipes: [],
  filteredecipes: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_RECIPES": {
      return {
        recipes: [...state.recipes, ...action.payload],
        filteredecipes: [...state.filteredecipes],
      };
    }
    case "FETCH_DIETRECIPES": {
      return {
        recipes: [...state.recipes],
        filteredecipes: [...action.payload],
      };
    }

    default: {
      return state;
    }
  }
};
