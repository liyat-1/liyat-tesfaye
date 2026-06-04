import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { getPost } from "@/lib/blog-posts";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getPost(params.slug);
    return {
      meta: [
        { title: post ? `${post.title} — Liyat Tesfaye` : "Post — Liyat Tesfaye" },
        { name: "description", content: post?.excerpt ?? "" },
        { property: "og:title", content: post?.title ?? "Post" },
        { property: "og:description", content: post?.excerpt ?? "" },
        ...(post?.cover ? [{ property: "og:image", content: post.cover }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  notFoundComponent: () => (
    <Layout>
      <div className="container-x py-32 text-center">
        <p className="eyebrow text-muted-foreground">404</p>
        <h1 className="mt-3 font-display text-5xl tracking-tighter">Post not found</h1>
        <Link to="/blog" className="btn-primary mt-8 inline-flex"><ArrowLeft size={14} /> Back to journal</Link>
      </div>
    </Layout>
  ),
  component: Post,
});

function Post() {
  const { post } = Route.useLoaderData();
  return (
    <Layout>
      <article>
        <div className="container-x pt-10 md:pt-14 pb-8 border-b border-border">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition">
            <ArrowLeft size={14} /> All essays
          </Link>
          <p className="eyebrow text-muted-foreground mt-8">{formatDate(post.date)}</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[0.98] max-w-4xl">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Clock size={12} /> {post.readingMinutes} min read</span>
            {post.tags.length > 0 && (
              <span className="font-mono uppercase tracking-widest">{post.tags.join(" · ")}</span>
            )}
          </div>
        </div>

        {post.cover && (
          <div className="container-x pt-8">
            <div className="aspect-[16/8] overflow-hidden border border-border">
              <img src={post.cover} alt={post.title} className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        <div className="container-x section-pad">
          <div
            className="prose-blog mx-auto"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>

        <div className="border-t border-border bg-surface">
          <div className="container-x py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="eyebrow text-muted-foreground">Liked this?</p>
              <p className="mt-2 font-display text-2xl tracking-tighter">Let's work on something together.</p>
            </div>
            <Link to="/contact" className="btn-primary">Start a project</Link>
          </div>
        </div>
      </article>
    </Layout>
  );
}

function formatDate(d: string) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  } catch { return d; }
}
