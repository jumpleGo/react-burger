import { CLOSE_MODAL, IModalActions, OPEN_MODAL } from "../actions/modal";

export const initialState = {
  isModalOpen: false,
};

export const modalReducer = (state = initialState, action: IModalActions) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        isModalOpen: true,
      };
    case CLOSE_MODAL:
      return {
        isModalOpen: false,
      };
    default:
      return state;
  }
};
