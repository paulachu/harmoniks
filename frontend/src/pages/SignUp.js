import { motion } from "framer-motion";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { compose } from "recompose";
import { inject, observer } from "mobx-react";
import { WithContext as ReactTags } from "react-tag-input";

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [cpass, setCPass] = useState("");
    const [tags, setTags] = useState([]);
    const [photo, setPhoto] = useState(null);

    const handleSignUp = (e) => {
        e.preventDefault();
        console.log(photo);
    };



    const createSuggestion = (id, text) => {
        return { id, text };
    };

    const suggestions = useState([
        createSuggestion("1", "NodeJS"),
        createSuggestion("2", "React"),
        createSuggestion("3", "Python"),
        createSuggestion("4", "Cooking"),
        createSuggestion("5", "UXDesign"),
        createSuggestion("6", "Commerce"),
    ])[0];

    const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    };
    const handleAddition = (tag) => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        setTags(newTags);
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
                        <label htmlFor="name">Name</label>
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
                        <label htmlFor="email">Email</label>
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
                    <div className="password">
                        <label htmlFor="password">Password</label>
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
                            Confirm Password
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
                        <label htmlFor="skills" id="skills">Skills</label>
                        <ReactTags
                            tags={tags}
                            suggestions={suggestions}
                            handleDelete={handleDelete}
                            handleAddition={handleAddition}
                            handleDrag={handleDrag}
                            //delimiters={delimiters}
                            inputFieldPosition="bottom"
                        />
                    </div>
                    <div className="photo">
                        <label htmlFor="photo">Add a Photo</label>
                        <br />
                        <input
                            type="file"
                            onChange={(e) => setPhoto(e.target.files[0])}
                            id="photo"
                        />
                    </div>
                    <div className="submit">
                        <button type="submit" id="submit">
                            Sign Up
                        </button>
                    </div>
                </form>
                <NavLink className="link" exact to="/signin">
                    <button className="signin-btn">Sign In</button>
                </NavLink>
            </div>
        </motion.div>
    );
};

export default compose(inject("user"), observer)(SignUp);
