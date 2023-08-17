import {CLOSE_MODAL, OPEN_MODAL} from "../actions/modal";

const initialState = {
    isModalOpen: false
}

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                isModalOpen: true,
            }
        case CLOSE_MODAL:
            return {
                isModalOpen: false,
            }
        default:
            return state
    }
}