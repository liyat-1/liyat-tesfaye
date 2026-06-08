import { createFileRoute, Outlet, Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2, LayoutDashboard, FolderKanban, Plane, FileText, Settings, LogOut, ArrowUpRight } from "lucide-react";
import { useSession, useIsAdmin, useSignOut } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Liyat Tesfaye" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };
const NAV: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/travel", label: "Travel", icon: Plane },
  { to: "/admin/blog", label: "Blog", icon: FileText },
  { to: "/admin/settings", label: "Site content", icon: Settings },
];

function AdminLayout() {
  const navigate = useNavigate();
  const { user, loading } = useSession();
  const { data: isAdmin, isLoading: roleLoading } = useIsAdmin(user);
  const signOut = useSignOut();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  if (loading || roleLoading || !user) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <Loader2 className="animate-spin" size={20} />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center bg-background px-4">
        <div className="max-w-sm text-center">
          <p className="eyebrow text-muted-foreground">Access denied</p>
          <h1 className="mt-3 font-display text-3xl tracking-tighter">Not an admin.</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            This account doesn't have admin permissions.
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <button onClick={signOut} className="btn-primary">Sign out</button>
            <Link to="/" className="btn-ghost">Back to site</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-60 shrink-0 border-r border-border flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-border">
          <Link to="/" className="block">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Admin</p>
            <p className="font-display text-lg font-semibold mt-1">Liyat<span className="text-muted-foreground">.</span></p>
          </Link>
        </div>
        <nav className="p-3 flex-1 overflow-y-auto">
          {NAV.map((n) => {
            const active = n.exact ? path === n.to : path.startsWith(n.to);
            const Icon = n.icon;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-sm transition ${
                  active ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground hover:bg-surface"
                }`}
              >
                <Icon size={16} /> {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border space-y-1">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-sm text-muted-foreground hover:text-foreground hover:bg-surface">
            <ArrowUpRight size={16} /> View site
          </a>
          <button onClick={signOut} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-sm text-muted-foreground hover:text-foreground hover:bg-surface">
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
