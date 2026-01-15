"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  
  const navItems = [
    { href: "/", label: "home" },
    { href: "/writings", label: "writings" },
    { href: "/pics", label: "pics" },
  ];

  return (
    <nav className="flex flex-1 justify-center gap-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-small underline hover:text-gray-900 dark:hover:text-white transition-colors ${
            pathname === item.href ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

