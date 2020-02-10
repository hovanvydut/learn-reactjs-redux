import * as types from "./../constants/ActionType";

let initialState = false;

function isDisplayForm(state = initialState, action) {
    switch (action.type) {
        case types.TOGGLE_FORM:
            state = !state;
            return state;
        case types.OPEN_FORM:
            state = true;
            return true;
        case types.CLOSE_FORM:
            state = false;
            return false;
        default:
            return state;
    }
}

export default isDisplayForm;
