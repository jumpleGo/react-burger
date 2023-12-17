import { wsReducer } from "./socket";
import { WS_CONNECT, WS_ERROR, WS_CLOSE, WS_MESSAGE } from "../actions/socket";

describe("wsReducer", () => {
  it("should return the initial state", () => {
    expect(wsReducer(undefined, {})).toEqual({
      wsConnected: false,
      orders: null,
      error: undefined,
      currentOrder: undefined,
    });
  });

  it("should handle WS_CONNECT", () => {
    const action = { type: WS_CONNECT };
    const nextState = wsReducer(undefined, action);

    expect(nextState).toEqual({
      wsConnected: true,
      orders: null,
      error: undefined,
      currentOrder: undefined,
    });
  });

  it("should handle WS_ERROR", () => {
    const action = { type: WS_ERROR, payload: "Connection error" };
    const nextState = wsReducer(undefined, action);

    expect(nextState).toEqual({
      wsConnected: false,
      orders: null,
      error: "Connection error",
      currentOrder: undefined,
    });
  });

  it("should handle WS_CLOSE", () => {
    const action = { type: WS_CLOSE };
    const nextState = wsReducer(undefined, action);

    expect(nextState).toEqual({
      wsConnected: false,
      orders: null,
      error: undefined,
      currentOrder: undefined,
    });
  });

  it("should handle WS_MESSAGE", () => {
    const ordersMock = {
      data: true,
    };
    const action = { type: WS_MESSAGE, payload: ordersMock };
    const nextState = wsReducer(undefined, action);

    expect(nextState).toEqual({
      wsConnected: false,
      orders: ordersMock,
      error: undefined,
      currentOrder: undefined,
    });
  });

  it("should return current state for unknown action", () => {
    const action = { type: "UNKNOWN_ACTION" };
    const currentState = {
      wsConnected: true,
      orders: null,
      error: undefined,
      currentOrder: undefined,
    };
    const nextState = wsReducer(currentState, action);

    expect(nextState).toEqual(currentState);
  });
});
