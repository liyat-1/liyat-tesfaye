import { marked } from "marked";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover: string;
  tags: string[];
  readingMinutes: number;
  html: string;
  raw: string;
};

const modules = import.meta.glob("../content/blog/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return { meta: {} as Record<string, unknown>, body: raw };
  const meta: Record<string, unknown> = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (!m) continue;
    const [, key, valueRaw] = m;
    const v = valueRaw.trim();
    if (v.startsWith("[") && v.endsWith("]")) {
      meta[key] = v
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      meta[key] = v.replace(/^["']|["']$/g, "");
    }
  }
  return { meta, body: match[2] };
}

marked.setOptions({ gfm: true, breaks: false });

const posts: BlogPost[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    const { meta, body } = parseFrontmatter(raw);
    const words = body.split(/\s+/).length;
    return {
      slug,
      title: String(meta.title ?? slug),
      date: String(meta.date ?? ""),
      excerpt: String(meta.excerpt ?? ""),
      cover: String(meta.cover ?? "/images/hero-image.png"),
      tags: Array.isArray(meta.tags) ? (meta.tags as string[]) : [],
      readingMinutes: Math.max(1, Math.round(words / 220)),
      html: marked.parse(body) as string,
      raw,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
