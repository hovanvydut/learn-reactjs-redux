import * as types from "./../constants/ActionType";
let data = JSON.parse(window.localStorage.getItem("tasks"));
// store of taskReducer
let initialState = data ? data : [];

// reducer
function myReducer(state = initialState, action) {
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
            let idxUpdate = state.findIndex(task => task.id === action.id);

            state[idxUpdate] = {
                ...state[idxUpdate],
                status: !state[idxUpdate].status
            };

            window.localStorage.setItem("tasks", JSON.stringify(state));
            // state !== [...state] theo kieu so sanh shallow ==> mamStateToProps mới được gọi => hàm render() đc gọi lại vì theoLifeCycle, hàm render được gọi khi có sự thay đổi state hoặc props
            return [...state];
        case types.DELETE_TASK:
            let idxDelete = state.findIndex(task => task.id === action.id);
            state.splice(idxDelete, 1);
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
