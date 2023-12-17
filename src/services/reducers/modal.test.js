import { initialState, modalReducer } from "./modal";
import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modal";

describe("modalReducer", () => {
  it("should return the initial state", () => {
    expect(modalReducer(undefined, {})).toEqual({
      isModalOpen: false,
    });
  });

  it("should handle OPEN_MODAL", () => {
    const action = { type: OPEN_MODAL };
    const nextState = modalReducer(undefined, action);

    expect(nextState).toEqual({
      isModalOpen: true,
    });
  });

  it("should handle CLOSE_MODAL", () => {
    const action = { type: CLOSE_MODAL };
    const nextState = modalReducer(undefined, action);

    expect(nextState).toEqual({
      isModalOpen: false,
    });
  });

  it("should return current state for unknown action", () => {
    const action = { type: "UNKNOWN_ACTION" };
    const currentState = { isModalOpen: true };
    const nextState = modalReducer(currentState, action);

    expect(nextState).toEqual(currentState);
  });
});
