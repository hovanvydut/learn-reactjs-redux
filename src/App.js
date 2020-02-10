import React from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import Controll from "./components/Control";
import TaskList from "./components/TaskList";
import { connect } from "react-redux";
import * as actions from "./actions/index";

class App extends React.Component {
    handleToglleForm = () => {
        if (this.props.itemNeedEdit.id) {
            this.props.onResetEditItem();
        } else {
            this.props.onToggleForm();
        }
    };
    render() {
        let { isDisplayForm } = this.props;

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
                        {isDisplayForm ? <TaskForm /> : null}
                    </div>

                    <div className={isDisplayForm ? "col-md-8" : "col-md-12"}>
                        <div className="row mb-3">
                            <button
                                type="button"
                                className="btn btn-primary mr-1"
                                onClick={this.handleToglleForm}
                            >
                                <i className="fa fa-plus text-white mr-1" />
                                Thêm công việc
                            </button>
                        </div>

                        <div className="row">
                            <Controll />
                        </div>

                        <div className="row">
                            <div className="col-md-12 p-0">
                                <TaskList />
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

let mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm,
        itemNeedEdit: state.editTask
    };
};

let mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm: () => {
            dispatch(actions.toggleForm());
        },
        onResetEditItem: () => {
            dispatch({ type: "RESET_EDIT_ITEM" });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
