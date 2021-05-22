import { motion } from 'framer-motion';
import React from 'react';

const Presentation = () => {
    return (
        <motion.div className="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
                <h1 className="title">Do me a favour</h1>
                <h3 className="title">Made by Harmoniks</h3>
        </motion.div>
    );
};

export default Presentation;