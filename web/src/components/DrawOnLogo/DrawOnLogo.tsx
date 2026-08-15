"use client";

import { useEffect, useState } from "react";

interface DrawOnLogoProps {
  src: string;
  className?: string;
  label?: string;
}

// Fetches an SVG and inlines it so its paths can be styled/animated with CSS
// (stroke line-drawing needs the <path> elements in the DOM, not an <img>/next/image src).
// Each path's stagger delay is baked into the SVG file as a --i custom property.
export function DrawOnLogo({ src, className, label = "Logo" }: DrawOnLogoProps) {
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then(setSvgMarkup)
      .catch(() => {});
  }, [src]);

  return (
    <div
      role="img"
      aria-label={label}
      className={`draw-on-logo text-[#1272CC] dark:text-[#9379cc] ${className ?? ""}`}
      dangerouslySetInnerHTML={svgMarkup ? { __html: svgMarkup } : undefined}
    />
  );
}
