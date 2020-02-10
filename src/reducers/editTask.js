import * as types from "./../constants/ActionType";

let initialState = {};

function editTask(state = initialState, action) {
    switch (action.type) {
        case types.EDIT_TASK:
            console.log(action);
            console.log("in editTask Reducer");
            state = Object.assign({}, action.task);
            return { ...state };
        default:
            return state;
    }
}

export default editTask;
