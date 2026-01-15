import ThemeToggle from "@/components/ThemeToggle";
import NowPlaying from "@/components/NowPlaying";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-16 md:px-12 md:py-24 relative">
      <div className="max-w-3xl mx-auto">
        {/* Header: Name, Navbar, Theme Toggle */}
        <div className="flex items-center justify-between mb-16 relative">
          <h1 className="text-medium">josh earle</h1>
          <Navbar />
          <div className="w-16">
            <ThemeToggle />
          </div>
        </div>

        {/* Now Playing Section */}
        <NowPlaying />

        {/* Currently Section */}
        <section className="mb-16">
          <h2 className="text-medium mb-4">currently</h2>
          <p className="text-regular mb-6 leading-relaxed">
            building{" "}
            <a 
              href="https://outlit.ai/" 
              className="underline hover:text-gray-900 dark:hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              outlit
            </a>.
            <br />
            understand how customers find you, use your product, and convert to paid.
          </p>
        </section>

        {/* About Section */}
        <section className="mb-16">
          <h2 className="text-medium mb-4">about</h2>
          <p className="text-regular mb-6 leading-relaxed">
            canadian living in san francisco.
            <br /><br />
            previously a product designer building design systems for boring enterprise software.
            <br /><br />
            interested in AI, nuclear economics, agritech, and fantasy football.
            <br /><br />
            i write about things i find interesting and build things like{" "}
            <a 
              href="https://www.hardestnarutoquiz.com" 
              className="underline hover:text-gray-900 dark:hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              the hardest naruto trivia quiz on the internet
            </a>.
            <br /><br />
            usually working out of coffee shops around the mission and north beach.
          </p>
        </section>

        {/* Social Links */}
        <div className="mt-16 flex flex-wrap gap-6">
          <a 
            href="https://x.com/RealEarle" 
            className="text-small underline hover:text-gray-900 dark:hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            x
          </a>
          <a 
            href="https://www.linkedin.com/in/joshearle/" 
            className="text-small underline hover:text-gray-900 dark:hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin
          </a>
          <a 
            href="https://github.com/JoshEarle" 
            className="text-small underline hover:text-gray-900 dark:hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
          <a 
            href="mailto:josh@outlit.ai" 
            className="text-small underline hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            email me
          </a>
        </div>
      </div>
    </main>
  );
}

