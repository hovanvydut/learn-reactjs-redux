import * as types from "./../constants/ActionType";

let initialState = "";

function searchTaskReducer(state = initialState, action) {
    switch (action.type) {
        case types.SEARCH:
            console.log(action);
            return action.keyWord;
        default:
            return state;
    }
}

export default searchTaskReducer;
