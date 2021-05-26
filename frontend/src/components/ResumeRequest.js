import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { compose } from "recompose";
import { inject, observer } from "mobx-react";
import { Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';



const ResumeRequest = ({user, request, isMine = false, handleDelete}) => {
    const red = {backgroundColor : "#C9846F"};
    const green = {backgroundColor : "#8DB0BA"};

    const [loaded, setLoaded] = useState(false);
    const [discordLink, setDiscordLink] = useState("");
    useEffect(() => {
        console.log('use effect')
        if (! loaded) {
            console.log('not loaded');            
            let tmp = user.getDiscordToken(request.id).then(res => {
                console.log(res);
                setDiscordLink(res);
                setLoaded(true);
            }).catch(err => {
                console.log(err);
            });
            console.log(tmp);
            console.log('done');
        }
    },[loaded])

    return (
        <div className="container-resume-request">
            {
                isMine &&
                <AiOutlineDelete className="delete-btn" onClick={() => handleDelete()}/>
            }
            <div className="wrapper-resume-request">
                <div className="resume">
                    <h2 className="title">{request.title}</h2>

                    <h4 className="title"> Description :</h4>
                    <label className="text-container"> {request.description}
                    </label>
                </div>
                <div className="status">
                    <label style={request.user_from.debt < 0 ? red : green} className="content-status">{request.user_from.debt}</label>
                </div>

                <div className="skils">
                    <h2 className="title">Skils required :</h2>
                    <div className="wrapper-skils">
                        {
                            request.skills.map((skill) => (
                                <label className="content-skils">
                                    {skill.tags}
                                </label>
                            ))
                        }
                    </div>
                </div>

                <div className="join-discord">
                    <a href={discordLink} target="_blank" rel="noreferrer" >
                        <img src="/logos/discordLogo.png" className="logo-image"></img>
                    </a>
                </div>

                <Link to={`/profil?${request.user_from.id}`} className="user">
                    <img src="/logos/userImg.jpeg" className="user-image"></img>
                    <label className="textbot">{request.user_from.full_name}</label>
                </Link>
            </div>
        </div>
    );
};

export default compose(inject("user"), observer)(ResumeRequest);