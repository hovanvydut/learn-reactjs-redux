import React from "react";
import { connect } from "react-redux";
import * as actions from "./../actions/index";

class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            status: false
        };
    }

    handleChange = event => {
        let name = event.target.name;
        let value = event.target.value;
        if (name === "status") {
            value = event.target.value === "true" ? true : false;
        }
        this.setState({ [name]: value });
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.props.itemNeedEdit.id) {
            this.props.onUpdateTask(this.state);
        } else {
            this.props.onAddTask(this.state);
        }
        this.resetStateInTaskForm();
        this.props.onCloseForm();
    };

    resetStateInTaskForm = () => {
        this.setState({
            id: "",
            name: "",
            status: false
        });
    };

    UNSAFE_componentWillMount() {
        if (this.props.itemNeedEdit.id) {
            this.setState({
                id: this.props.itemNeedEdit.id,
                name: this.props.itemNeedEdit.name,
                status: this.props.itemNeedEdit.status
            });
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemNeedEdit.id) {
            this.setState({
                id: nextProps.itemNeedEdit.id,
                name: nextProps.itemNeedEdit.name,
                status: nextProps.itemNeedEdit.status
            });
        } else {
            console.log("bbb");
            this.setState({ id: "", name: "", status: false });
        }
    }
    render() {
        let { onCloseForm } = this.props;

        return (
            <div className="card border-primary">
                <div className="card-header">
                    {this.props.itemNeedEdit.id
                        ? "Sửa công việc"
                        : "Thêm công việc"}
                    <i
                        className="fa fa-window-close float-right my-auto"
                        onClick={onCloseForm}
                    />
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Tên </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.handleChange}
                                name="name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Trạng thái: </label>
                            <select
                                className="custom-select"
                                value={this.state.status}
                                onChange={this.handleChange}
                                name="status"
                            >
                                <option value="true">Kích hoạt</option>
                                <option value="false">Ẩn</option>
                            </select>
                        </div>
                        <div className="row justify-content-center">
                            <button
                                type="submit"
                                className="btn btn-warning mr-1"
                            >
                                <i className="fa fa-plus text-white mr-1" />
                                Lưu
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this.resetStateInTaskForm}
                            >
                                <i className="fas fa-times mr-1"></i>
                                Huỷ bỏ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        itemNeedEdit: state.editTask
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddTask: task => {
            dispatch(actions.addTask(task));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
        onUpdateTask: task => {
            dispatch(actions.updateTask(task));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
