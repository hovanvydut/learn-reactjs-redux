import * as types from "./../constants/ActionType";

let initialState = {
    by: "name", // by == 'name' : sort theo ten; by == 'status': sort theo status
    value: 1 // name {1: tang dan; -1: giam dan}, status {1: kich hoat, -1: an}
};

function sortReducer(state = initialState, action) {
    switch (action.type) {
        case types.SORT:
            return action.sort;
        default:
            return state;
    }
}

export default sortReducer;
