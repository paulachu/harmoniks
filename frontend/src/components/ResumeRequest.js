import React, { useState } from 'react';

const ResumeRequest = () => {
    return (
        <div className="container-resume-request">
            <div className="wrapper-resume-request">
                <div className="resume">
                    <div className="resume-in">
                        <h4 className="content-h4"> Title :</h4>
                        <label className="box-container"> My Title</label>
                    </div>
                    <div className="resum-in">
                        <h4 className="content-desc-1"> Descrition:</h4>
                    </div>
                    <div className="resum-in">
                        <h4 className="content-desc-1"> Skils :</h4>
                    </div>
                </div>   
            </div>
        </div>
    );
};

export default ResumeRequest;