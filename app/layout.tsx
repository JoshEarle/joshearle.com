import type { Metadata } from "next";
import "./globals.css";
import { PostHogProvider } from "@/components/PostHogProvider";
import { OutlitProvider } from "@/components/OutlitProvider";
import CommandPalette from "@/components/CommandPalette";

export const metadata: Metadata = {
  title: "josh earle",
  description: "personal website and portfolio",
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
                try {
                  document.documentElement.style.visibility = 'hidden';
                  const theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                  document.documentElement.style.visibility = '';
                } catch (e) {
                  document.documentElement.style.visibility = '';
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <PostHogProvider>
          <OutlitProvider>
            <CommandPalette />
            {children}
          </OutlitProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
