import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock } from "lucide-react";
import { Layout, PageIntro } from "@/components/site/Layout";
import { getAllPosts } from "@/lib/blog-posts";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — Liyat Tesfaye" },
      { name: "description", content: "Notes on design, frontend craft, and the things that inspire me." },
      { property: "og:title", content: "Journal — Liyat Tesfaye" },
      { property: "og:description", content: "Notes on design, frontend craft, and the things that inspire me." },
    ],
  }),
  component: Blog,
});

function Blog() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;
  return (
    <Layout>
      <PageIntro
        eyebrow="Journal · 03"
        title="Notes & essays."
        description="Short pieces on the design and engineering decisions behind my work — and the books, paintings and ideas I keep coming back to."
      />

      {featured && (
        <section className="container-x pt-8 md:pt-10 pb-10">
          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            className="group grid md:grid-cols-[1.1fr_0.9fr] gap-px bg-border border border-border bg-background hover-lift"
          >
            <div className="aspect-[4/3] md:aspect-auto overflow-hidden bg-surface">
              <img src={featured.cover} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            </div>
            <div className="bg-background p-8 md:p-12 flex flex-col justify-center">
              <p className="eyebrow text-muted-foreground">Latest · {formatDate(featured.date)}</p>
              <h2 className="mt-4 font-display text-3xl md:text-5xl tracking-tighter leading-[1.05]">
                {featured.title}
              </h2>
              <p className="mt-5 text-muted-foreground max-w-lg">{featured.excerpt}</p>
              <div className="mt-7 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Clock size={12} /> {featured.readingMinutes} min read</span>
                {featured.tags.length > 0 && (
                  <span className="font-mono uppercase tracking-widest">{featured.tags.join(" · ")}</span>
                )}
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-4">
                Read essay <ArrowUpRight size={14} />
              </span>
            </div>
          </Link>
        </section>
      )}

      {rest.length > 0 && (
        <section className="container-x section-pad border-t border-border">
          <div className="max-w-2xl mb-10">
            <p className="eyebrow text-muted-foreground">More from the journal</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl tracking-tighter">All essays</h2>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {rest.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group bg-background flex flex-col h-full hover-lift"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-surface">
                    <img src={p.cover} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                  </div>
                  <div className="p-6 border-t border-border flex flex-col flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {formatDate(p.date)} · {p.readingMinutes} min
                    </p>
                    <h3 className="mt-3 font-display text-xl font-semibold tracking-tight leading-snug">{p.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground flex-1">{p.excerpt}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold">
                      Read <ArrowUpRight size={12} />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Layout>
  );
}

function formatDate(d: string) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  } catch { return d; }
}
