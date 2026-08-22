"use client";

import {
  useEffect,
  useState,
} from "react";

export default function ThemeToggle({
  compact = false,
}) {
  const [dark, setDark] =
    useState(false);

  useEffect(() => {
    function syncTheme() {
      setDark(
        document.documentElement
          .classList
          .contains("dark")
      );
    }

    syncTheme();

    window.addEventListener(
      "solotools-theme-change",
      syncTheme
    );

    return () => {
      window.removeEventListener(
        "solotools-theme-change",
        syncTheme
      );
    };
  }, []);

  function toggleTheme() {
    const next =
      !document.documentElement
        .classList
        .contains("dark");

    document.documentElement
      .classList
      .toggle(
        "dark",
        next
      );

    try {
      localStorage.setItem(
        "solotools-theme",
        next
          ? "dark"
          : "light"
      );
    } catch {
    }

    setDark(next);

    window.dispatchEvent(
      new Event(
        "solotools-theme-change"
      )
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        dark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      title={
        dark
          ? "Light mode"
          : "Dark mode"
      }
      className={`inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-blue-400/50 dark:hover:text-blue-300 ${
        compact
          ? "h-10 w-10"
          : "h-11 w-11"
      }`}
    >
      {dark ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="h-5 w-5"
        >
          <circle
            cx="12"
            cy="12"
            r="4"
            stroke="currentColor"
            strokeWidth="1.8"
          />

          <path
            d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="h-5 w-5"
        >
          <path
            d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}