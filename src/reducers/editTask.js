import * as types from "./../constants/ActionType";

let initialState = {};

function editTask(state = initialState, action) {
    switch (action.type) {
        case types.EDIT_TASK:
            return Object.assign({}, action.task);
        case "RESET_EDIT_ITEM":
            state = {};
            return {};
        default:
            return state;
    }
}

export default editTask;
