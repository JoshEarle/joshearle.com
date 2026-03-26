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
        <div className="mb-6">
          <h2 className="text-medium">writings</h2>
        </div>

        {/* Writings List */}
        {writings.length > 0 ? (
          <div>
            {writings.map((writing, i) => (
              <Link
                key={writing.id}
                href={`/writings/${writing.slug}`}
                className="block py-4 hover:opacity-70 transition-opacity cursor-pointer"
                style={i < writings.length - 1 ? { borderBottom: "1px solid rgba(128, 128, 128, 0.15)" } : undefined}
              >
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="text-regular text-foreground">
                      {writing.title}
                    </p>
                    <p className="text-regular text-muted mt-1">
                      {writing.description}
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
      </div>
    </main>
  );
}
