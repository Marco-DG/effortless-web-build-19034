import { useEffect, useRef } from "react";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current!;
    const isCoarse = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    const isSmall = window.matchMedia && window.matchMedia("(max-width: 767px)").matches;
    if (isCoarse || isSmall) return; // disable on touch/small screens
    function onMove(e: MouseEvent) {
      const x = e.clientX - 150;
      const y = e.clientY - 150;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="hidden md:block pointer-events-none fixed top-0 left-0 z-[1] h-[300px] w-[300px] rounded-full"
      style={{
        background:
          "radial-gradient(150px 150px at center, hsl(var(--primary)/0.18), transparent 60%)",
        transform: "translate3d(-1000px, -1000px, 0)",
        filter: "blur(30px)",
      }}
    />
  );
}
