import {storeReducer} from './store'
import { combineReducers } from 'redux';
import {modalReducer} from "./modal";
export const rootReducer = combineReducers({
    storeReducer,
    modalReducer

})
