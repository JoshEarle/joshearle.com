import ThemeToggle from "@/components/ThemeToggle";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { notFound } from "next/navigation";

// This would typically come from a database or markdown files
// For now, I'll create a simple example
const writings: Record<string, { title: string; date: string; content: string }> = {
  "hello-world": {
    title: "Hello, World!",
    date: "NOV 30, 25",
    content: `This is where your writing content would go. You can write in plain text, or use markdown if you set that up.

You can add paragraphs, lists, and format your content however you like.

This is just an example - replace this with your actual writing!`,
  },
};

export default function WritingPage({ params }: { params: { slug: string } }) {
  const writing = writings[params.slug];

  if (!writing) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-16 md:px-12 md:py-24 relative">
      <div className="max-w-3xl mx-auto">
        {/* Header: Name, Navbar, Theme Toggle */}
        <div className="flex items-center justify-between mb-16 relative">
          <div className="w-24">
            <Link href="/writings" className="text-small underline hover:text-gray-900 dark:hover:text-white transition-colors">
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
          <h1 className="text-medium mb-2">{writing.title}</h1>
          <p className="text-small text-gray-600 dark:text-gray-500">{writing.date}</p>
        </div>

        {/* Content */}
        <article className="prose prose-gray dark:prose-invert max-w-none">
          <div className="text-regular whitespace-pre-line leading-relaxed">
            {writing.content}
          </div>
        </article>
      </div>
    </main>
  );
}

