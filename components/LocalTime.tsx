"use client";

import { useState, useEffect, useRef } from "react";

export default function LocalTime() {
  const [time, setTime] = useState("");
  const prevTime = useRef("");

  useEffect(() => {
    const update = () => {
      const formatted = new Date().toLocaleTimeString("en-US", {
        timeZone: "America/Los_Angeles",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      if (formatted !== prevTime.current) {
        prevTime.current = formatted;
        setTime(formatted);
      }
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return <span>San Francisco, CA · <span style={{ fontVariantNumeric: "tabular-nums" }}>{time}</span></span>;
}
