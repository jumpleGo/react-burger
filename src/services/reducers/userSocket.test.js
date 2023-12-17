import { initialState, wsUserReducer } from "./userSocket";
import {
  WS_USER_CONNECT,
  WS_USER_ERROR,
  WS_USER_CLOSE,
  WS_USER_MESSAGE,
} from "../actions/userSocket";

describe("wsUserReducer", () => {
  it("should return the initial state", () => {
    expect(wsUserReducer(undefined, {})).toEqual({
      ...initialState,
    });
  });

  it("should handle WS_USER_CONNECT", () => {
    const action = { type: WS_USER_CONNECT };
    const nextState = wsUserReducer(undefined, action);

    expect(nextState).toEqual({
      ...initialState,
      wsConnected: true,
    });
  });

  it("should handle WS_USER_ERROR", () => {
    const action = { type: WS_USER_ERROR, payload: "Connection error" };
    const nextState = wsUserReducer(undefined, action);

    expect(nextState).toEqual({
      ...initialState,
      error: "Connection error",
    });
  });

  it("should handle WS_USER_CLOSE", () => {
    const action = { type: WS_USER_CLOSE };
    const nextState = wsUserReducer(undefined, action);

    expect(nextState).toEqual({
      ...initialState,
    });
  });

  it("should handle WS_USER_MESSAGE", () => {
    const ordersMock = {
      data: true,
    };
    const action = { type: WS_USER_MESSAGE, payload: ordersMock };
    const nextState = wsUserReducer(undefined, action);

    expect(nextState).toEqual({
      ...initialState,
      orders: ordersMock,
    });
  });

  it("should return current state for unknown action", () => {
    const action = { type: "UNKNOWN_ACTION" };
    const currentState = {
      ...initialState,
      wsConnected: true,
    };
    const nextState = wsUserReducer(currentState, action);

    expect(nextState).toEqual(currentState);
  });
});
