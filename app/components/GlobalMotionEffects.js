"use client";

import {
  useEffect,
  useRef,
} from "react";

export default function GlobalMotionEffects() {
  const cursorRef =
    useRef(null);

  const progressRef =
    useRef(null);

  useEffect(() => {
    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    const finePointer =
      window.matchMedia(
        "(pointer: fine)"
      ).matches;

    const progress =
      progressRef.current;

    const cursor =
      cursorRef.current;

    let frame = null;

    function updateProgress() {
      if (!progress) {
        return;
      }

      const maximum =
        Math.max(
          1,
          document.documentElement.scrollHeight -
            window.innerHeight
        );

      const amount =
        Math.min(
          1,
          Math.max(
            0,
            window.scrollY /
              maximum
          )
        );

      progress.style.transform =
        `scaleX(${amount})`;
    }

    updateProgress();

    window.addEventListener(
      "scroll",
      updateProgress,
      {
        passive: true,
      }
    );

    if (reduceMotion) {
      return () => {
        window.removeEventListener(
          "scroll",
          updateProgress
        );
      };
    }

    document.documentElement
      .classList
      .add(
        "st-motion-enabled"
      );

    /*
      Section reveals.
      Anything already visible stays visible,
      so there is no hero flash.
    */

    const sections =
      [
        ...document.querySelectorAll(
          "main > section"
        ),
      ];

    const observer =
      new IntersectionObserver(
        (entries) => {
          for (
            const entry of
            entries
          ) {
            if (
              entry.isIntersecting
            ) {
              entry.target
                .classList
                .add(
                  "st-visible"
                );

              observer.unobserve(
                entry.target
              );
            }
          }
        },
        {
          threshold: 0.08,
          rootMargin:
            "0px 0px -5% 0px",
        }
      );

    for (
      const section of
      sections
    ) {
      const bounds =
        section.getBoundingClientRect();

      if (
        bounds.top <
        window.innerHeight *
          0.95
      ) {
        section.classList.add(
          "st-visible"
        );
      } else {
        section.classList.add(
          "st-reveal"
        );

        observer.observe(
          section
        );
      }
    }

    /*
      Give existing internal-page
      link cards a subtle hover lift.
    */

    const cards =
      [
        ...document.querySelectorAll(
          "main a.rounded-2xl, main a.rounded-3xl"
        ),
      ];

    cards.forEach(
      (card) => {
        card.classList.add(
          "st-interactive-card"
        );
      }
    );

    /*
      Mouse spotlight and homepage
      card tilt only on desktop/fine pointer.
    */

    const tiltCards =
      [
        ...document.querySelectorAll(
          ".home-card"
        ),
      ];

    function resetTilt(
      element
    ) {
      element.style.setProperty(
        "--st-rx",
        "0deg"
      );

      element.style.setProperty(
        "--st-ry",
        "0deg"
      );

      element.style.setProperty(
        "--st-shine-x",
        "50%"
      );

      element.style.setProperty(
        "--st-shine-y",
        "50%"
      );

      element.classList.remove(
        "st-tilting"
      );
    }

    function handleTiltMove(
      event
    ) {
      const element =
        event.currentTarget;

      const rect =
        element.getBoundingClientRect();

      const x =
        (
          event.clientX -
          rect.left
        ) /
        rect.width;

      const y =
        (
          event.clientY -
          rect.top
        ) /
        rect.height;

      const rotateY =
        (x - 0.5) * 7;

      const rotateX =
        (0.5 - y) * 7;

      element.style.setProperty(
        "--st-rx",
        `${rotateX}deg`
      );

      element.style.setProperty(
        "--st-ry",
        `${rotateY}deg`
      );

      element.style.setProperty(
        "--st-shine-x",
        `${x * 100}%`
      );

      element.style.setProperty(
        "--st-shine-y",
        `${y * 100}%`
      );

      element.classList.add(
        "st-tilting"
      );
    }

    function handleTiltLeave(
      event
    ) {
      resetTilt(
        event.currentTarget
      );
    }

    if (finePointer) {
      document.documentElement
        .classList
        .add(
          "st-fine-pointer"
        );

      tiltCards.forEach(
        (card) => {
          card.classList.add(
            "st-tilt-card"
          );

          resetTilt(card);

          card.addEventListener(
            "pointermove",
            handleTiltMove
          );

          card.addEventListener(
            "pointerleave",
            handleTiltLeave
          );
        }
      );
    }

    function pointerMove(
      event
    ) {
      if (
        !finePointer ||
        !cursor
      ) {
        return;
      }

      if (frame) {
        cancelAnimationFrame(
          frame
        );
      }

      frame =
        requestAnimationFrame(
          () => {
            cursor.style.transform =
              `translate3d(${
                event.clientX -
                180
              }px, ${
                event.clientY -
                180
              }px, 0)`;

            cursor.classList.add(
              "st-cursor-visible"
            );
          }
        );
    }

    function pointerLeave() {
      if (cursor) {
        cursor.classList.remove(
          "st-cursor-visible"
        );
      }
    }

    if (finePointer) {
      window.addEventListener(
        "pointermove",
        pointerMove,
        {
          passive: true,
        }
      );

      document.addEventListener(
        "mouseleave",
        pointerLeave
      );
    }

    return () => {
      observer.disconnect();

      window.removeEventListener(
        "scroll",
        updateProgress
      );

      if (finePointer) {
        window.removeEventListener(
          "pointermove",
          pointerMove
        );

        document.removeEventListener(
          "mouseleave",
          pointerLeave
        );
      }

      tiltCards.forEach(
        (card) => {
          card.removeEventListener(
            "pointermove",
            handleTiltMove
          );

          card.removeEventListener(
            "pointerleave",
            handleTiltLeave
          );
        }
      );

      if (frame) {
        cancelAnimationFrame(
          frame
        );
      }

      document.documentElement
        .classList
        .remove(
          "st-motion-enabled",
          "st-fine-pointer"
        );
    };
  }, []);

  return (
    <>
      <div
        ref={progressRef}
        className="st-scroll-progress"
        aria-hidden="true"
      />

      <div
        ref={cursorRef}
        className="st-cursor-glow"
        aria-hidden="true"
      />
    </>
  );
}