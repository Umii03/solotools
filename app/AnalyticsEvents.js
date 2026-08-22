"use client";

import { useEffect } from "react";

const calculatorPaths = new Set([
  "/freelance-hourly-rate-calculator/",
  "/project-price-calculator/",
  "/freelance-income-calculator/",
  "/salary-to-hourly-calculator/",
]);

const imageToolPaths = new Set([
  "/image-converter/",
  "/jpg-to-png/",
  "/png-to-jpg/",
  "/jpg-to-webp/",
  "/png-to-webp/",
  "/webp-to-jpg/",
  "/webp-to-png/",
  "/image-compressor/",
  "/image-resizer/",
]);

const pdfToolPaths = new Set([
  "/merge-pdf/",
  "/split-pdf/",
  "/extract-pdf-pages/",
  "/rotate-pdf/",
  "/reorder-pdf-pages/",
  "/pdf-page-counter/",
  "/images-to-pdf/",
  "/jpg-to-pdf/",
  "/png-to-pdf/",
]);

export default function AnalyticsEvents() {
  useEffect(() => {
    function handleInteraction(event) {
      const target =
        event.target;

      const isUsefulInput =
        target instanceof
          HTMLInputElement ||
        target instanceof
          HTMLSelectElement ||
        target instanceof
          HTMLTextAreaElement;

      if (!isUsefulInput) {
        return;
      }

      const path =
        window.location.pathname;

      let toolType = null;

      if (
        calculatorPaths.has(path)
      ) {
        toolType =
          "calculator";

      } else if (
        imageToolPaths.has(path)
      ) {
        toolType =
          "image";

      } else if (
        pdfToolPaths.has(path)
      ) {
        toolType =
          "pdf";

      } else {
        return;
      }

      const sessionKey =
        `solotools_tool_used:${path}`;

      try {
        if (
          sessionStorage.getItem(
            sessionKey
          )
        ) {
          return;
        }
      } catch {
      }

      if (
        typeof window.gtag !==
        "function"
      ) {
        return;
      }

      window.gtag(
        "event",
        "tool_used",
        {
          tool_type:
            toolType,
          tool_path:
            path,
        }
      );

      if (
        toolType ===
        "calculator"
      ) {
        window.gtag(
          "event",
          "calculator_used",
          {
            tool_path:
              path,
          }
        );
      }

      try {
        sessionStorage.setItem(
          sessionKey,
          "1"
        );
      } catch {
      }
    }

    document.addEventListener(
      "change",
      handleInteraction,
      true
    );

    return () => {
      document.removeEventListener(
        "change",
        handleInteraction,
        true
      );
    };
  }, []);

  return null;
}
