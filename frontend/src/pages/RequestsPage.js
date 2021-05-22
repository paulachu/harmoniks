import React, { useState } from "react";
import InputTags from "../components/InputTags";
import AskRequest from "../components/AskRequest";
import ResumeRequest from "../components/ResumeRequest";
import { motion } from "framer-motion";

const RequestsPage = () => {
    const [askRequest, setaskRequest] = useState([]);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="requestsPage">
            <AskRequest />
            <ResumeRequest />
            <ResumeRequest />
        </motion.div>
    );
};

export default RequestsPage;
