import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { compose } from "recompose";
import { inject, observer } from "mobx-react";
const Profil = ({ user }) => {
    const [page, setpage] = useState(1);
    const changePage = (e) => {
        setpage(e);
    };

    const [loaded, setLoaded] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        if (!loaded) {
            user.getProfile().then((res) => {
                setLoaded(true);
                setUserProfile({ ...res });
            });
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
                                src="data:image/jpeg;base64,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"
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
                                <img
                                    width="100px"
                                    src="/logos/linkedin_logo.png"></img>
                                <br />
                                <a href={userProfile.linkedin_link}
                                   target="_blank" rel="noreferrer">
                                    {userProfile.linkedin_link}
                                </a>
                            </p>
                            <p className="single-profile-info">
                                <img
                                    width="100px"
                                    src="/logos/hopper_logo.png"></img>
                                <br />
                                <a href={userProfile.hopper_link} target="_blank" rel="noreferrer">
                                    {userProfile.hopper_link}
                                </a>
                            </p>
                        </div>
                    </div>
                )}
            </motion.div>
        );
    return <></>;
};

export default compose(inject("user"), observer)(Profil);
