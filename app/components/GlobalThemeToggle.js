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
    <div className="pointer-events-none absolute left-1/2 top-[14px] z-[110] w-full max-w-7xl -translate-x-1/2 px-5 sm:px-6">
      <div className="flex justify-end">
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}