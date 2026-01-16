import ThemeToggle from "@/components/ThemeToggle";
import Navbar from "@/components/Navbar";
import Link from "next/link";

interface Writing {
  id: number;
  title: string;
  date: string;
  slug: string;
}

// This is where you'd store your writings data
// Add more writings here as you create them
const writings: Writing[] = [];

export default function WritingsPage() {
  return (
    <main className="min-h-screen px-6 py-16 md:px-12 md:py-24 relative">
      {/* Header: Name, Navbar, Theme Toggle - Fixed width container */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="flex items-center justify-between relative">
          <h1 className="text-medium">josh earle</h1>
          <Navbar />
          <div className="w-16">
            <ThemeToggle />
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <div className="mb-16">
          <h2 className="text-medium mb-2">writings</h2>
        </div>

        {/* Writings List */}
        {writings.length > 0 ? (
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
        ) : (
          <div className="py-16">
            <p className="text-regular text-gray-600 dark:text-gray-400">
              coming soon
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

