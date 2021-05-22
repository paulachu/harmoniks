import { inject, observer } from "mobx-react";
import React, { useState } from "react";
import { GrUserManager } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import compose from "recompose/compose";

const Navigation = ({user}) => {
    if (user.isUser)
        return (
            <div className="navigation">
                <img src="/logos/logoBis.svg" className="logo" alt="logo" />
                <ul className="menu">
                    <NavLink exact to="/requests">Je veux aider</NavLink>
                    <span>|</span>
                    <li>Mes demandes </li>
                </ul>
                <div className="account">
                    <span className="name">John Doe</span>
                    <GrUserManager className="account-icon"/>
                </div>
            </div>
        );
    return (
        <div className="navigation">
            <NavLink exact to="/" className="logo">
                <img src="/logos/logoBis.svg" alt="logo" />
            </NavLink>
            <ul className="menu">
                <NavLink exact to="/signin" >Sign In</NavLink>
                <span>|</span>
                <NavLink exact to="/signup">Join Us</NavLink>
            </ul>
            <span>Welcome</span>
        </div>
    );
};

export default compose(inject("user"), observer)(Navigation);
