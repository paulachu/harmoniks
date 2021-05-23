import { motion } from "framer-motion";
import { inject, observer } from "mobx-react";
import React, { useState } from "react";
import { useEffect } from "react";
import compose from "recompose/compose";
import ResumeRequest from "../components/ResumeRequest";
import AskRequest from "../components/AskRequest";

const History = ({ user }) => {
    const [loaded, setLoaded] = useState(false);
    const [requests, setRequests] = useState([]);
    const [myRequest, setMyRequest] = useState(null);

    useEffect(() => {
        if (!loaded) {
            // Get MyRequest
            user.getMyRequest().then((res) => {
                setRequests(res.filter(e => e.status === 1));
                setMyRequest(res.find((e) => e.status === 0));
                // Set Loaded to true
                setLoaded(true);
            });
        }
    }, [loaded]);

    const handleNewRequest = (request) => {
        setMyRequest(request);
    };
    const handleDelete = () => {
        user.deleteRequest();
        setMyRequest(null);
    }

    return (
        <motion.div className="history"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="history">
            {!myRequest && <AskRequest handleNewRequest={handleNewRequest} />}
            {myRequest && <ResumeRequest request={myRequest} isMine={true} handleDelete={handleDelete}/>}
            {requests.map((request) => {
                return <ResumeRequest request={request} />;
            })}
        </motion.div>
    );
};

export default compose(inject("user"), observer)(History);
