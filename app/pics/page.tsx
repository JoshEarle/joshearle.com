import ThemeToggle from "@/components/ThemeToggle";
import Navbar from "@/components/Navbar";
import Link from "next/link";

// HOW TO ADD PHOTOS:
// 
// Step 1: Add your image file to the /public/images/ folder
//   - Drag and drop your photo file (jpg, png, etc.) into: public/images/
//   - Example: If your file is called "sunset.jpg", put it in public/images/sunset.jpg
//
// Step 2: Add an entry below in the pics array like this:
//   {
//     id: 3,  // Use the next number (3, 4, 5, etc.)
//     title: "sunset in san francisco",  // Your photo title
//     imageUrl: "/images/sunset.jpg",  // Must match your filename exactly
//     date: "DEC 15, 25",  // Date in format: "MON DD, YY"
//   }
//
// Step 3: Save the file and refresh your browser!

const pics = [
  {
    id: 1,
    title: "late night grind at golden gate",
    imageUrl: "/images/IMG_5379.jpg",
    date: "DEC 15, 25",
  },
  {
    id: 2,
    title: "shopping at familymart in osaka",
    imageUrl: "/images/IMG_4705.jpg",
    date: "APR 20, 23",
  },
  {
    id: 3,
    title: "got into yc!",
    imageUrl: "/images/L1000419.jpg",
    date: "FEB 20, 25",
  },
  {
    id: 4,
    title: "conquering waterfalls in ecuador",
    imageUrl: "/images/Waterfall.jpg",
    date: "JAN 2, 26",
  },
  // TO ADD MORE PHOTOS:
  // Step 1: Save your image file to: public/images/your-photo.jpg
  // Step 2: Copy the format below and paste it above, then fill in your details:
  // {
  //   id: 2,  // Use the next number (2, 3, 4, etc.)
  //   title: "your photo title here",
  //   imageUrl: "/images/your-photo.jpg",  // Must match your filename exactly!
  //   date: "DEC 20, 25",  // Format: "MON DD, YY"
  // },
];

export default function PicsPage() {
  return (
    <main className="min-h-screen px-6 py-16 md:px-12 md:py-24 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header: Name, Navbar, Theme Toggle */}
        <div className="flex items-center justify-between mb-16 relative">
          <h1 className="text-medium">josh earle</h1>
          <Navbar />
          <div className="w-16">
            <ThemeToggle />
          </div>
        </div>
        
        {/* Page Title */}
        <div className="mb-16">
          <h2 className="text-medium mb-2">pics</h2>
        </div>

        {/* Collage Grid - Masonry Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {pics.map((pic) => (
            <article 
              key={pic.id} 
              className="break-inside-avoid mb-6 group"
            >
              <div className="mb-3 overflow-hidden rounded-lg transition-all duration-300 hover:opacity-90">
                <img
                  src={pic.imageUrl}
                  alt={pic.title}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center justify-between px-1">
                <h3 className="text-regular group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {pic.title}
                </h3>
                <span className="text-small text-gray-600 dark:text-gray-500 whitespace-nowrap ml-4">
                  {pic.date}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {pics.length === 0 && (
          <div className="text-center py-16">
            <p className="text-regular text-gray-600 dark:text-gray-400 mb-4">
              No photos yet.
            </p>
            <p className="text-small text-gray-500 dark:text-gray-500">
              Add images to <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">/public/images/</code> and update the pics array in <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">app/pics/page.tsx</code>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

