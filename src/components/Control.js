import React from "react";
import Search from "./Controll/Search";
import Sort from "./Controll/Sort";

class Controll extends React.Component {
    render() {
        return (
            <div className="w-100 d-flex">
                <div className="col-md-6 p-0">
                    <Search />
                </div>
                <div className="col-md-6">
                    <Sort />
                </div>
            </div>
        );
    }
}

export default Controll;
