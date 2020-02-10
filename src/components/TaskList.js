import React from "react";
import TaskItem from "./TaskList/TaskItem";
import { connect } from "react-redux";
import * as actions from "./../actions/index";

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: "",
            filterStatus: -1 // all = -1, active: 1, unactive: 0
        };
    }

    handleChange = event => {
        let name = event.target.name;
        let value =
            name === "checkbox" ? event.target.checked : event.target.value;
        if (["-1", "0", "1"].indexOf(value) > -1) value = Number(value);

        this.setState({ [name]: value });
        this.props.filter({
            name: name === "filterName" ? value : this.state.filterName,
            status: name === "filterStatus" ? value : this.state.filterStatus
        });
    };

    render() {
        let { filterName, filterStatus } = this.state;
        let { tasks, filterTable, searchTask, sort } = this.props;

        if (filterTable) {
            if (filterTable.name !== "") {
                tasks = tasks.filter(task => {
                    let regex = new RegExp(
                        "\\b" + filterTable.name.toLowerCase(),
                        "g"
                    );
                    return regex.test(task.name.toLowerCase());
                });
            }
            if (filterTable.status !== -1)
                tasks = tasks.filter(task => {
                    if (filterTable.status === 0) return task.status === false;
                    else return task.status === true;
                });
        }

        if (searchTask !== "") {
            tasks = tasks.filter(task => {
                let regex = new RegExp("\\b" + searchTask.toLowerCase(), "g");
                return regex.test(task.name.toLowerCase());
            });
        }

        if (sort.by === "name") {
            tasks = tasks.sort((a, b) => {
                let nameA = a.name.toLowerCase();
                let nameB = b.name.toLowerCase();

                if (nameA > nameB) return sort.value;
                if (nameA < nameB) return -sort.value;
                return 0;
            });
        }

        if (sort.by === "status") {
            tasks = tasks.sort((a, b) => {
                if (a.status > b.status) return -sort.value;
                if (a.status < b.status) return sort.value;
                return 0;
            });
        }

        let tasksView = tasks.map((task, idx) => {
            return (
                <TaskItem
                    key={task.id}
                    task={task}
                    index={idx}
                    editTaskItem={this.props.editTaskItem}
                />
            );
        });

        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row" />
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                name="filterName"
                                value={filterName}
                                onChange={this.handleChange}
                            />
                        </td>
                        <td>
                            <select
                                className="form-control"
                                name="filterStatus"
                                value={filterStatus}
                                onChange={this.handleChange}
                            >
                                <option value={-1}>Tất cả</option>
                                <option value={0}>Ẩn</option>
                                <option value={1}>Kích hoạt</option>
                            </select>
                        </td>
                        <td />
                    </tr>
                    {tasksView}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        filterTable: state.filterTable,
        searchTask: state.searchTask,
        sort: state.sort
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        filter: filterInput => {
            dispatch(actions.filterTask(filterInput));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
