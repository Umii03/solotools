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
  "/compress-pdf/",
  "/pdf-to-jpg/",
  "/pdf-to-png/",
  "/remove-pdf-pages/",
  "/add-page-numbers/",
  "/watermark-pdf/",
  "/crop-pdf/",
  "/organize-pdf/",
  "/sign-pdf/",
  "/pdf-metadata-editor/",
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
    function toolType(path) {
      if (calculatorPaths.has(path)) return "calculator";
      if (imageToolPaths.has(path)) return "image";
      if (pdfToolPaths.has(path)) return "pdf";
      if (textToolPaths.has(path)) return "text";
      if (developerToolPaths.has(path)) return "developer";

      return null;
    }

    function handle(event) {
      const target =
        event.target;

      const input =
        target instanceof HTMLInputElement ||
        target instanceof HTMLSelectElement ||
        target instanceof HTMLTextAreaElement;

      const button =
        target instanceof Element &&
        Boolean(
          target.closest("button")
        );

      if (!input && !button) {
        return;
      }

      const path =
        window.location.pathname;

      const type =
        toolType(path);

      if (!type) {
        return;
      }

      const key =
        `solotools_tool_used:${path}`;

      try {
        if (
          sessionStorage.getItem(key)
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
          tool_type: type,
          tool_path: path,
        }
      );

      if (
        type === "calculator"
      ) {
        window.gtag(
          "event",
          "calculator_used",
          {
            tool_path: path,
          }
        );
      }

      try {
        sessionStorage.setItem(
          key,
          "1"
        );
      } catch {
      }
    }

    document.addEventListener(
      "change",
      handle,
      true
    );

    document.addEventListener(
      "click",
      handle,
      true
    );

    return () => {
      document.removeEventListener(
        "change",
        handle,
        true
      );

      document.removeEventListener(
        "click",
        handle,
        true
      );
    };
  }, []);

  return null;
}