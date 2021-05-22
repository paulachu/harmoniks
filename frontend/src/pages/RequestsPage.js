import React from 'react';

const RequestsPage = () => {
    return (
        <div className="requestsPage">
            <div className="container-request">   
                <div className="wrapper-1">
                    <div className="content-name"> 
                        <h2>Need help ?</h2>
                    </div>
                    <div className="content-title">
                        <h3>Mon titre</h3>
                    </div>
                    <div className="content-comp"> comp</div>
                    <div className="content-desc">
                        <h4 className="content-desc-1"> Description :</h4>
                        <input
                                placeholder="Details your problem"
                                type="text"
                                className="box-container"
                                required>
                        </input>
                    </div>
                    <div className="content-add"> add</div>
                </div>
            </div>
            <div className="container-request"></div>
            <div className="container-request"></div>
            <div className="container-request"></div>
            <div className="container-request"></div>
            <div className="container-request"></div>
            <div className="container-request"></div>
            <div className="container-request"></div>
            <div className="container-request"></div>
            <div className="container-request"></div>
            <div className="container-request"></div>
            <div className="container-request"></div>
        </div>
    );
};

export default RequestsPage;