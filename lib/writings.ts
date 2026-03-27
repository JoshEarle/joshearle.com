export interface Writing {
  id: number;
  title: string;
  description: string;
  date: string;
  slug: string;
  content: string;
}

export const writings: Writing[] = [
  {
    id: 2,
    title: "the orchestration layer is the new interface",
    description: "how agent infrastructure is replacing traditional software design",
    date: "mar 16, 26",
    slug: "the-orchestration-layer-is-the-new-interface",
    content: "coming soon",
  },
];

export function getReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 250));
  return `${minutes} min read`;
}
