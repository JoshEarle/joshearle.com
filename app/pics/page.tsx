import ThemeToggle from "@/components/ThemeToggle";
import Navbar from "@/components/Navbar";
import Link from "next/link";

// Example images - replace with your actual images
const pics = [
  {
    id: 1,
    title: "Photo 1",
    imageUrl: "/images/photo1.jpg",
    date: "NOV 30, 25",
  },
  {
    id: 2,
    title: "Photo 2",
    imageUrl: "/images/photo2.jpg",
    date: "NOV 25, 25",
  },
  // Add more pics here
];

export default function PicsPage() {
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
          <h1 className="text-medium mb-2">Pics</h1>
        </div>

        {/* Pics Grid */}
        <div className="space-y-12">
          {pics.map((pic) => (
            <article key={pic.id} className="mb-12">
              <div className="mb-4">
                <img
                  src={pic.imageUrl}
                  alt={pic.title}
                  className="w-full h-auto rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-regular">{pic.title}</h2>
                <span className="text-small text-gray-600 dark:text-gray-500 whitespace-nowrap">
                  {pic.date}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

