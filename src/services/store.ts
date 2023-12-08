import { socketMiddleware } from "./../middleware/socket";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers/rootReducer";
import { TWSActions } from "./actions/socket";
import { TWSUserActions } from "./actions/userSocket";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";

export const wsUrlAllOrders = "wss://norma.nomoreparties.space/orders/all";
export const wsUrlOrders = "wss://norma.nomoreparties.space/all";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(TWSActions),
    socketMiddleware(TWSUserActions),
  ),
);

export const store = createStore(rootReducer, enhancer);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
