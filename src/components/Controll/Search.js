import React from "react";
import { connect } from "react-redux";
import * as actions from "./../../actions";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyWord: ""
        };
    }

    handleChange = event => {
        this.setState({ keyWord: event.target.value });
    };

    handleSearch = () => {
        this.props.searchTask(this.state.keyWord);
    };

    render() {
        return (
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập từ khoá..."
                    value={this.state.keyWord}
                    onChange={this.handleChange}
                />
                <div className="input-group-append">
                    <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={this.handleSearch}
                    >
                        <i className="fa fa-search" />
                        Tìm
                    </button>
                </div>
            </div>
        );
    }
}

let mapDispatchToProps = (dispatch, props) => {
    return {
        searchTask: keyWord => {
            dispatch(actions.searchTask(keyWord));
        }
    };
};

export default connect(null, mapDispatchToProps)(Search);
