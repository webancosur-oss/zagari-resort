"use client";

import {
  DownloadSimple,
  FilePdf,
} from "@phosphor-icons/react";

import type {
  ReactNode,
} from "react";

import styles from "./BrochureViewer.module.css";

type BrochureViewerProps = {
  children?: ReactNode;
  triggerClassName?: string;
};

const PDF_URL =
  "/assets/docs/zagari-brochure.pdf";

export default function BrochureViewer({
  children,
  triggerClassName,
}: BrochureViewerProps) {
  return (
    <a
      href={PDF_URL}
      download="Zagari-Resort-Club-Brochure.pdf"
      className={
        triggerClassName ||
        styles.downloadButton
      }
      aria-label="Descargar brochure de Zagari Resort Club"
    >
      {children ?? (
        <>
          <FilePdf
            size={17}
            weight="regular"
            aria-hidden="true"
          />

          <span>
            Descargar brochure
          </span>

          <span
            className={
              styles.icon
            }
            aria-hidden="true"
          >
            <DownloadSimple
              size={16}
              weight="bold"
            />
          </span>
        </>
      )}
    </a>
  );
}