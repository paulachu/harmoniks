import React, { useState } from 'react';


const ResumeRequest = () => {
    var statusValue = 1;
    const red = {backgroundColor : "#C9846F"};
    const green = {backgroundColor : "#8DB0BA"};
    return (
        <div className="container-resume-request">

            <div className="wrapper-resume-request">
                <div className="resume">
                    <h2 className="title">this is my title</h2>

                    <h4 className="title"> Description :</h4>
                    <label className="text-container"> blabdwai dwua dbuiaw bduiaw dwa dwa dad wa dwa dwa dwadwa
                    </label>
                    
                </div> 
                
                <div className="status">
                    <label style={statusValue < 0 ? red : green} className="content-status">{statusValue}</label>
                </div>

                <div className="skils">
                    <h2 className="title">Skils required :</h2>
                    <div className="wrapper-skils">
                        <label className="content-skils">Reactjs</label>
                        <label className="content-skils">Nodejs</label>
                    </div>
                </div>

                <div className="join-discord">
                    <img src="/logos/discordLogo.png" className="logo-image"></img>
                </div>

                <div className="user">
                    <img src="/logos/userImg.jpeg" className="user-image"></img>
                    <label className="textbot">Joe Blein</label>
                </div>
            </div>
        </div>
    );
};

export default ResumeRequest;