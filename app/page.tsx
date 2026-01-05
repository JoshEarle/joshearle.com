import ThemeToggle from "@/components/ThemeToggle";
import NowPlaying from "@/components/NowPlaying";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-16 md:px-12 md:py-24 relative">
      <div className="max-w-3xl mx-auto">
        {/* Header: Name, Navbar, Theme Toggle */}
        <div className="flex items-center justify-between mb-16 relative">
          <h1 className="text-medium">Josh Earle</h1>
          <Navbar />
          <div className="w-16">
            <ThemeToggle />
          </div>
        </div>

        {/* Now Playing Section */}
        <NowPlaying />

        {/* About Section */}
        <section className="mb-16">
          <h2 className="text-medium mb-4">About</h2>
          <p className="text-regular mb-6 leading-relaxed">
            I&apos;m an independent (design) engineer who designs through code. I care deeply about crafting elegant, intuitive user interfaces while writing clean, scalable code.
          </p>
        </section>

        {/* Writings Section */}
        <section>
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-medium">Writings</h2>
            <Link 
              href="/writings" 
              className="text-small text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              (view all)
            </Link>
          </div>
          <div className="space-y-6">
            <article className="flex items-center justify-between pb-4">
              <Link 
                href="/writings" 
                className="text-regular hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                Hello, World!
              </Link>
              <div className="flex-1 border-b border-dotted border-gray-300 dark:border-gray-700 mx-4"></div>
              <span className="text-small text-gray-600 dark:text-gray-500 whitespace-nowrap">NOV 30, 25</span>
            </article>
          </div>
        </section>

        {/* Social Links */}
        <div className="mt-16 flex flex-wrap gap-6">
          <a 
            href="https://github.com" 
            className="text-small underline hover:text-gray-900 dark:hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a 
            href="https://twitter.com" 
            className="text-small underline hover:text-gray-900 dark:hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            X (Twitter)
          </a>
        </div>
      </div>
    </main>
  );
}

