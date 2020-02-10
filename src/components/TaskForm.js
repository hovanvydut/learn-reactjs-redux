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
        /* if (this.props.taskEditing) {
            this.props.updateTask(this.state);
        } else {
            this.props.addTask(this.state);
        } */
        this.props.onAddTask(this.state);
        this.clearForm();
        this.props.onCloseForm();
    };

    clearForm = () => {
        this.setState({
            id: "",
            name: "",
            status: false
        });
    };

    UNSAFE_componentWillMount() {
        // console.log("UNSAFE_componentWillMount");
        if (this.props.taskEditing) {
            this.setState({
                id: this.props.taskEditing.id,
                name: this.props.taskEditing.name,
                status: this.props.taskEditing.status
            });
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.taskEditing) {
            this.setState({
                id: nextProps.taskEditing.id,
                name: nextProps.taskEditing.name,
                status: nextProps.taskEditing.status
            });
        } else if (nextProps && nextProps.taskEditing === null) {
            this.setState({ id: "", name: "", status: false });
        }
    }
    render() {
        console.log("render() in TaskForm");
        let { onCloseForm } = this.props;

        return (
            <div className="card border-primary">
                <div className="card-header">
                    {this.props.taskEditing
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
                                onClick={this.clearForm}
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
    console.log("mapStateToProps in TaskForm");
    return {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddTask: task => {
            dispatch(actions.addTask(task));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
