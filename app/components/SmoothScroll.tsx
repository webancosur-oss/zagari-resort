"use client";

import {
  ReactLenis,
} from "lenis/react";
import type {
  ReactNode,
} from "react";

import "lenis/dist/lenis.css";

type SmoothScrollProps = {
  children: ReactNode;
};

export default function SmoothScroll({
  children,
}: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.15,

        smoothWheel: true,

        wheelMultiplier: 0.85,

        touchMultiplier: 1,

        syncTouch: false,

        anchors: {
          offset: 0,
          duration: 1.2,
        },

        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}