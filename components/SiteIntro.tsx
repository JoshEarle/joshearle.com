"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const INTRO_SEEN_KEY = "josh-site-intro-seen-v8";
const INTRO_DISMISS_MS = 5100;

export default function SiteIntro() {
  const initialPathname = usePathname();
  const audioRef = useRef<HTMLAudioElement>(null);
  const dismissingRef = useRef(false);
  const [visible, setVisible] = useState(initialPathname === "/");
  const [running, setRunning] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(true);
  const [leaving, setLeaving] = useState(false);

  const dismiss = useCallback(() => {
    if (dismissingRef.current) return;

    dismissingRef.current = true;
    setLeaving(true);
    window.sessionStorage.setItem(INTRO_SEEN_KEY, "true");
    window.setTimeout(() => setVisible(false), 160);
  }, []);

  const start = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || running) return;

    audio.currentTime = 0;
    void audio.play().catch(() => setNeedsInteraction(true));
  }, [running]);

  useLayoutEffect(() => {
    if (!visible) {
      document.documentElement.removeAttribute("data-site-intro");
      return;
    }

    if (window.sessionStorage.getItem(INTRO_SEEN_KEY) === "true") {
      document.documentElement.removeAttribute("data-site-intro");
      setVisible(false);
      return;
    }

    document.documentElement.removeAttribute("data-site-intro");

    const audio = audioRef.current;
    if (!audio) return;

    const handlePlaying = () => {
      setNeedsInteraction(false);
      setRunning(true);
    };

    audio.addEventListener("playing", handlePlaying);
    void audio.play().catch(() => setNeedsInteraction(true));

    return () => audio.removeEventListener("playing", handlePlaying);
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismiss();
      } else if (event.key === "Enter" || event.key === " ") {
        running ? dismiss() : start();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dismiss, running, start, visible]);

  useEffect(() => {
    if (!running) return;

    const dismissTimer = window.setTimeout(dismiss, INTRO_DISMISS_MS);
    return () => window.clearTimeout(dismissTimer);
  }, [dismiss, running]);

  if (!visible) return null;

  return (
    <section
      className={[
        "site-intro",
        running ? "site-intro--running" : "",
        leaving ? "site-intro--leaving" : "",
      ].join(" ")}
      aria-label="Welcome to Josh Earle's website"
      aria-hidden={leaving}
    >
      <img
        className="site-intro__canvas"
        src="/images/josh-earle-capcom-wordmark.png"
        width="164"
        height="144"
        alt=""
        aria-hidden="true"
      />

      <audio
        ref={audioRef}
        src="/audio/josh-intro.m4a"
        preload="auto"
        playsInline
        onEnded={dismiss}
      />

      <button
        className="site-intro__start"
        type="button"
        aria-label={running ? "Skip intro" : "Play intro"}
        onClick={running ? dismiss : start}
      >
        {needsInteraction && !running ? "touch to start" : ""}
      </button>
    </section>
  );
}
