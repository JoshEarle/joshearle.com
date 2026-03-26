import Navbar from "@/components/Navbar";
import Link from "next/link";
import { notFound } from "next/navigation";
import { writings, getReadingTime } from "@/lib/writings";
import type { Metadata } from "next";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const writing = writings.find((w) => w.slug === params.slug);
  if (!writing) {
    return { title: "not found" };
  }
  return {
    title: writing.title,
    description: writing.description,
    openGraph: {
      title: `${writing.title} — josh earle`,
      description: writing.description,
      type: "article",
    },
  };
}

export default function WritingPage({ params }: { params: { slug: string } }) {
  const writing = writings.find((w) => w.slug === params.slug);

  if (!writing) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-10 md:px-12 md:py-16 relative">
      {/* Nav */}
      <div className="mb-10">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <div className="mb-8">
          <Link href="/writings" className="text-regular hover:text-foreground transition-colors">
            ← back
          </Link>
        </div>

        {/* Page Title */}
        <div className="mb-10">
          <h1 className="text-medium mb-2">{writing.title}</h1>
          <p className="text-regular text-muted">
            {writing.date} · {getReadingTime(writing.content)}
          </p>
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
