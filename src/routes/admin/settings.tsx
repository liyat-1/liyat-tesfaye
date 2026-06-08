import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { settingsQuery, useSaveSettings, type SiteSettings } from "@/lib/db";

export const Route = createFileRoute("/admin/settings")({ component: SettingsAdmin });

function SettingsAdmin() {
  const { data, isLoading } = useQuery(settingsQuery());
  const save = useSaveSettings();
  const [text, setText] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (data) setText(JSON.stringify(data, null, 2));
  }, [data]);

  async function onSave() {
    setErr(""); setDone(false);
    try {
      const parsed = JSON.parse(text) as SiteSettings;
      await save.mutateAsync(parsed);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Invalid JSON");
    }
  }

  return (
    <div className="p-8 md:p-12 max-w-5xl">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="eyebrow text-muted-foreground">Manage</p>
          <h1 className="mt-3 font-display text-4xl tracking-tighter">Site content.</h1>
          <p className="mt-3 text-sm text-muted-foreground max-w-xl">
            Edit profile, hero, about (stats, skills, hobbies, values, timeline), interests and resume content. Each section is a JSON block — edit the values, then save.
          </p>
        </div>
        <button onClick={onSave} disabled={save.isPending} className="btn-primary disabled:opacity-60">
          {save.isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save changes
        </button>
      </div>

      {done && <p className="mt-4 text-sm text-foreground">✓ Saved</p>}
      {err && <p className="mt-4 text-sm text-destructive">{err}</p>}

      {isLoading ? <div className="mt-12 grid place-items-center"><Loader2 className="animate-spin" /></div> : (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          className="mt-6 w-full min-h-[70vh] bg-surface border border-border p-4 font-mono text-xs leading-relaxed focus:outline-none focus:border-foreground"
        />
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Tip: image fields accept URLs. Upload images from the Projects or Travel admin first (they live in your media library), then copy the URL here.
      </p>
    </div>
  );
}
