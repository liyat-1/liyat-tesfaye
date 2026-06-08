import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { FolderKanban, Plane, FileText, Settings, ArrowUpRight } from "lucide-react";
import { projectsQuery, travelQuery, blogPostsQuery } from "@/lib/db";

export const Route = createFileRoute("/admin/")({ component: Dashboard });

function Dashboard() {
  const projects = useQuery(projectsQuery());
  const travel = useQuery(travelQuery());
  const posts = useQuery(blogPostsQuery(true));

  const cards = [
    { to: "/admin/projects", title: "Projects", icon: FolderKanban, count: projects.data?.length ?? 0, desc: "Add, edit, reorder portfolio projects." },
    { to: "/admin/travel", title: "Travel", icon: Plane, count: travel.data?.length ?? 0, desc: "Manage your dream destinations." },
    { to: "/admin/blog", title: "Blog posts", icon: FileText, count: posts.data?.length ?? 0, desc: "Write and publish blog entries." },
    { to: "/admin/settings", title: "Site content", icon: Settings, count: null, desc: "Hero, about, skills, hobbies, values, timeline, interests, resume." },
  ];

  return (
    <div className="p-8 md:p-12 max-w-5xl">
      <p className="eyebrow text-muted-foreground">Welcome back</p>
      <h1 className="mt-3 font-display text-4xl md:text-5xl tracking-tighter">Dashboard.</h1>
      <p className="mt-4 text-muted-foreground max-w-xl">
        Manage every piece of content on your portfolio. Changes go live immediately.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 gap-px bg-border border border-border">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link key={c.to} to={c.to} className="group bg-background p-6 md:p-8 hover-lift transition">
              <div className="flex items-start justify-between">
                <span className="grid place-items-center size-11 border border-border group-hover:bg-foreground group-hover:text-background transition">
                  <Icon size={18} />
                </span>
                <ArrowUpRight className="text-muted-foreground group-hover:text-foreground transition" size={18} />
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">
                {c.title}
                {c.count !== null && <span className="ml-2 text-muted-foreground font-normal text-base">({c.count})</span>}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
