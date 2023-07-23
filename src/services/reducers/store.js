import burgerIngredients from "../../components/BurgerIngredients";
import {REMOVE_INGREDIENT} from "../actions/store";

const initialState = {
    ingredients: [],
    burgerIngredients: [],
    currentIngredient: {},
    order: {}
};

export const storeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_INGREDIENTS':
            return {
                ...state,
            }
        case 'GET_INGREDIENTS_SUCCESS':
            return {
                ...state,
                ingredients: action.payload
            }
        case 'UPDATE_ORDER':
            const { startIndex, endIndex } = action.payload;
            const burgerIngredients = [...state.burgerIngredients];
            const [movedItem] = burgerIngredients.splice(startIndex+1, 1);
            burgerIngredients.splice(endIndex+1, 0, movedItem);
            return { ...state, burgerIngredients };
        case 'ADD_INGREDIENT':
            console.log(action.payload)

            return {
                ...state,
                burgerIngredients:  action.payload.type === 'bun'
                    ? state.burgerIngredients.some(item => item.type === 'bun')
                        ? state.burgerIngredients.map(item => item.type === 'bun' ? action.payload : item)
                        : [action.payload, ...state.burgerIngredients]
                    : [...state.burgerIngredients, action.payload]
            }
        case 'REMOVE_INGREDIENT':
            return {
                ...state,
                burgerIngredients: state.burgerIngredients.filter((item, index) => index !== action.payload+1)
            }
        case 'ADD_MODAL_INGREDIENT':
            return {
                ...state,
                currentIngredient: action.payload
            }
        case 'ADD_ORDER':
            return {
                ...state,
                order: action.payload
            }
        case 'CLEAN_MODAL_DATA':
                return {
                ...state,
                    order: {},
                    currentIngredient: {}
                }
        case 'CLEAR_INGREDIENTS':
            return {
                ...state,
                burgerIngredients: []
            }
        default:
            return state
    }
}