import * as types from "./../constants/ActionType";
let data = JSON.parse(window.localStorage.getItem("tasks"));
// store of taskReducer
let initialState = data ? data : [];

// reducer
function myReducer(state = initialState, action) {
    let idx;
    switch (action.type) {
        case types.LIST_ALL:
            return state;

        case types.ADD_TASK:
            let newTask = {
                id: generateID(),
                name: action.task.name,
                status: action.task.status === "true" ? true : false
            };
            state.push(newTask);
            window.localStorage.setItem("tasks", JSON.stringify(state));
            return [...state];

        case types.UPDATE_STATUS:
            idx = state.findIndex(task => task.id === action.id);
            state[idx] = {
                ...state[idx],
                status: !state[idx].status
            };
            window.localStorage.setItem("tasks", JSON.stringify(state));
            return [...state];

        case types.DELETE_TASK:
            idx = state.findIndex(task => task.id === action.id);
            state.splice(idx, 1);
            window.localStorage.setItem("tasks", JSON.stringify(state));
            return [...state];

        case types.UPDATE_TASK:
            console.log(action);
            idx = state.findIndex(task => task.id === action.task.id);
            state[idx] = {
                ...action.task
            };
            window.localStorage.setItem("tasks", JSON.stringify(state));
            return [...state];

        default:
            return state;
    }
}

/* start generateID */
var s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};

var generateID = () => {
    return (
        s4() +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        s4()
    );
};

/* end generateID */

export default myReducer;
