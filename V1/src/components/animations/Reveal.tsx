import { motion, Variants } from "framer-motion";
import { PropsWithChildren } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Reveal({ children, delay = 0 }: PropsWithChildren<{ delay?: number }>) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20%" }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
