import Link from "next/link";
import { writings, getReadingTime } from "@/lib/writings";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "writings",
  description: "thoughts on technology, design, agents, and building things — by josh earle",
  openGraph: {
    title: "writings — josh earle",
    description: "thoughts on technology, design, agents, and building things — by josh earle",
  },
};

export default function WritingsPage() {
  return (
    <main className="writings-page max-w-4xl mx-auto">
        {/* Page Title */}
        <div className="mb-6">
          <h2 className="text-medium">writings</h2>
        </div>

        {/* Writings List */}
        {writings.length > 0 ? (
          <div className="writings-list">
            {writings.map((writing) => (
              <Link
                key={writing.id}
                href={`/writings/${writing.slug}`}
                className="writing-entry block py-4 cursor-pointer group"
              >
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="text-regular text-foreground group-hover:opacity-70 transition-opacity">
                      {writing.title}
                    </p>
                  </div>
                  <div className="text-regular text-muted whitespace-nowrap text-right flex-shrink-0">
                    <p>{writing.date}</p>
                    <p className="mt-1" style={{ fontSize: "10pt" }}>{getReadingTime(writing.content)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-regular text-muted">
              coming soon
            </p>
          </div>
        )}

    </main>
  );
}
