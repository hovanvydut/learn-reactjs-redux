import { combineReducers } from "redux";
import tasks from "./tasks";
import isDisplayForm from "./isDisplayForm";
import editTask from "./editTask";
import filterTable from "./filterTable";
import searchTask from "./searchTask";
import sort from "./sort";

// console.log("in index Reducer");
const myReducer = combineReducers({
    tasks,
    isDisplayForm,
    editTask,
    filterTable,
    searchTask,
    sort
});

export default myReducer;
