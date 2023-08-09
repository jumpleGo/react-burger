const getFillings = (state) => {
  const { burgerIngredients } = state.storeReducer;

  return burgerIngredients.filter((item) => item.type !== "bun");
};

const getBun = (state) => {
  const { burgerIngredients } = state.storeReducer;
  return burgerIngredients.filter((item) => item.type === "bun")?.[0];
};

const getIngredientById = (state, id) => {
  const { ingredients } = state.storeReducer;

  return ingredients.find((item) => item._id === id);
};

export { getFillings, getBun, getIngredientById };
