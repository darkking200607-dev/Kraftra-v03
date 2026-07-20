"use client";

import { useState } from "react";

const colors = [
  { name: "Gold", hex: "#caa24b" },
  { name: "Ivory", hex: "#f4efe6" },
  { name: "Wine", hex: "#8b2f3f" },
  { name: "Emerald", hex: "#2f6b4f" },
  { name: "Sapphire", hex: "#3457a6" },
  { name: "Charcoal", hex: "#7a7a7a" },
];

export default function ShoeCustomizer() {
  const [active, setActive] = useState(colors[0]);

  return (
    <div className="customizer">
      <svg
        className="customizer-shoe"
        viewBox="0 0 300 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 120 C20 100, 30 90, 45 88 C60 86, 65 70, 80 65 C100 58, 110 40, 135 38 C160 36, 175 45, 190 55 C205 65, 215 62, 230 60 C250 58, 265 65, 275 80 C283 92, 282 105, 275 115 C265 128, 240 130, 210 130 L45 130 C30 130, 20 128, 20 120 Z"
          stroke={active.hex}
          fill={active.hex}
          fillOpacity="0.12"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 120 L275 115 C280 122, 278 132, 265 135 L35 135 C22 135, 18 128, 20 120 Z"
          stroke={active.hex}
          fill={active.hex}
          fillOpacity="0.3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M120 55 L145 75 M135 50 L160 72 M150 46 L172 68"
          stroke={active.hex}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>

      <div className="swatches">
        {colors.map((c) => (
          <button
            key={c.hex}
            type="button"
            aria-label={c.name}
            className={`swatch ${active.hex === c.hex ? "active" : ""}`}
            style={{ background: c.hex }}
            onClick={() => setActive(c)}
          />
        ))}
      </div>

      <p className="customizer-color-name">{active.name}</p>
    </div>
  );
}
