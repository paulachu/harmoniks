import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { compose } from "recompose";
import { inject, observer } from "mobx-react";
import {imageToBase64} from "image-to-base64";

import InputTags from "../components/InputTags";

const SignUp = ({ user }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [cpass, setCPass] = useState("");
    const [tags, setTags] = useState([]);
    const [linkedin, setLinkedin] = useState("");
    const [hooper, setHooper] = useState("");
    const [discord, setDiscord] = useState("");
    const [photo, setPhoto] = useState(null);

    const handleSignUp = (e) => {
        e.preventDefault();
        const tag_res = [];
        tags.forEach((tag) => tag_res.push(tag.tags));
        const body = {
            "email" : email,
            "skills": tag_res,
            "picture": photo,
            "linkedin_link": linkedin,
            "hopper_link": hooper,
            "discord_id": discord,
            "full_name": name,
            "password":pass
        };
        user.signUp(body).then((res) => {
            if (!res.failed) {
                user.history.push("/requests");
            } else {
                document.querySelector(".errormsg").innerHTML = res.message;
                setTags([]);
            }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="signup">
            <div className="form-wrapper">
                <h1>Join Us</h1>
                <form onSubmit={(e) => handleSignUp(e)}>
                    <div className="name">
                        <label htmlFor="name">Name*</label>
                        <br />
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div className="email">
                        <label htmlFor="email">Email* </label>
                        <br />
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john.doe@socity.fr"
                            required
                        />
                    </div>
                    <div className="discord">
                        <label htmlFor="discord">Discord*</label>
                        <br />
                        <input
                            type="text"
                            id="discord"
                            value={discord}
                            onChange={(e) => setDiscord(e.target.value)}
                            placeholder="JohnDoe#1042"
                            required
                        />
                    </div>
                    <div className="linkedIn">
                        <label htmlFor="linkedIn">LinkedIn</label>
                        <br />
                        <input
                            type="text"
                            id="linkedIn"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            placeholder="http://linkedin.com/in/john-doe"
                        />
                    </div>
                    <div className="hooper">
                        <label htmlFor="hooper">Hopper</label>
                        <br />
                        <input
                            type="text"
                            id="hooper"
                            value={hooper}
                            onChange={(e) => setHooper(e.target.value)}
                            placeholder="http://hooper.com/in/john-doe"
                        />
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password*</label>
                        <br />
                        <input
                            type="password"
                            id="password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            placeholder="At least 6 characteres"
                            required
                        />
                    </div>
                    <div className="confirm-password">
                        <label htmlFor="confirm-password">
                            Confirm Password*
                        </label>
                        <br />
                        <input
                            value={cpass}
                            onChange={(e) => setCPass(e.target.value)}
                            type="password"
                            id="confirm-password"
                            required
                        />
                    </div>
                    <div className="skills">
                        <label htmlFor="skills" id="skills">
                            Skills
                        </label>
                        <InputTags
                            tags={tags}
                            setTags={setTags}
                            limitedToSuggestions={false}
                        />
                    </div>
                    <div className="photo">
                        <label htmlFor="photo">Add a Photo</label>
                        <br />
                        <input
                            accept="image/png"
                            type="file"
                            onChange={(e) => {
                                setPhoto((e.target.files[0]))
                            }}
                            id="photo"
                        />
                    </div>
                    <div>
                        <div className="errormsg"></div>
                        <div className="btns">
                            <div className="submit">
                                <button type="submit" id="submit">
                                    Sign Up
                                </button>
                            </div>
                            <NavLink className="link" exact to="/signin">
                                <button className="signin-btn">Sign In</button>
                            </NavLink>
                        </div>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default compose(inject("user"), observer)(SignUp);
