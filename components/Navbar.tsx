"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "home" },
    { href: "/writings", label: "writings" },
    { href: "/pics", label: "pics" },
  ];

  return (
    <nav className="flex items-center justify-between max-w-4xl mx-auto">
      <div className="flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-small hover:text-gray-900 dark:hover:text-white transition-colors ${
              (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)) ? "text-gray-900 dark:text-white" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <ThemeToggle />
    </nav>
  );
}

