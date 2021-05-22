import { motion } from "framer-motion";
import React from "react";
import { NavLink } from "react-router-dom";
import {compose} from "recompose";
import {inject, observer} from "mobx-react";

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [cpass, setCPassl] = useState("");
    const [skills, setSkills] = useState("");
    const [photo, setPhoto] = useState(null);

    const handleSignUp = (e) => {
        e.preventDefault();
        console.log(e.target);
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="signup">
            <div className="form-wrapper">
                <h1>Join Us</h1>
                <form onSubmit={e => handleSignUp(e)}>
                    <div className="name">
                        <label htmlFor="name">Name</label>
                        <br />
                        <input
                            type="text"
                            id="name"
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
                            placeholder="At least 6 characteres"
                            required
                        />
                    </div>
                    <div className="confirm-password">
                        <label htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        <br />
                        <input type="password" id="confirm-password" required />
                    </div>
                    <div className="competences">
                        <label htmlFor="competences">Skills</label>
                        <br />
                        <input
                            type="text"
                            id="competences"
                            placeholder="NodeJs ..."
                        />
                    </div>
                    <div className="photo">
                        <label htmlFor="photo">Add a Photo</label>
                        <br />
                        <input type="file" id="photo" />
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
