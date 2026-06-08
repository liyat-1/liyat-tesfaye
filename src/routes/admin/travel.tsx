import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Trash2, Loader2, Upload, X } from "lucide-react";
import { travelQuery, useUpsertTravel, useDeleteTravel, uploadImage, type TravelDestination } from "@/lib/db";

export const Route = createFileRoute("/admin/travel")({ component: TravelAdmin });

function TravelAdmin() {
  const { data: items = [], isLoading } = useQuery(travelQuery());
  const upsert = useUpsertTravel();
  const del = useDeleteTravel();
  const [editing, setEditing] = useState<Partial<TravelDestination> | null>(null);

  return (
    <div className="p-8 md:p-12 max-w-6xl">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div><p className="eyebrow text-muted-foreground">Manage</p><h1 className="mt-3 font-display text-4xl tracking-tighter">Travel.</h1></div>
        <button onClick={() => setEditing({ label: "", subtitle: "", image_url: "", sort_order: 0 })} className="btn-primary"><Plus size={16} /> Add destination</button>
      </div>

      {isLoading ? <div className="mt-12 grid place-items-center"><Loader2 className="animate-spin" /></div> : (
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {items.map((t) => (
            <article key={t.id} className="bg-background flex flex-col">
              <div className="aspect-[4/5] bg-surface overflow-hidden">{t.image_url && <img src={t.image_url} alt="" className="w-full h-full object-cover" />}</div>
              <div className="p-4 border-t border-border">
                <p className="font-display text-base font-semibold">{t.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{t.subtitle}</p>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => setEditing(t)} className="flex-1 border border-border px-2 py-1.5 text-xs font-semibold hover:bg-surface">Edit</button>
                  <button onClick={() => confirm("Delete?") && del.mutate(t.id)} className="border border-border px-2 py-1.5 text-xs hover:bg-destructive hover:text-destructive-foreground"><Trash2 size={12} /></button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {editing && <TravelEditor item={editing} onClose={() => setEditing(null)} onSave={async (d) => { await upsert.mutateAsync(d); setEditing(null); }} saving={upsert.isPending} />}
    </div>
  );
}

function TravelEditor({ item, onClose, onSave, saving }: { item: Partial<TravelDestination>; onClose: () => void; onSave: (d: Partial<TravelDestination>) => Promise<void>; saving: boolean }) {
  const [d, setD] = useState<Partial<TravelDestination>>(item);
  const [uploading, setUploading] = useState(false);
  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return;
    setUploading(true);
    try { setD((s) => ({ ...s, image_url: await uploadImage(f) })); }
    catch (err) { alert(err instanceof Error ? err.message : "Upload failed"); }
    finally { setUploading(false); }
  }
  return (
    <div className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm grid place-items-center p-4">
      <div className="bg-background border border-border w-full max-w-lg">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-display text-xl font-semibold">{d.id ? "Edit destination" : "New destination"}</h2>
          <button onClick={onClose} className="p-2 hover:bg-surface"><X size={18} /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave(d); }} className="p-5 grid gap-4">
          <label className="grid gap-1.5"><span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Label</span>
            <input required value={d.label ?? ""} onChange={(e) => setD({ ...d, label: e.target.value })} className="bg-background border border-border px-3 py-2.5 text-sm" /></label>
          <label className="grid gap-1.5"><span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Subtitle</span>
            <input value={d.subtitle ?? ""} onChange={(e) => setD({ ...d, subtitle: e.target.value })} className="bg-background border border-border px-3 py-2.5 text-sm" /></label>
          <label className="grid gap-1.5"><span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Sort order</span>
            <input type="number" value={d.sort_order ?? 0} onChange={(e) => setD({ ...d, sort_order: Number(e.target.value) })} className="bg-background border border-border px-3 py-2.5 text-sm" /></label>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Image</span>
            <div className="mt-1.5 flex gap-3 items-center">
              {d.image_url && <img src={d.image_url} alt="" className="w-20 h-20 object-cover border border-border" />}
              <label className="cursor-pointer">
                <span className="inline-flex items-center gap-2 px-3 py-2 border border-border text-xs font-semibold hover:bg-surface">
                  {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />} Upload
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={onFile} />
              </label>
            </div>
            <input value={d.image_url ?? ""} onChange={(e) => setD({ ...d, image_url: e.target.value })} placeholder="or paste URL" className="mt-2 w-full bg-background border border-border px-3 py-2 text-xs" />
          </div>
          <div className="flex gap-2 justify-end pt-3 border-t border-border">
            <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">{saving && <Loader2 size={14} className="animate-spin" />} Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
