import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Menu, X, ArrowUpRight, User, Sparkles, Heart, Compass, Star,
  Briefcase, GraduationCap, Image as ImageIcon, Rocket, BookOpen,
  Plane, Mountain, Code2, Clock, FileText,
} from "lucide-react";

type DropItem = {
  label: string;
  desc: string;
  to: string;
  hash?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

type NavEntry =
  | { to: string; label: string; drop?: undefined }
  | { to: string; label: string; drop: { eyebrow: string; tagline: string; items: DropItem[] } };

const NAV: NavEntry[] = [
  { to: "/", label: "Home" },
  {
    to: "/about",
    label: "About",
    drop: {
      eyebrow: "Who I am",
      tagline: "A frontend developer & designer from Addis Ababa.",
      items: [
        { label: "About me", desc: "Background & journey", to: "/about", hash: "about-me", icon: User },
        { label: "Skills", desc: "Frontend, back-end, security & design", to: "/about", hash: "about-skills", icon: Sparkles },
        { label: "Hobbies", desc: "Photography, sketching, music", to: "/about", hash: "hobbies", icon: Heart },
        { label: "Values", desc: "What I bring to every project", to: "/about", hash: "values", icon: Star },
        { label: "Timeline", desc: "Education & work milestones", to: "/about", hash: "timeline", icon: Clock },
      ],
    },
  },
  {
    to: "/interest",
    label: "Interest",
    drop: {
      eyebrow: "What inspires me",
      tagline: "Art, the cosmos, and stories worth getting lost in.",
      items: [
        { label: "Art", desc: "Paintings & collections I love", to: "/interest", hash: "art", icon: ImageIcon },
        { label: "Space", desc: "A journey beyond Earth", to: "/interest", hash: "space", icon: Rocket },
        { label: "Books", desc: "Windows to other worlds", to: "/interest", hash: "books", icon: BookOpen },
      ],
    },
  },
  {
    to: "/adventure",
    label: "Adventure",
    drop: {
      eyebrow: "Travel & work",
      tagline: "Dream destinations and the craft that fuels them.",
      items: [
        { label: "Travel", desc: "Places I dream of visiting", to: "/adventure", hash: "travel", icon: Plane },
        { label: "Experience", desc: "How I've grown my craft", to: "/adventure", hash: "experience", icon: Mountain },
        { label: "Projects", desc: "Things I've shipped recently", to: "/adventure", hash: "exciting", icon: Code2 },
      ],
    },
  },
  {
    to: "/resume",
    label: "Resume",
    drop: {
      eyebrow: "My credentials",
      tagline: "GitHub, projects and a downloadable CV.",
      items: [
        { label: "GitHub", desc: "Open-source code & experiments", to: "/resume", hash: "github", icon: Code2 },
        { label: "Projects", desc: "Selected case studies", to: "/resume", hash: "projects", icon: Briefcase },
        { label: "CV", desc: "Education & qualifications", to: "/resume", hash: "cv", icon: GraduationCap },
      ],
    },
  },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setHovered(null); }, [pathname]);

  const openDrop = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHovered(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setHovered(null), 120);
  };

  const active = NAV.find((n) => n.drop && n.label === hovered) as
    | (NavEntry & { drop: NonNullable<NavEntry["drop"]> })
    | undefined;

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border"
          : "bg-background border-b border-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-14 md:h-16">
        <Link to="/" className="flex items-center gap-2.5 font-display text-base font-semibold tracking-tight">
          <span className="grid place-items-center size-8 bg-foreground text-background font-semibold text-sm rounded-sm">
            L
          </span>
          <span className="hidden sm:inline">Liyat Tesfaye</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" onMouseLeave={scheduleClose}>
          {NAV.map((item) => (
            <div
              key={item.to}
              onMouseEnter={() => (item.drop ? openDrop(item.label) : setHovered(null))}
              className="relative"
            >
              <Link
                to={item.to}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                activeProps={{ className: "inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>

        <Link to="/contact" className="hidden md:inline-flex btn-primary !py-2 !px-3.5 !text-xs rounded-sm">
          Let's talk <ArrowUpRight size={14} />
        </Link>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden grid place-items-center size-10 border border-border text-foreground"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mega dropdown panel */}
      <div
        className={`hidden md:block absolute left-0 right-0 top-full bg-background border-b border-border shadow-[0_24px_40px_-20px_rgba(0,0,0,0.18)] transition-all duration-300 ${
          active ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        onMouseEnter={() => active && openDrop(active.label)}
        onMouseLeave={scheduleClose}
      >
        {active && (
          <div className="container-x py-8 grid grid-cols-[0.9fr_1.5fr] gap-10">
            <div className="border-r border-border pr-8">
              <p className="eyebrow text-muted-foreground">{active.drop.eyebrow}</p>
              <h3 className="mt-3 font-display text-3xl tracking-tighter">{active.label}</h3>
              <p className="mt-3 text-sm text-muted-foreground max-w-xs">{active.drop.tagline}</p>
              <Link to={active.to} className="mt-5 inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4">
                Visit page <ArrowUpRight size={14} />
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-px bg-border border border-border">
              {active.drop.items.map(({ icon: Icon, ...it }) => (
                <li key={it.label}>
                  <Link
                    to={it.to}
                    hash={it.hash}
                    className="group flex items-start gap-4 p-5 bg-background hover:bg-surface transition h-full"
                  >
                    <span className="shrink-0 grid place-items-center size-10 border border-border bg-background group-hover:bg-foreground group-hover:text-background transition">
                      <Icon size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-base font-semibold leading-tight">{it.label}</p>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{it.desc}</p>
                    </div>
                    <ArrowUpRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background max-h-[80vh] overflow-y-auto no-scrollbar">
          <nav className="container-x flex flex-col py-2">
            {NAV.map((item) => (
              <div key={item.to} className="border-b border-border last:border-0 py-2">
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-base font-medium text-foreground"
                >
                  {item.label}
                </Link>
                {item.drop && (
                  <ul className="ml-1 mb-2 grid gap-1">
                    {item.drop.items.map(({ icon: Icon, ...it }) => (
                      <li key={it.label}>
                        <Link
                          to={it.to}
                          hash={it.hash}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 py-2 text-sm text-muted-foreground"
                        >
                          <Icon size={14} /> {it.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-4 mb-3 justify-center">
              Let's talk <ArrowUpRight size={14} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
