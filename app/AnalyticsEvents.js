"use client";

import { useEffect } from "react";

const calculatorPaths = new Set([
  "/freelance-hourly-rate-calculator/",
  "/project-price-calculator/",
  "/freelance-income-calculator/",
  "/salary-to-hourly-calculator/",
  "/percentage-calculator/",
  "/discount-calculator/",
  "/profit-margin-calculator/",
  "/loan-calculator/",
  "/age-calculator/",
  "/date-difference-calculator/",
  "/vat-calculator/",
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

const textToolPaths = new Set([
  "/word-counter/",
  "/character-counter/",
  "/case-converter/",
]);

const developerToolPaths = new Set([
  "/json-formatter/",
  "/url-encoder-decoder/",
  "/base64-encoder-decoder/",
  "/uuid-generator/",
  "/qr-code-generator/",
]);

export default function AnalyticsEvents() {
  useEffect(() => {
    function detectToolType(path) {
      if (
        calculatorPaths.has(path)
      ) {
        return "calculator";
      }

      if (
        imageToolPaths.has(path)
      ) {
        return "image";
      }

      if (
        pdfToolPaths.has(path)
      ) {
        return "pdf";
      }

      if (
        textToolPaths.has(path)
      ) {
        return "text";
      }

      if (
        developerToolPaths.has(path)
      ) {
        return "developer";
      }

      return null;
    }

    function trackToolUse(event) {
      const target =
        event.target;

      const inputEvent =
        target instanceof
          HTMLInputElement ||
        target instanceof
          HTMLSelectElement ||
        target instanceof
          HTMLTextAreaElement;

      const buttonEvent =
        target instanceof
          Element &&
        Boolean(
          target.closest(
            "button"
          )
        );

      if (
        !inputEvent &&
        !buttonEvent
      ) {
        return;
      }

      const path =
        window.location.pathname;

      const toolType =
        detectToolType(path);

      if (!toolType) {
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
      trackToolUse,
      true
    );

    document.addEventListener(
      "click",
      trackToolUse,
      true
    );

    return () => {
      document.removeEventListener(
        "change",
        trackToolUse,
        true
      );

      document.removeEventListener(
        "click",
        trackToolUse,
        true
      );
    };
  }, []);

  return null;
}
