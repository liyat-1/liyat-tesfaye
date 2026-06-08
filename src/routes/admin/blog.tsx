import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Trash2, Loader2, Upload, X } from "lucide-react";
import { blogPostsQuery, useUpsertBlogPost, useDeleteBlogPost, uploadImage, type BlogPost } from "@/lib/db";

export const Route = createFileRoute("/admin/blog")({ component: BlogAdmin });

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function BlogAdmin() {
  const { data: posts = [], isLoading } = useQuery(blogPostsQuery(true));
  const upsert = useUpsertBlogPost();
  const del = useDeleteBlogPost();
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);

  return (
    <div className="p-8 md:p-12 max-w-5xl">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div><p className="eyebrow text-muted-foreground">Manage</p><h1 className="mt-3 font-display text-4xl tracking-tighter">Blog.</h1></div>
        <button onClick={() => setEditing({ title: "", slug: "", excerpt: "", body_markdown: "", published: false })} className="btn-primary"><Plus size={16} /> New post</button>
      </div>

      {isLoading ? <div className="mt-12 grid place-items-center"><Loader2 className="animate-spin" /></div> : (
        <div className="mt-8 border border-border divide-y divide-border">
          {posts.length === 0 && <div className="p-8 text-sm text-muted-foreground text-center">No posts yet.</div>}
          {posts.map((p) => (
            <div key={p.id} className="p-5 flex items-center gap-4 hover:bg-surface">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg font-semibold truncate">{p.title}</h3>
                  {!p.published && <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border border-border">Draft</span>}
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate">/{p.slug} · {p.excerpt}</p>
              </div>
              <button onClick={() => setEditing(p)} className="border border-border px-3 py-1.5 text-xs font-semibold hover:bg-background">Edit</button>
              <button onClick={() => confirm("Delete?") && del.mutate(p.id)} className="border border-border px-3 py-1.5 text-xs hover:bg-destructive hover:text-destructive-foreground"><Trash2 size={12} /></button>
            </div>
          ))}
        </div>
      )}

      {editing && <BlogEditor post={editing} onClose={() => setEditing(null)} onSave={async (d) => { await upsert.mutateAsync(d); setEditing(null); }} saving={upsert.isPending} />}
    </div>
  );
}

function BlogEditor({ post, onClose, onSave, saving }: { post: Partial<BlogPost>; onClose: () => void; onSave: (p: Partial<BlogPost>) => Promise<void>; saving: boolean }) {
  const [p, setP] = useState<Partial<BlogPost>>(post);
  const [uploading, setUploading] = useState(false);
  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return;
    setUploading(true);
    try { setP((s) => ({ ...s, cover_image: await uploadImage(f) })); }
    catch (err) { alert(err instanceof Error ? err.message : "Upload failed"); }
    finally { setUploading(false); }
  }
  return (
    <div className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto">
      <div className="bg-background border border-border w-full max-w-3xl my-8">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-display text-xl font-semibold">{p.id ? "Edit post" : "New post"}</h2>
          <button onClick={onClose} className="p-2 hover:bg-surface"><X size={18} /></button>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          const final = { ...p, slug: p.slug || slugify(p.title ?? ""), published_at: p.published && !p.published_at ? new Date().toISOString() : p.published_at };
          onSave(final);
        }} className="p-5 grid gap-4 max-h-[75vh] overflow-y-auto">
          <label className="grid gap-1.5"><span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Title</span>
            <input required value={p.title ?? ""} onChange={(e) => setP({ ...p, title: e.target.value, slug: p.slug || slugify(e.target.value) })} className="bg-background border border-border px-3 py-2.5 text-sm" /></label>
          <label className="grid gap-1.5"><span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Slug</span>
            <input required value={p.slug ?? ""} onChange={(e) => setP({ ...p, slug: e.target.value })} className="bg-background border border-border px-3 py-2.5 text-sm font-mono" /></label>
          <label className="grid gap-1.5"><span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Excerpt</span>
            <input value={p.excerpt ?? ""} onChange={(e) => setP({ ...p, excerpt: e.target.value })} className="bg-background border border-border px-3 py-2.5 text-sm" /></label>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Cover image</span>
            <div className="mt-1.5 flex gap-3 items-center">
              {p.cover_image && <img src={p.cover_image} alt="" className="w-20 h-20 object-cover border border-border" />}
              <label className="cursor-pointer"><span className="inline-flex items-center gap-2 px-3 py-2 border border-border text-xs font-semibold hover:bg-surface">{uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />} Upload</span>
                <input type="file" accept="image/*" className="hidden" onChange={onFile} /></label>
            </div>
          </div>
          <label className="grid gap-1.5"><span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Body (Markdown)</span>
            <textarea required rows={14} value={p.body_markdown ?? ""} onChange={(e) => setP({ ...p, body_markdown: e.target.value })} className="bg-background border border-border px-3 py-2.5 text-sm font-mono resize-y" /></label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={!!p.published} onChange={(e) => setP({ ...p, published: e.target.checked })} /> Published
          </label>
          <div className="flex gap-2 justify-end pt-3 border-t border-border">
            <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">{saving && <Loader2 size={14} className="animate-spin" />} Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
