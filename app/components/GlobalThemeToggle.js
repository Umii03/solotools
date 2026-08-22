"use client";

import {
  useEffect,
  useState,
} from "react";

import ThemeToggle from "./ThemeToggle";

export default function GlobalThemeToggle() {
  const [show, setShow] =
    useState(false);

  useEffect(() => {
    setShow(
      window.location.pathname !== "/"
    );
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed right-4 top-20 z-[110] rounded-2xl bg-white/80 p-1 shadow-xl ring-1 ring-slate-900/5 backdrop-blur-xl dark:bg-slate-950/80 dark:ring-white/10 sm:right-5">
      <ThemeToggle compact />
    </div>
  );
}