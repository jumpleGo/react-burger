import { storeReducer } from "./store";
import { combineReducers } from "redux";
import { modalReducer } from "./modal";
import { wsReducer } from "./socket";
import { wsUserReducer } from "./userSocket";
export const rootReducer = combineReducers({
  storeReducer,
  modalReducer,
  wsReducer,
  wsUserReducer,
});
