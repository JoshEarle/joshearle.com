"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const commands = [
  { label: "home", href: "/" },
  { label: "writings", href: "/writings" },
  { label: "x / twitter", href: "https://x.com/JoshEarle", external: true },
  { label: "linkedin", href: "https://www.linkedin.com/in/joshearle/", external: true },
  { label: "substack", href: "https://joshearle.substack.com/", external: true },
  { label: "email", href: "mailto:josh@outlit.ai", external: true },
  { label: "outlit", href: "https://outlit.ai/", external: true },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const router = useRouter();

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const run = useCallback(
    (cmd: (typeof commands)[0]) => {
      setOpen(false);
      setQuery("");
      if (cmd.external) {
        window.open(cmd.href, "_blank", "noopener,noreferrer");
      } else {
        router.push(cmd.href);
      }
    },
    [router]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
        setSelected(0);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered[selected]) {
      run(filtered[selected]);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => {
          setOpen(false);
          setQuery("");
        }}
      />

      {/* Palette */}
      <div className="relative w-full max-w-md mx-4 bg-white dark:bg-neutral-900 rounded-lg shadow-2xl border border-gray-200 dark:border-neutral-800 overflow-hidden">
        <input
          autoFocus
          type="text"
          placeholder="type a command..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-3 text-sm bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none border-b border-gray-200 dark:border-neutral-800"
        />
        <ul className="max-h-64 overflow-y-auto py-2">
          {filtered.length === 0 && (
            <li className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">no results</li>
          )}
          {filtered.map((cmd, i) => (
            <li
              key={cmd.href}
              onClick={() => run(cmd)}
              className={`px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between ${
                i === selected
                  ? "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <span>{cmd.label}</span>
              {cmd.external && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
