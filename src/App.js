import React from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import Controll from "./components/Control";
import TaskList from "./components/TaskList";
import { connect } from "react-redux";
import * as actions from "./actions/index";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // tasks: [],
            // isDisplayTaskForm: false,
            taskEditing: null,
            keyWord: "",
            sort: {
                by: "name", // by == 'name' : sort theo ten; by == 'status': sort theo status
                value: 1 // name {1: tang dan; -1: giam dan}, status {1: kich hoat, -1: an}
            }
        };
    }

    onCloseForm = () => {
        this.setState({ isDisplayTaskForm: false, taskEditing: null });
    };

    onShowForm = () => {
        this.setState({ isDisplayTaskForm: true, taskEditing: null });
    };

    changeStatus = idOfTaskItem => {
        let currentData = this.state.tasks;
        currentData.forEach(elm =>
            elm.id === idOfTaskItem ? (elm.status = !elm.status) : null
        );

        this.setState({ tasks: currentData });
        window.localStorage.setItem("tasks", JSON.stringify(currentData));
    };

    editTaskItem = idOfTaskItem => {
        let idx = this.state.tasks.findIndex(elm => elm.id === idOfTaskItem);
        let task = this.state.tasks[idx];

        this.onShowForm(); // hàm onShowForm phải nằm trước câu lệnh setState vì onShowForm có set taskEditing về null
        this.setState({ taskEditing: task });
    };

    updateTask = task => {
        let currentData = this.state.tasks;
        currentData.forEach(elm => {
            if (elm.id === task.id) {
                elm.name = task.name;
                elm.status = task.status;
            }
        });

        this.setState({ tasks: currentData });
        window.localStorage.setItem("tasks", JSON.stringify(currentData));
        this.setState({ taskEditing: null });
    };

    onFilter = data => {
        let filterName = data.filterName,
            filterStatus = data.filterStatus; // filterStatus = [-1, 0, 1] <=> [tat ca, an, kich hoat]
        this.setState({
            filter: { name: filterName.toLowerCase(), status: filterStatus }
        });
    };

    onSearch = keyWord => {
        this.setState({ keyWord: keyWord });
    };

    sortByValue = (sortBy, sortValue) => {
        console.log(sortBy + " - " + sortValue);
        this.setState({
            sort: {
                by: sortBy,
                value: sortValue
            }
        });
    };

    render() {
        console.log("render() in App");
        let {
            tasks,
            // isDisplayTaskForm,
            taskEditing,
            filter,
            keyWord,
            sort
        } = this.state;

        let { isDisplayForm, onToggleForm } = this.props;

        if (filter) {
            if (filter.name !== "")
                tasks = tasks.filter(task => {
                    let regex = new RegExp("\\b" + filter.name, "g");
                    return regex.test(task.name.toLowerCase());
                });
            if (filter.status !== -1)
                tasks = tasks.filter(task => {
                    if (filter.status === 0) return task.status === false;
                    else return task.status === true;
                });
        }

        if (keyWord !== "") {
            tasks = tasks.filter(task => {
                let regex = new RegExp("\\b" + keyWord, "g");
                return regex.test(task.name.toLowerCase());
            });
        }

        /* if (sort.by === "name") {
            tasks.sort((a, b) => {
                let nameA = a.name.toLowerCase();
                let nameB = b.name.toLowerCase();
                if (nameA > nameB) return sort.value;
                if (nameA < nameB) return -sort.value;
                return 0;
            });
        } */

        if (sort.by === "status") {
            tasks.sort((a, b) => {
                if (a.status > b.status) return -sort.value;
                if (a.status < b.status) return sort.value;
                return 0;
            });
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center">Quản lí công việc</h1>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className={isDisplayForm ? "col-md-4" : null}>
                        {isDisplayForm ? (
                            <TaskForm
                            // onToggleTaskForm={this.onToggleTaskForm}
                            // taskEditing={taskEditing}
                            // updateTask={this.updateTask}
                            />
                        ) : null}
                    </div>

                    <div className={isDisplayForm ? "col-md-8" : "col-md-12"}>
                        <div className="row mb-3">
                            <button
                                type="button"
                                className="btn btn-primary mr-1"
                                onClick={onToggleForm}
                            >
                                <i className="fa fa-plus text-white mr-1" />
                                Thêm công việc
                            </button>
                        </div>

                        <div className="row">
                            <Controll
                                onSearch={this.onSearch}
                                sortByValue={this.sortByValue}
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-12 p-0">
                                <TaskList
                                // changeStatus={this.changeStatus}
                                // editTaskItem={this.editTaskItem}
                                // filter={this.onFilter}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* INFO: DONT CARE */}
                <div className="row">
                    <div
                        className="accordion col-md-12 p-0"
                        id="accordionExample"
                    >
                        <div className="card">
                            <div className="card-header" id="headingOne">
                                <h2 className="mb-0">
                                    <button
                                        className="btn btn-link"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target="#collapseOne"
                                        aria-expanded="true"
                                        aria-controls="collapseOne"
                                    >
                                        Thông tin fake project :3
                                    </button>
                                </h2>
                            </div>
                            <div
                                id="collapseOne"
                                className="collapse show"
                                aria-labelledby="headingOne"
                                data-parent="#accordionExample"
                            >
                                <div className="card-body">
                                    <p>
                                        Sản phẩm làm theo demo thuộc khoá học
                                        ReactJs của kênh youtube 'nghiepuit'
                                    </p>
                                    <p>
                                        Link khoá học:
                                        <a href="https://www.youtube.com/playlist?list=PLJ5qtRQovuEOoKffoCBzTfvzMTTORnoyp">
                                            tại đây
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    ;
                </div>
            </div>
        );
    }
}

// mapStateToProps sẽ được gọi khi state slice khác với state trả về của hàm reduce theo shallow equality check
// first argument in mapStateToProps called stated === store.getState();
let mapStateToProps = state => {
    console.log("mapStateToProps in App");
    return {
        isDisplayForm: state.isDisplayForm
    };
};

let mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm: () => {
            dispatch(actions.toggleForm());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
