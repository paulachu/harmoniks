import React, { useState } from 'react';


const ResumeRequest = () => {
    return (
        <div className="container-resume-request">

            <div className="wrapper-resume-request">
                <div className="resume">
                    <h2>this is my title</h2>

                    <h4> Description :</h4>
                    <label className="text-container"> blabdwai dwua dbuiaw bduiaw dwa dwa dad wa dwa dwa dwadwa
                    </label>
                    
                </div> 

                <div className="skils">
                    <h2>Skils required :</h2>
                    <div className="wrapper-skils">
                        <label className="content-skils">Reactjs</label>
                        <label className="content-skils">Nodejs</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeRequest;