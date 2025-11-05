import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

export function MagneticButton({ children, className = "", ...rest }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }>) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  const translateX = useTransform(springX, (v) => `${v}px`);
  const translateY = useTransform(springY, (v) => `${v}px`);

  function onMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.3);
    y.set(dy * 0.3);
  }
  function onMouseLeave() {
    x.set(0); y.set(0);
  }

  return (
    <motion.button
      {...rest}
      className={className}
      style={{ translateX, translateY }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.button>
  );
}
