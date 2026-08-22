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
    <div className="fixed bottom-5 right-5 z-[100] rounded-2xl bg-white/70 p-1 shadow-xl ring-1 ring-slate-900/5 backdrop-blur-xl dark:bg-slate-950/70 dark:ring-white/10">
      <ThemeToggle compact />
    </div>
  );
}