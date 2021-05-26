import React, { useEffect, useState } from "react";
import AskRequest from "../components/AskRequest";
import ResumeRequest from "../components/ResumeRequest";
import { motion } from "framer-motion";
import compose from "recompose/compose";
import { inject, observer } from "mobx-react";

const RequestsPage = ({ user }) => {
    const [loaded, setLoaded] = useState(false);
    const [requests, setRequests] = useState([]);
    const [myRequest, setMyRequest] = useState(null);
    useEffect(() => {
        if (!loaded) {
            // Get All request in resquests
            user.getAllRequests().then((res) => {
                // Get MyRequest
                user.getMyRequest().then((res_bis) => {
                    const my_elt = res_bis.find((e) => e.status === 0); 
                    setMyRequest(my_elt);
                    if (my_elt)
                        setRequests(res.filter(e => e.id !== my_elt.id));
                    else
                        setRequests(res);
                });
            });
            // Set Loaded to true
            setLoaded(true);
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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="requestsPage">
            {!myRequest && <AskRequest handleNewRequest={handleNewRequest}/>}
            {myRequest && <ResumeRequest request={myRequest} isMine={true} handleDelete={handleDelete}/>}
            {requests.map((request) => {
                return <ResumeRequest request={request} />;
            })}
        </motion.div>
    );
};

export default compose(inject("user"), observer)(RequestsPage);
