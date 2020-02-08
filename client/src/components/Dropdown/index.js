
import React from "react";
//import "./style.css";

// This file exports both the List and ListItem components

function Dropdown(props) {
  return (
      <div className="row">
          <div className="col-12">
            <div className="dropdown">
                <button className="btn btn-danger dropdown-toggle mb-3" type="button" id="dropdownMenuButton" data-toggle="dropdown"   aria-haspopup="true" aria-expanded="false">
                Search by Rating
                </button>

                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" onClick={() => props.rateSelected(0)} key="0">Clear Selection</a>
                <a className="dropdown-item" onClick={() => props.rateSelected(1)} key="1">1</a>
                <a className="dropdown-item" onClick={() => props.rateSelected(2)} key="2">2</a>
                <a className="dropdown-item" onClick={() => props.rateSelected(3)} key="3">3</a>
                <a className="dropdown-item" onClick={() => props.rateSelected(4)} key="4">4</a>
                <a className="dropdown-item" onClick={() => props.rateSelected(5)} key="5">5</a>
            </div>
        </div>
    </div>
</div>

  );
}

export default Dropdown;

