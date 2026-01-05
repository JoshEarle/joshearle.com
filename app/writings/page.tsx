import ThemeToggle from "@/components/ThemeToggle";
import Navbar from "@/components/Navbar";
import Link from "next/link";

// This is where you'd store your writings data
// For now, I'll create a simple example structure
const writings = [
  {
    id: 1,
    title: "Hello, World!",
    date: "NOV 30, 25",
    slug: "hello-world",
  },
  // Add more writings here as you create them
];

export default function WritingsPage() {
  return (
    <main className="min-h-screen px-6 py-16 md:px-12 md:py-24 relative">
      <div className="max-w-3xl mx-auto">
        {/* Header: Name, Navbar, Theme Toggle */}
        <div className="flex items-center justify-between mb-16 relative">
          <div className="w-24">
            <Link href="/" className="text-small underline hover:text-gray-900 dark:hover:text-white transition-colors">
              ← Back
            </Link>
          </div>
          <Navbar />
          <div className="w-16">
            <ThemeToggle />
          </div>
        </div>
        
        {/* Page Title */}
        <div className="mb-16">
          <h1 className="text-medium mb-2">Writings</h1>
        </div>

        {/* Writings List */}
        <div className="space-y-6">
          {writings.map((writing) => (
            <article 
              key={writing.id}
              className="flex items-center justify-between pb-4"
            >
              <Link
                href={`/writings/${writing.slug}`}
                className="text-regular hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {writing.title}
              </Link>
              <div className="flex-1 border-b border-dotted border-gray-300 dark:border-gray-700 mx-4"></div>
              <span className="text-small text-gray-600 dark:text-gray-500 whitespace-nowrap">
                {writing.date}
              </span>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

