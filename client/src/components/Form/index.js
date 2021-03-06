import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-group">
      <input className="form-control" {...props} />
    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control" rows="8" {...props} />
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button {...props} style={{ float: "right", marginRight: 15, marginBottom: 10 }} className="btn btn-success">
      {props.children}
    </button>
  );
}

export function FormSelect(props) {
  return (
    <div className="form-group">
    <select {...props} className="custom-select">
      <option value="0">Rating 1-5 (required)</option>
      <option value="5">5</option>
      <option value="4">4</option>
      <option value="3">3</option>
      <option value="2">2</option>
      <option value="1">1</option>
    </select>
    </div>
  );
}