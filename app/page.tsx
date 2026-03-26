import NowPlaying from "@/components/NowPlaying";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-10 md:px-12 md:py-16 relative">
      {/* Nav */}
      <div className="mb-10">
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Name */}
        <div className="mb-10 flex items-baseline gap-1.5">
          <h1 className="text-medium">josh earle</h1>
          <span className="text-small">/</span>
          <p className="text-small">co-founder, outlit</p>
        </div>

        {/* Currently Section */}
        <section className="mb-10">
          <h2 className="text-medium mb-3">currently</h2>
          <p className="text-regular leading-relaxed">
            building{" "}
            <a
              href="https://outlit.ai/"
              className="text-foreground underline hover:opacity-70 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              outlit
            </a>.
            <br />
            customer context for agents.
          </p>
        </section>

        {/* About Section */}
        <section className="mb-10">
          <h2 className="text-medium mb-3">about</h2>
          <p className="text-regular leading-relaxed">
            canadian living in san francisco.
            <br /><br />
            writing about things i find interesting{" "}
            <a
              href="/writings"
              className="text-foreground underline hover:opacity-70 transition-opacity"
            >
              here
            </a>
            {" "}and building things like{" "}
            <a
              href="https://www.hardestnarutoquiz.com"
              className="text-foreground underline hover:opacity-70 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              the hardest naruto trivia quiz on the internet
            </a>.
            <br /><br />
            other interests include context engineering, nuclear economics, and fantasy football.
          </p>
        </section>

        {/* Now Playing */}
        <NowPlaying />

        {/* Social Links */}
        <div className="mt-10 flex gap-5">
          <a
            href="https://x.com/RealEarle"
            className="hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/joshearle/"
            className="hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="mailto:josh@outlit.ai"
            className="hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
}
