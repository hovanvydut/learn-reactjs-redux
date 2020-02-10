import { combineReducers } from "redux";
import tasks from "./tasks";
import isDisplayForm from "./isDisplayForm";
import editTask from "./editTask";
console.log("in index Reducer");
const myReducer = combineReducers({ tasks, isDisplayForm, editTask });

export default myReducer;
