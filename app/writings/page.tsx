import Navbar from "@/components/Navbar";
import Link from "next/link";
import { writings, getReadingTime } from "@/lib/writings";

export default function WritingsPage() {
  return (
    <main className="min-h-screen px-6 py-10 md:px-12 md:py-16 relative">
      {/* Nav */}
      <div className="mb-10">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <div className="mb-10">
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
                  className="text-regular hover:text-foreground transition-colors cursor-pointer"
                >
                  {writing.title}
                </Link>
                <div className="flex-1 border-b border-dotted border-themed mx-4"></div>
                <span className="text-regular text-muted whitespace-nowrap flex gap-3">
                  <span>{getReadingTime(writing.content)}</span>
                  <span>{writing.date}</span>
                </span>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-regular text-muted">
              coming soon
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
