
import React from "react";
import './../styles.css';

export default class Header extends React.Component {

    render() {

        return (
            <header>
                <img className="header--img" src="../images/troll-face.png" alt="" />
                <h1 className="header--title">Header component</h1>
                <h4 className="header--project">React project 3</h4>
            </header>
        );
    }
}