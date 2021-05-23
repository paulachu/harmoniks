import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

const ResumeRequest = ({request, isMine = false, handleDelete}) => {
    var statusValue = 1;
    const red = {backgroundColor : "#C9846F"};
    const green = {backgroundColor : "#8DB0BA"};
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
                    <label style={statusValue < 0 ? red : green} className="content-status">{statusValue}</label>
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
                    <a href={request.discordLink} target="_blank" rel="noreferrer">
                        <img src="/logos/discordLogo.png" className="logo-image"></img>
                    </a>
                </div>

                <div className="user">
                    <img src="/logos/userImg.jpeg" className="user-image"></img>
                    <label className="textbot">{request.user_from.full_name}</label>
                </div>
            </div>
        </div>
    );
};

export default ResumeRequest;