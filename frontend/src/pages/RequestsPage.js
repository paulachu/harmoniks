import React, {useState} from 'react';
import InputTags from "../components/InputTags";
import AskRequest from "../components/AskRequest";
import ResumeRequest from "../components/ResumeRequest";

const RequestsPage = () => {
    const [askRequest, setaskRequest] = useState([]);
    return (
        <div className="requestsPage">
            <AskRequest/>
            <ResumeRequest/>
            <ResumeRequest/>
        </div>
    );
};

export default RequestsPage;