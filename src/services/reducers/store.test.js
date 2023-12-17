import { storeReducer } from "./store";
import {
  GET_INGREDIENTS_SUCCESS,
  UPDATE_ORDER,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_MODAL_INGREDIENT,
  ADD_ORDER,
  CLEAN_MODAL_DATA,
  CLEAR_INGREDIENTS,
  GET_SINGLE_ORDER,
} from "../actions/store";

describe("storeReducer", () => {
  it("should return the initial state", () => {
    expect(storeReducer(undefined, {})).toEqual({
      ingredients: [],
      burgerIngredients: [],
      currentIngredient: {},
      order: {},
      currentSingleOrder: null,
    });
  });

  it("should handle GET_INGREDIENTS_SUCCESS", () => {
    const ingredientsMock = [
      {
        _id: "643d69a5c3f7b9001cfa093c",
        name: "Краторная булка N-200i",
        type: "bun",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        __v: 0,
      },
      {
        _id: "643d69a5c3f7b9001cfa0941",
        name: "Биокотлета из марсианской Магнолии",
        type: "main",
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: "https://code.s3.yandex.net/react/code/meat-01.png",
        image_mobile:
          "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
        __v: 0,
      },
      {
        _id: "643d69a5c3f7b9001cfa093e",
        name: "Филе Люминесцентного тетраодонтимформа",
        type: "main",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/meat-03.png",
        image_mobile:
          "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
        __v: 0,
      },
      {
        _id: "643d69a5c3f7b9001cfa0942",
        name: "Соус Spicy-X",
        type: "sauce",
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: "https://code.s3.yandex.net/react/code/sauce-02.png",
        image_mobile:
          "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
        __v: 0,
      },
    ];
    const action = { type: GET_INGREDIENTS_SUCCESS, payload: ingredientsMock };
    const nextState = storeReducer(undefined, action);

    expect(nextState).toEqual({
      ingredients: ingredientsMock,
      burgerIngredients: [],
      currentIngredient: {},
      order: {},
      currentSingleOrder: null,
    });
  });

  it("should handle UPDATE_ORDER", () => {
    const state = {
      ingredients: [],
      burgerIngredients: [{ type: "bun" }, { type: "main" }, { type: "sauce" }],
      currentIngredient: {},
      order: {},
      currentSingleOrder: null,
    };
    const action = {
      type: UPDATE_ORDER,
      payload: { startIndex: 0, endIndex: 1 },
    };
    const nextState = storeReducer(state, action);

    expect(nextState).toEqual({
      burgerIngredients: [{ type: "bun" }, { type: "sauce" }, { type: "main" }],
      ingredients: [],
      currentIngredient: {},
      order: {},
      currentSingleOrder: null,
    });
  });

  it("should handle ADD_INGREDIENT for bun", () => {
    const bunIngredient = { type: "bun" };
    const action = { type: ADD_INGREDIENT, payload: bunIngredient };
    const nextState = storeReducer(undefined, action);

    expect(nextState).toEqual({
      ingredients: [],
      burgerIngredients: [bunIngredient],
      currentIngredient: {},
      order: {},
      currentSingleOrder: null,
    });
  });

  it("should handle ADD_INGREDIENT for non-bun", () => {
    const nonBunIngredient = { type: "non-bun" };
    const initialState = {
      ingredients: [],
      burgerIngredients: [{ type: "bun" /* mock bun data */ }],
      currentIngredient: {},
      order: {},
      currentSingleOrder: null,
    };
    const action = { type: ADD_INGREDIENT, payload: nonBunIngredient };
    const nextState = storeReducer(initialState, action);

    expect(nextState).toEqual({
      ingredients: [],
      burgerIngredients: [...initialState.burgerIngredients, nonBunIngredient],
      currentIngredient: {},
      order: {},
      currentSingleOrder: null,
    });
  });

  it("should handle REMOVE_INGREDIENT", () => {
    const initialState = {
      ingredients: [],
      burgerIngredients: [
        { type: "bun" /* mock bun data */ },
        { type: "non-bun" /* mock non-bun data */ },
      ],
      currentIngredient: {},
      order: {},
      currentSingleOrder: null,
    };
    const action = { type: REMOVE_INGREDIENT, payload: 0 };
    const nextState = storeReducer(initialState, action);

    expect(nextState).toEqual({
      ingredients: [],
      burgerIngredients: [{ type: "bun" /* mock bun data */ }],
      currentIngredient: {},
      order: {},
      currentSingleOrder: null,
    });
  });

  it("should handle ADD_MODAL_INGREDIENT", () => {
    const modalIngredient = { type: "modal" /* mock modal data */ };
    const action = { type: ADD_MODAL_INGREDIENT, payload: modalIngredient };
    const nextState = storeReducer(undefined, action);

    expect(nextState).toEqual({
      ingredients: [],
      burgerIngredients: [],
      currentIngredient: modalIngredient,
      order: {},
      currentSingleOrder: null,
    });
  });

  it("should handle CLEAN_MODAL_DATA", () => {
    const initialState = {
      ingredients: [],
      burgerIngredients: [],
      currentIngredient: {
        data: true,
      },
      order: {
        data: true,
      },
      currentSingleOrder: null,
    };
    const action = { type: CLEAN_MODAL_DATA };
    const nextState = storeReducer(initialState, action);

    expect(nextState).toEqual({
      ingredients: [],
      burgerIngredients: [],
      currentIngredient: {},
      order: {},
      currentSingleOrder: null,
    });
  });

  it("should handle CLEAR_INGREDIENTS", () => {
    const initialState = {
      ingredients: [],
      burgerIngredients: [{ type: "bun" /* mock bun data */ }],
      currentIngredient: {},
      order: {},
      currentSingleOrder: null,
    };
    const action = { type: CLEAR_INGREDIENTS };
    const nextState = storeReducer(initialState, action);

    expect(nextState).toEqual({
      ingredients: [],
      burgerIngredients: [],
      currentIngredient: {},
      order: {},
      currentSingleOrder: null,
    });
  });

  it("should handle GET_SINGLE_ORDER", () => {
    const singleOrderData = {
      data: true,
    };
    const action = { type: GET_SINGLE_ORDER, payload: singleOrderData };
    const nextState = storeReducer(undefined, action);

    expect(nextState).toEqual({
      ingredients: [],
      burgerIngredients: [],
      currentIngredient: {},
      order: {},
      currentSingleOrder: singleOrderData,
    });
  });
});
