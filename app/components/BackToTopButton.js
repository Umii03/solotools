"use client";

import {
  useEffect,
  useState,
} from "react";

export default function BackToTopButton() {
  const [visible, setVisible] =
    useState(false);

  useEffect(() => {
    function updateVisibility() {
      setVisible(
        window.scrollY > 500
      );
    }

    updateVisibility();

    window.addEventListener(
      "scroll",
      updateVisibility,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateVisibility
      );
    };
  }, []);

  function goToTop() {
    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior:
        reduceMotion
          ? "auto"
          : "smooth",
    });
  }

  return (
    <button
      type="button"
      aria-label="Back to top"
      title="Back to top"
      onClick={goToTop}
      className={`fixed bottom-5 right-4 z-[110] flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white/85 text-slate-700 shadow-xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-slate-950/85 dark:text-slate-200 dark:hover:border-blue-400/40 dark:hover:text-blue-300 sm:right-5 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-5 w-5"
      >
        <path
          d="m6 14 6-6 6 6"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M12 8v11"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}