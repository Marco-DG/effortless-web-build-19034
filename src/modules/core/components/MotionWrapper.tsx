import React from 'react';
import { motion } from 'framer-motion';

interface MotionWrapperProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

export const MotionWrapper: React.FC<MotionWrapperProps> = ({
    children,
    delay = 0,
    className = ""
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1], // Custom cubic bezier for "premium" feel
                delay: delay
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
