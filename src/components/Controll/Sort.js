import React from "react";
import { connect } from "react-redux";
import * as actions from "./../../actions/index";

class Sort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: {
                by: "name",
                value: 1
            }
        };
    }

    sortByValue = (sortBy, sortValue) => {
        this.setState({
            sort: {
                by: sortBy,
                value: sortValue
            }
        });
        this.props.sort({ by: sortBy, value: sortValue });
    };

    render() {
        let { sort } = this.state;
        return (
            <div className="dropdown">
                <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                >
                    Sắp xếp
                </button>
                <ul className="dropdown-menu">
                    <li
                        className={
                            sort.by === "name" && sort.value === 1
                                ? "dropdown-item sort--selected"
                                : "dropdown-item"
                        }
                        href="/"
                        onClick={() => this.sortByValue("name", 1)}
                    >
                        Tên A-Z
                    </li>
                    <li
                        className={
                            sort.by === "name" && sort.value === -1
                                ? "dropdown-item sort--selected"
                                : "dropdown-item"
                        }
                        href="/"
                        onClick={() => this.sortByValue("name", -1)}
                    >
                        Tên Z-A
                    </li>
                    <li
                        className={
                            sort.by === "status" && sort.value === 1
                                ? "dropdown-item sort--selected"
                                : "dropdown-item"
                        }
                        href="/"
                        onClick={() => this.sortByValue("status", 1)}
                    >
                        Trạng thái kích hoạt
                    </li>
                    <li
                        className={
                            sort.by === "status" && sort.value === -1
                                ? "dropdown-item sort--selected"
                                : "dropdown-item"
                        }
                        href="/"
                        onClick={() => this.sortByValue("status", -1)}
                    >
                        Trạng thái ẩn
                    </li>
                </ul>
            </div>
        );
    }
}

let mapDispatchToProps = (dispatch, props) => {
    return {
        sort: obj => {
            dispatch(actions.sort(obj));
        }
    };
};

export default connect(null, mapDispatchToProps)(Sort);
