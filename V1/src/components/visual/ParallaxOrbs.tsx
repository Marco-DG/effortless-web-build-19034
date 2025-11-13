import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxOrbs() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.3, 0.2]);

  return (
    <div className="hidden md:block pointer-events-none absolute inset-0 -z-0 overflow-hidden">
      <motion.div
        style={{ y: y1, opacity, background: "radial-gradient(200px 200px at center, hsl(var(--primary)/0.15), transparent 60%)" }}
        className="absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full"
        aria-hidden
      />
      <motion.div
        style={{ y: y2, opacity, background: "radial-gradient(260px 260px at center, hsl(var(--secondary)/0.12), transparent 60%)" }}
        className="absolute top-1/3 -left-24 h-[520px] w-[520px] rounded-full"
        aria-hidden
      />
    </div>
  );
}
