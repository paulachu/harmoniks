import { motion } from "framer-motion";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {compose} from "recompose";
import {inject, observer} from "mobx-react"

const SignIn = ({user}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = () => {
        if(!password  || !email)
        {
            document.querySelector(".errormsg").innerHTML= "Please fill the missing fields";
            return;
        }
        else
            document.querySelector(".errormsg").innerHTML= "";
        user.login(email, password).then(res => {
            if (res.failed){
                document.querySelector(".errormsg").innerHTML= res.message;
            } else {
                console.log(res);
                user.history.push("/requests");
            }
        }).catch(err => console.log(err));
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="signin-page">
            <div className="container">
                <h1 className="title">Sign In</h1>
                <div className="wrapper">
                    <div className="form">
                        <div className="box">
                            <label className="title-second">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="john.doe@epita.fr"
                                type="text"
                                className="box-container"
                                required></input>
                        </div>
                        <div className="box">
                            <label className="title-second">Password</label>
                            <input
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                type="password"
                                className="box-container"
                                required></input>
                        </div>
                    </div>
                    <div className="errormsg"></div>
                    <button className="button-submit" onClick={handleLogin}>Sign In</button>
                    <NavLink className="link" exact to="/signup">
                        <button className="button-signup">Sign Up</button>
                    </NavLink>
                </div>
            </div>
        </motion.div>
    );
};

export default compose(inject('user'), observer)(SignIn);
