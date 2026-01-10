

import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";

export function LoadingProgress() {
  return (
    <ProgressSpinner
      style={{
        width: "50px",
        height: "50px",
        position: "absolute",
        bottom: 16,          // distance from bottom
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
      }}
      strokeWidth="8"
      fill="var(--surface-ground)"
      animationDuration=".5s"
    />
  );
}