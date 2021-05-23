import { inject, observer } from "mobx-react";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import compose from "recompose/compose";

const Navigation = ({user}) => {

    if (user.isUser)
        return (
            <div className="navigation">
                <img src="/logos/logoBis.svg" className="logo" alt="logo" />
                <ul className="menu">
                    <NavLink exact to="/requests">I want to help!</NavLink>
                    <span>|</span>
                    <NavLink exact to="/history">My requests</NavLink>
                </ul>
                <div className="account">
                    <NavLink exact to="/profil" className="name">{user.user.name}</NavLink>
                    <AiOutlineLogout className="account-icon" onClick={() => user.logout()}/>
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
