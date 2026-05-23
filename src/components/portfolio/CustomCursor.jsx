import { useState, useEffect } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const mv = (e) => { setPos({ x: e.clientX, y: e.clientY }); setActive(true); };
    const lv = () => setActive(false);
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseleave", lv);
    return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseleave", lv); };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        className="fixed z-[9999] pointer-events-none rounded-full bg-cyan mix-blend-screen"
        style={{
          width: 5, height: 5,
          left: pos.x - 2.5, top: pos.y - 2.5,
          opacity: active ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      />
      {/* Ring */}
      <div
        className="fixed z-[9998] pointer-events-none rounded-full border border-cyan/40"
        style={{
          width: 28, height: 28,
          left: pos.x - 14, top: pos.y - 14,
          opacity: active ? 1 : 0,
          transition: "opacity 0.2s, left 0.08s, top 0.08s",
        }}
      />
    </>
  );
}