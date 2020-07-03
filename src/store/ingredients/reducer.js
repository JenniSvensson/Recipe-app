const initialState = {
  ingridients: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_INGREDIENTS": {
      return [...state.ingridients, ...action.payload];
    }

    default: {
      return state;
    }
  }
};
