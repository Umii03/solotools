"use client";

import { useEffect } from "react";

export default function AnalyticsEvents() {
  useEffect(() => {
    const handleChange = (event) => {
      const target = event.target;

      if (
        !(target instanceof HTMLInputElement) &&
        !(target instanceof HTMLSelectElement)
      ) {
        return;
      }

      const path = window.location.pathname;

      if (!path.includes("calculator")) {
        return;
      }

      const storageKey = `solotools-calculator-used:${path}`;

      if (sessionStorage.getItem(storageKey)) {
        return;
      }

      sessionStorage.setItem(storageKey, "1");

      if (typeof window.gtag === "function") {
        window.gtag("event", "calculator_used", {
          calculator_path: path,
        });
      }
    };

    document.addEventListener("change", handleChange, true);

    return () => {
      document.removeEventListener("change", handleChange, true);
    };
  }, []);

  return null;
}
