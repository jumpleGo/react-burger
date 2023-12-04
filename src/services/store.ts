import { socketMiddleware } from "./../middleware/socket";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers/rootReducer";
import { TWSActions } from "./actions/socket";
import { TWSUserActions } from "./actions/userSocket";

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
export type RootState = ReturnType<typeof rootReducer>;
