import { useEffect, useState } from "react";

const KEY = "reducedEffects";

export function useReducedEffects() {
  const [enabled, setEnabled] = useState<boolean>(() => {
    try { return localStorage.getItem(KEY) === "1"; } catch { return false; }
  });

  useEffect(() => {
    try {
      if (enabled) {
        document.documentElement.classList.add("reduced-effects");
        localStorage.setItem(KEY, "1");
      } else {
        document.documentElement.classList.remove("reduced-effects");
        localStorage.removeItem(KEY);
      }
    } catch {}
  }, [enabled]);

  return { enabled, setEnabled };
}
