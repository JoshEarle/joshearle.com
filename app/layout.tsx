import type { Metadata } from "next";
import "./globals.css";
import { PostHogProvider } from "@/components/PostHogProvider";
import { OutlitProvider } from "@/components/OutlitProvider";
import CommandPalette from "@/components/CommandPalette";
import Navbar from "@/components/Navbar";
import SiteIntro from "@/components/SiteIntro";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.joshearle.com"),
  title: {
    default: "josh earle",
    template: "%s — josh earle",
  },
  description: "personal site of josh earle — co-founder of outlit, writing about technology, design, and building things",
  openGraph: {
    title: "josh earle",
    description: "personal site of josh earle — co-founder of outlit, writing about technology, design, and building things",
    url: "https://www.joshearle.com",
    siteName: "josh earle",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "josh earle",
    description: "personal site of josh earle — co-founder of outlit, writing about technology, design, and building things",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.style.visibility = 'hidden';

                var showIntro = window.location.pathname === '/';
                try {
                  showIntro = showIntro && sessionStorage.getItem('josh-site-intro-seen-v8') !== 'true';
                } catch (e) {}

                document.documentElement.dataset.siteIntro = showIntro ? 'show' : 'hide';

                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}

                document.documentElement.style.visibility = '';
              })();
            `,
          }}
        />
      </head>
      <body>
        <SiteIntro />
        <PostHogProvider>
          <OutlitProvider>
            <CommandPalette />
            <div className="min-h-screen px-6 py-10 md:px-12 md:py-16 relative">
              <div className="mb-10">
                <Navbar />
              </div>
              {children}
            </div>
          </OutlitProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
