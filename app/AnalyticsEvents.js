"use client";

import {
  useEffect,
} from "react";

import {
  toolPathTypeMap,
} from "./lib/toolRegistry";

export default function AnalyticsEvents() {
  useEffect(() => {
    function handle(event) {
      const target =
        event.target;

      const isInput =
        target instanceof
          HTMLInputElement ||
        target instanceof
          HTMLSelectElement ||
        target instanceof
          HTMLTextAreaElement;

      const isButton =
        target instanceof
          Element &&
        Boolean(
          target.closest(
            "button"
          )
        );

      if (
        !isInput &&
        !isButton
      ) {
        return;
      }

      const path =
        window.location.pathname;

      const type =
        toolPathTypeMap[
          path
        ];

      if (!type) {
        return;
      }

      const key =
        `solotools_tool_used:${path}`;

      try {
        if (
          sessionStorage.getItem(
            key
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
            type,
          tool_path:
            path,
        }
      );

      if (
        type ===
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