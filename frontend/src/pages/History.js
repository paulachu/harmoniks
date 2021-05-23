import { motion } from 'framer-motion';
import React from 'react';

const History = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="history">
            
        </motion.div>
    );
};

export default History;