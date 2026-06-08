import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — Admin" }, { name: "robots", content: "noindex" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: "/admin" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-background px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft size={14} /> Back to site
        </Link>
        <p className="eyebrow text-muted-foreground">Admin</p>
        <h1 className="mt-3 font-display text-4xl tracking-tighter">
          {mode === "signin" ? "Sign in." : "Create account."}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {mode === "signup"
            ? "First account becomes admin automatically."
            : "Sign in to manage your portfolio content."}
        </p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4">
          <label className="grid gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Email</span>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Password</span>
            <input
              type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}
              className="bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground"
            />
          </label>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary justify-center mt-2 disabled:opacity-60">
            {loading ? <><Loader2 size={14} className="animate-spin" /> Working…</> : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
