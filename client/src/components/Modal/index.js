import React from "react";
import "./style.css";

export default class Modal extends React.Component {
    render() {
        console.log(this.props.value)
        if (!this.props.show) {
            return null;
        }
        if (this.props.value === "signup") {
            return <div className="message">We're sorry, this username is already taken. Please choose another one to complete your registration.</div>;
        }
        else {
            return <div className="message">You entered an invalid username and/or password. Please try again.</div>;
        }

    }
}

