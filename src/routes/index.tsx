import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowUpRight, Download, Github, Linkedin, Code2, Figma, Palette,
  ExternalLink, Eye, Sparkles, Atom, Terminal, Database, GitBranch, Boxes, Cpu,
} from "lucide-react";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Liyat Tesfaye — Frontend Developer & UI/UX Designer" },
      { name: "description", content: "Portfolio of Liyat Tesfaye — frontend developer and UI/UX designer crafting considered interfaces." },
      { property: "og:title", content: "Liyat Tesfaye — Portfolio" },
      { property: "og:description", content: "Frontend developer and UI/UX designer crafting considered interfaces." },
      { property: "og:image", content: "/images/hero-image.png" },
    ],
  }),
  component: Home,
});

const skills = [
  { name: "React", icon: Atom },
  { name: "TypeScript", icon: Code2 },
  { name: "Angular", icon: Boxes },
  { name: "Figma", icon: Figma },
  { name: "Python", icon: Terminal },
  { name: "Linux", icon: Cpu },
  { name: "PostgreSQL", icon: Database },
  { name: "Git", icon: GitBranch },
];

type Work = {
  title: string; img: string; category: "Frontend" | "Figma" | "Framer";
  primaryHref: string; primaryLabel: string; primaryIcon: typeof ExternalLink;
  secondaryHref: string; secondaryLabel: string; secondaryIcon: typeof ExternalLink;
};

const works: Work[] = [
  { title: "Tropical Travel Web UI", img: "/images/work1.jpg", category: "Figma",
    primaryHref: "https://www.figma.com/proto/P13uWgQnKpxVQ2muYkuMTa/Tropical", primaryLabel: "Open in Figma", primaryIcon: Figma,
    secondaryHref: "https://www.figma.com/proto/P13uWgQnKpxVQ2muYkuMTa/Tropical", secondaryLabel: "View prototype", secondaryIcon: Eye },
  { title: "EMCCMO Royalty Platform", img: "/images/work2.png", category: "Frontend",
    primaryHref: "https://ememrc.com/", primaryLabel: "Visit site", primaryIcon: ExternalLink,
    secondaryHref: "https://github.com/liyat-1", secondaryLabel: "Source code", secondaryIcon: Github },
  { title: "Apple Vision Pro UI", img: "/images/work3.jpg", category: "Figma",
    primaryHref: "https://www.figma.com/proto/lBpwEqpKXPyzTRD8ydjzNX/Untitled", primaryLabel: "Open in Figma", primaryIcon: Figma,
    secondaryHref: "https://www.figma.com/proto/lBpwEqpKXPyzTRD8ydjzNX/Untitled", secondaryLabel: "View prototype", secondaryIcon: Eye },
  { title: "Tom Ford Product Display", img: "/images/work4.jpg", category: "Frontend",
    primaryHref: "https://tomford.netlify.app/", primaryLabel: "Visit site", primaryIcon: ExternalLink,
    secondaryHref: "https://github.com/liyat-1", secondaryLabel: "Source code", secondaryIcon: Github },
  { title: "Disco Music Player", img: "/images/work5.png", category: "Framer",
    primaryHref: "https://whenwedisco.netlify.app/", primaryLabel: "Live preview", primaryIcon: ExternalLink,
    secondaryHref: "https://whenwedisco.netlify.app/", secondaryLabel: "Open in Framer", secondaryIcon: Palette },
  { title: "Abol Coffee Center", img: "/images/work6.png", category: "Frontend",
    primaryHref: "https://abolcoffee.netlify.app/", primaryLabel: "Visit site", primaryIcon: ExternalLink,
    secondaryHref: "https://github.com/liyat-1", secondaryLabel: "Source code", secondaryIcon: Github },
];

const TABS = ["All", "Frontend", "Figma", "Framer"] as const;
type Tab = typeof TABS[number];
const TAB_ICONS: Record<Tab, typeof Code2> = { All: Sparkles, Frontend: Code2, Figma: Figma, Framer: Palette };

