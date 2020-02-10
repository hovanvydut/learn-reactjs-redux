import React from "react";

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
    onSearch = () => {
        this.props.onSearch(this.state.keyWord);
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
                        onClick={this.onSearch}
                    >
                        <i className="fa fa-search" />
                        Tìm
                    </button>
                </div>
            </div>
        );
    }
}

export default Search;
