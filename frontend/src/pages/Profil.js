import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { compose } from "recompose";
import { inject, observer } from "mobx-react";
import { useHistory } from 'react-router-dom';


const Profil = ({ user , match}) => {
    const [page, setpage] = useState(1);
    const changePage = (e) => {
        setpage(e);
    };
    
    const [loaded, setLoaded] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    useEffect(() => {
        if (!loaded) {
            let id = window.location.search;
            if (id)
            {
                const id_final = id.slice(1);
                console.log(id_final);
                user.getUser(id_final).then((res) => {
                    setUserProfile({...res});
                    setLoaded(true);
                    user.user.visit = null;
                });
            }
            else
            {
                user.getProfile().then((res) => {
                    setLoaded(true);
                    setUserProfile({ ...res });
                });
            }
        }
    }, [loaded]);

    if (userProfile)
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="profil">
                <div className="banner">
                    <div>
                        <div className="div_img_profil">
                            <img
                                src="https://i.pinimg.com/originals/57/46/4b/57464be6ba5d2c040d56ae928eb977a5.png"
                                width="150px"
                                height="150px"
                                className="img-profile"></img>
                        </div>
                        <p className="debt">Debt: {userProfile.debt}</p>
                        <div className="profil_button_group">
                            <button
                                className={ page === 1 ? "button_profile active" : "button_profile"}
                                onClick={(e) => changePage(1)}>
                                Personal data
                            </button>
                            <button
                                className={page === 2 ? "button_profile active" : "button_profile"}
                                onClick={(e) => changePage(2)}>
                                Social network
                            </button>
                        </div>
                    </div>
                </div>
                {page === 1 ? (
                    <div className="profil_info">
                        <div className="infos">
                            <p className="single-profile-info">
                                <strong>Full name</strong>
                                <br />
                                {userProfile.full_name}
                            </p>
                            <p className="single-profile-info">
                                <strong>Email</strong>
                                <br />
                                {userProfile.email}
                            </p>
                            <p className="single-profile-info">
                                <strong>School</strong>
                                <br />
                                {userProfile.school.name}
                            </p>
                        </div>
                        <div className="skills">
                            <p className="skills_title">
                                <strong>Skills</strong>
                            </p>
                            <div className="skills_list">
                                {userProfile.skills.map((skill) => (
                                    <div className="skills_item">
                                        {skill.tags}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="profil_info">
                        <div className="infos">
                            <p className="single-profile-info">
                                <img
                                    width="100px"
                                    src="/logos/discord_logo.png"></img>
                                <br />
                                {userProfile.discord_id}
                            </p>
                            <p className="single-profile-info">
                                <a href={userProfile.linkedin_link}
                                   target="_blank" rel="noreferrer">
                                <img
                                    width="100px"
                                    src="/logos/linkedin_logo.png"></img>
                                <br />
                                LinkedIn
                                </a>
                            </p>
                            <p className="single-profile-info">
                                <a href={userProfile.hopper_link} target="_blank" rel="noreferrer">
                                    <img
                                        width="100px"
                                        src="/logos/hopper_logo.png"></img>
                                    <br/>
                                    Hopper
                                </a>
                            </p>
                        </div>
                    </div>
                )}
            </motion.div>
        );
    return <div>No</div>;
};

export default compose(inject("user"), observer)(Profil);