function Home() {
  const [tab, setTab] = useState<Tab>("All");
  const filtered = tab === "All" ? works : works.filter((w) => w.category === tab);

  return (
    <Layout>
      {/* Hero */}
      <section className="container-x pt-8 md:pt-12 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-16 items-center">
          <div>
            <p className="eyebrow text-muted-foreground reveal">Portfolio · 2026</p>
            <h1 className="mt-5 font-display text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] leading-[0.92] tracking-tighter reveal" style={{ animationDelay: "60ms" }}>
              Liyat<br />Tesfaye.
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed reveal" style={{ animationDelay: "140ms" }}>
              A frontend developer and UI/UX designer crafting precise, minimal interfaces — where code meets composition.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 reveal" style={{ animationDelay: "220ms" }}>
              <Link to="/about" className="btn-primary">About me <ArrowUpRight size={16} /></Link>
              <a href="/file/Liyat_Tesfaye_CV.pdf" download className="btn-ghost"><Download size={16} /> Download CV</a>
            </div>

            <div className="mt-10 flex items-center gap-3 reveal" style={{ animationDelay: "300ms" }}>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"
                className="grid place-items-center size-10 border border-border hover:bg-foreground hover:text-background transition"><Linkedin size={16} /></a>
              <a href="https://github.com/liyat-1" target="_blank" rel="noreferrer" aria-label="GitHub"
                className="grid place-items-center size-10 border border-border hover:bg-foreground hover:text-background transition"><Github size={16} /></a>
              <div className="h-px flex-1 bg-border ml-2" />
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-foreground animate-pulse" /> Available
              </p>
            </div>
          </div>

          <div className="relative reveal" style={{ animationDelay: "180ms" }}>
            <div className="relative aspect-[4/5] overflow-hidden border border-border bg-surface">
              <img src="/images/hero-image.png" alt="Liyat Tesfaye" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-px left-0 border border-border bg-background px-5 py-4">
              <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">2+ years</p>
              <p className="font-display text-lg font-semibold">Frontend craft</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section-pad border-y border-border bg-surface">
        <div className="container-x">
          <div className="flex items-end justify-between mb-10 md:mb-14 flex-wrap gap-4">
            <div>
              <p className="eyebrow text-muted-foreground">Toolbox · 01</p>
              <h2 className="mt-3 font-display text-3xl md:text-5xl tracking-tighter">Skills I work with.</h2>
            </div>
            <Link to="/about" className="text-sm font-medium underline underline-offset-4 hover:text-muted-foreground">
              See all skills →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 border border-border bg-background">
            {skills.map((s) => (
              <div key={s.name} className="group flex flex-col items-center justify-center gap-3 p-6 border-b border-r border-border last:border-r-0 hover:bg-surface transition">
                <s.icon size={28} strokeWidth={1.5} className="group-hover:scale-110 transition" />
                <p className="text-xs font-medium">{s.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Works */}
      <section className="section-pad">
        <div className="container-x">
          <div className="flex items-end justify-between mb-8 md:mb-12 flex-wrap gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow text-muted-foreground">Selected Works · 02</p>
              <h2 className="mt-3 font-display text-3xl md:text-5xl tracking-tighter">Recent projects.</h2>
            </div>
            <div className="inline-flex border border-border bg-background p-1">
              {TABS.map((t) => {
                const Icon = TAB_ICONS[t];
                return (
                  <button key={t} onClick={() => setTab(t)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold transition ${
                      tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                    }`}>
                    <Icon size={13} /> {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {filtered.map((w) => {
              const PIcon = w.primaryIcon;
              const SIcon = w.secondaryIcon;
              return (
                <article key={w.title} className="group bg-background overflow-hidden flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden bg-surface">
                    <img src={w.img} alt={w.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                  </div>
                  <div className="p-5 md:p-6 flex flex-col flex-1 border-t border-border">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{w.category}</p>
                    <h3 className="mt-2 font-display text-lg font-semibold tracking-tight">{w.title}</h3>
                    <div className="mt-5 flex gap-2">
                      <a href={w.primaryHref} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-1.5 bg-foreground text-background px-3 py-2.5 text-xs font-semibold hover:bg-foreground/85 transition">
                        <PIcon size={13} /> {w.primaryLabel}
                      </a>
                      <a href={w.secondaryHref} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-1.5 border border-border px-3 py-2.5 text-xs font-semibold hover:bg-surface transition">
                        <SIcon size={13} /> {w.secondaryLabel}
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CV CTA */}
      <section className="container-x pb-20 md:pb-28">
        <div className="border border-border bg-foreground text-background p-8 md:p-14 grid md:grid-cols-[1fr_auto] items-center gap-8">
          <div>
            <p className="eyebrow !text-background/60">CV / Resume</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl tracking-tighter">
              See my expertise at a glance.
            </h2>
            <p className="mt-4 text-background/70 max-w-xl">
              Download my full CV or browse the highlights on the resume page.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/file/Liyat_Tesfaye_CV.pdf" download
              className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3.5 text-sm font-semibold border border-background hover:bg-transparent hover:text-background transition">
              <Download size={16} /> Download CV
            </a>
            <Link to="/resume" className="inline-flex items-center gap-2 border border-background/30 text-background px-6 py-3.5 text-sm font-semibold hover:border-background transition">
              View Resume <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
