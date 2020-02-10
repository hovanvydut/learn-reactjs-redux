import * as types from "./../constants/ActionType";

let initialState = {
    name: "",
    status: -1
};

function filterTableReducer(state = initialState, action) {
    switch (action.type) {
        case types.FILTER_TASK:
            return action.filterInput;
        default:
            return state;
    }
}

export default filterTableReducer;
