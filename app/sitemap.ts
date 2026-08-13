import type { MetadataRoute } from "next";
import { writings } from "@/lib/writings";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.joshearle.com";

  const writingUrls: MetadataRoute.Sitemap = writings.map((writing) => ({
    url: `${baseUrl}/writings/${writing.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/writings`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...writingUrls,
  ];
}
