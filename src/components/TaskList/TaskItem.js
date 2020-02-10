import React from "react";
import { connect } from "react-redux";
import * as actions from "./../../actions/index";

class TaskItem extends React.Component {
    editTaskItem = () => {
        this.props.editTaskItem(this.props.task.id);
    };

    handleEdit = task => {
        this.props.onEditTask(task);
        // this.props.onOpenFrom();
    };

    handleDeleteTask = id => {
        this.props.onDeleteTask(id);
        this.props.onCloseForm();
    };

    render() {
        console.log("render()s in TaskItem");
        let { task, index, onUpdateStatus } = this.props;

        // true: kich hoat, false: an
        let statusBtn = task.status ? (
            <button
                type="button"
                className="btn btn-danger d-block mx-auto"
                onClick={() => onUpdateStatus(task.id)}
            >
                Kích hoạt
            </button>
        ) : (
            <button
                type="button"
                className="btn btn-success d-block mx-auto"
                onClick={() => onUpdateStatus(task)}
            >
                Ẩn
            </button>
        );

        return (
            <tr>
                <th>{index + 1}</th>
                <td>{task.name}</td>
                <td>{statusBtn}</td>
                <td className="d-flex justify-content-center">
                    <button
                        type="button"
                        className="btn btn-warning mr-1"
                        onClick={() => this.handleEdit(task)}
                    >
                        <i className="fas fa-pencil-alt text-white mr-1"></i>
                        Sửa
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => this.handleDeleteTask(task.id)}
                    >
                        <i className="fa fa-trash mr-1" />
                        Xoá
                    </button>
                </td>
            </tr>
        );
    }
}

let mapStateToProps = state => {
    console.log("mapStateToProps in TaskItem");
    return {
        abc: state
    };
};

let mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: id => {
            dispatch(actions.updateStatus(id));
        },
        onDeleteTask: id => {
            dispatch(actions.deleteTask(id));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
        onOpenFrom: () => {
            dispatch(actions.openForm());
        },
        onEditTask: task => {
            dispatch(actions.editTask(task));
        }
    };
};

export default connect(null, mapDispatchToProps)(TaskItem);
