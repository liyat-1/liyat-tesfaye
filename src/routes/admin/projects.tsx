import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Trash2, Loader2, Upload, X } from "lucide-react";
import { projectsQuery, useUpsertProject, useDeleteProject, uploadImage, type Project } from "@/lib/db";

export const Route = createFileRoute("/admin/projects")({ component: ProjectsAdmin });

const empty: Partial<Project> = {
  title: "", category: "Frontend", image_url: "",
  primary_href: "", primary_label: "Visit site", primary_icon: "ExternalLink",
  secondary_href: "", secondary_label: "", secondary_icon: "",
  featured_home: true, sort_order: 0,
};

function ProjectsAdmin() {
  const { data: projects = [], isLoading } = useQuery(projectsQuery());
  const upsert = useUpsertProject();
  const del = useDeleteProject();
  const [editing, setEditing] = useState<Partial<Project> | null>(null);

  return (
    <div className="p-8 md:p-12 max-w-6xl">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="eyebrow text-muted-foreground">Manage</p>
          <h1 className="mt-3 font-display text-4xl tracking-tighter">Projects.</h1>
        </div>
        <button onClick={() => setEditing(empty)} className="btn-primary"><Plus size={16} /> Add project</button>
      </div>

      {isLoading ? (
        <div className="mt-12 grid place-items-center"><Loader2 className="animate-spin" /></div>
      ) : (
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {projects.map((p) => (
            <article key={p.id} className="bg-background flex flex-col">
              <div className="aspect-[4/3] bg-surface overflow-hidden">
                {p.image_url && <img src={p.image_url} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="p-5 border-t border-border flex flex-col gap-3">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{p.category} · #{p.sort_order}</p>
                <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => setEditing(p)} className="flex-1 border border-border px-3 py-2 text-xs font-semibold hover:bg-surface">Edit</button>
                  <button
                    onClick={() => confirm("Delete this project?") && del.mutate(p.id)}
                    className="border border-border px-3 py-2 text-xs font-semibold hover:bg-destructive hover:text-destructive-foreground"
                  ><Trash2 size={14} /></button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {editing && (
        <ProjectEditor
          project={editing}
          onClose={() => setEditing(null)}
          onSave={async (data) => { await upsert.mutateAsync(data); setEditing(null); }}
          saving={upsert.isPending}
        />
      )}
    </div>
  );
}

function ProjectEditor({ project, onClose, onSave, saving }: {
  project: Partial<Project>; onClose: () => void; onSave: (p: Partial<Project>) => void | Promise<void>; saving: boolean;
}) {
  const [p, setP] = useState<Partial<Project>>(project);
  const [uploading, setUploading] = useState(false);
  const set = <K extends keyof Project>(k: K, v: Project[K]) => setP((s) => ({ ...s, [k]: v }));

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return;
    setUploading(true);
    try { const url = await uploadImage(f); set("image_url", url); }
    catch (err) { alert(err instanceof Error ? err.message : "Upload failed"); }
    finally { setUploading(false); }
  }

  return (
    <div className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto">
      <div className="bg-background border border-border w-full max-w-2xl my-8">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-display text-xl font-semibold">{p.id ? "Edit project" : "New project"}</h2>
          <button onClick={onClose} className="p-2 hover:bg-surface"><X size={18} /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave(p); }} className="p-5 grid gap-4 max-h-[70vh] overflow-y-auto">
          <Field label="Title" value={p.title ?? ""} onChange={(v) => set("title", v)} required />
          <div className="grid grid-cols-2 gap-3">
            <label className="grid gap-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Category</span>
              <select value={p.category} onChange={(e) => set("category", e.target.value as Project["category"])} className="bg-background border border-border px-3 py-2.5 text-sm">
                <option>Frontend</option><option>Figma</option><option>Framer</option>
              </select>
            </label>
            <Field label="Sort order" type="number" value={String(p.sort_order ?? 0)} onChange={(v) => set("sort_order", Number(v))} />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Cover image</span>
            <div className="mt-1.5 flex gap-3 items-center">
              {p.image_url && <img src={p.image_url} alt="" className="w-20 h-20 object-cover border border-border" />}
              <label className="flex-1 cursor-pointer">
                <span className="inline-flex items-center gap-2 px-3 py-2 border border-border text-xs font-semibold hover:bg-surface">
                  {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />} Upload image
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={onFile} />
              </label>
            </div>
            <input value={p.image_url ?? ""} onChange={(e) => set("image_url", e.target.value)} placeholder="or paste URL" className="mt-2 w-full bg-background border border-border px-3 py-2 text-xs" />
          </div>
          <Field label="Primary button URL" value={p.primary_href ?? ""} onChange={(v) => set("primary_href", v)} required />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Primary button label" value={p.primary_label ?? ""} onChange={(v) => set("primary_label", v)} required />
            <Field label="Primary icon (lucide name)" value={p.primary_icon ?? ""} onChange={(v) => set("primary_icon", v)} />
          </div>
          <Field label="Secondary URL (optional)" value={p.secondary_href ?? ""} onChange={(v) => set("secondary_href", v)} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Secondary label" value={p.secondary_label ?? ""} onChange={(v) => set("secondary_label", v)} />
            <Field label="Secondary icon" value={p.secondary_icon ?? ""} onChange={(v) => set("secondary_icon", v)} />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={p.featured_home ?? true} onChange={(e) => set("featured_home", e.target.checked)} />
            Show on home page
          </label>
          <div className="flex gap-2 justify-end pt-3 border-t border-border">
            <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
              {saving ? <Loader2 size={14} className="animate-spin" /> : null} Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</span>
      <input type={type} value={value} required={required} onChange={(e) => onChange(e.target.value)} className="bg-background border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-foreground" />
    </label>
  );
}
