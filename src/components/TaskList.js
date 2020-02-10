import React from "react";
import TaskItem from "./TaskList/TaskItem";
import { connect } from "react-redux";

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
        let value = event.target.value;
        if (["-1", "0", "1"].indexOf(value) > -1) value = Number(value);

        this.setState({ [name]: value });
        this.props.filter({
            filterName: name === "filterName" ? value : this.state.filterName,
            filterStatus:
                name === "filterStatus" ? value : this.state.filterStatus
        });
    };

    render() {
        console.log("render() in TaskList");
        let { tasks } = this.props;

        let tasksView = tasks.map((task, idx) => {
            console.log("map array in TaskList");
            return (
                <TaskItem
                    key={task.id}
                    task={task}
                    index={idx}
                    editTaskItem={this.props.editTaskItem}
                />
            );
        });

        let { filterName, filterStatus } = this.state;

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

// first argumnet of mapStateToProps called state === store.getState;
const mapStateToProps = state => {
    console.log("mapStateToProps in TaskList");
    return {
        tasks: state.tasks
    };
};
export default connect(mapStateToProps, null)(TaskList);
