import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  ArrowUpRight, ChevronLeft, ChevronRight, Check, Github,
  Code2, Figma, Palette, ExternalLink, Eye,
} from "lucide-react";
import { Layout, PageIntro } from "@/components/site/Layout";

export const Route = createFileRoute("/adventure")({
  head: () => ({
    meta: [
      { title: "Adventure — Liyat Tesfaye" },
      { name: "description", content: "Dream destinations, experience, and exciting projects." },
      { property: "og:title", content: "Adventure — Liyat Tesfaye" },
      { property: "og:description", content: "Travel, experience, and projects." },
    ],
  }),
  component: Adventure,
});

const destinations = [
  { img: "/images/paris.jpg", label: "Paris, France", sub: "The City of Light" },
  { img: "/images/japan.jpg", label: "Tokyo, Japan", sub: "Tradition meets innovation" },
  { img: "/images/newyork.jpg", label: "New York City", sub: "The city that never sleeps" },
  { img: "/images/maldives.jpg", label: "Maldives", sub: "A tropical paradise" },
  { img: "/images/safrica.jpg", label: "Cape Town", sub: "Beauty and culture" },
  { img: "/images/sydney.jpg", label: "Sydney", sub: "Iconic landmarks & beaches" },
  { img: "/images/korea.jpg", label: "Seoul", sub: "Vibrant culture & skyscrapers" },
  { img: "/images/bali.jpg", label: "Bali", sub: "Temples and beaches" },
];

const experiences = [
  { title: "UI/UX Design", rows: [
    ["Wireframing", "2 years creating wireframes in Figma and Adobe XD."],
    ["Prototyping", "Designed interactive prototypes for client presentations."],
    ["User Testing", "Conducted usability testing to improve interfaces."],
  ]},
  { title: "Python Programming", rows: [
    ["Data Analysis", "2 years analyzing datasets with Pandas and Matplotlib."],
    ["Web Development", "Backend systems using Django and Flask."],
    ["Automation", "Scripts to automate repetitive tasks."],
  ]},
  { title: "Angular & React", rows: [
    ["Frontend Dev", "1.5 years building responsive SPAs."],
    ["State Management", "Worked with Redux and RxJS."],
    ["Component Design", "Designed and built reusable UI components."],
  ]},
  { title: "Linux Systems", rows: [
    ["Server Management", "2 years managing Linux servers for hosting."],
    ["Scripting", "Automated tasks using Bash and Python."],
    ["Networking", "Configured and maintained network settings."],
  ]},
];

type Project = {
  img: string;
  title: string;
  category: "Frontend" | "Figma" | "Framer";
  primaryHref: string;
  primaryLabel: string;
  primaryIcon: typeof ExternalLink;
  secondaryHref?: string;
  secondaryLabel?: string;
  secondaryIcon?: typeof ExternalLink;
};

const projects: Project[] = [
  { img: "/images/work2.png", title: "EMCCMO Royalty Platform", category: "Frontend",
    primaryHref: "https://ememrc.com/", primaryLabel: "Visit site", primaryIcon: ExternalLink,
    secondaryHref: "https://github.com/liyat-1", secondaryLabel: "Source code", secondaryIcon: Github },
  { img: "/images/work6.png", title: "Abol Coffee Center", category: "Frontend",
    primaryHref: "https://abolcoffee.netlify.app/", primaryLabel: "Visit site", primaryIcon: ExternalLink,
    secondaryHref: "https://github.com/liyat-1", secondaryLabel: "Source code", secondaryIcon: Github },
  { img: "/images/work4.jpg", title: "Tom Ford Product Display", category: "Frontend",
    primaryHref: "https://tomford.netlify.app/", primaryLabel: "Visit site", primaryIcon: ExternalLink,
    secondaryHref: "https://github.com/liyat-1", secondaryLabel: "Source code", secondaryIcon: Github },
  { img: "/images/work1.jpg", title: "Tropical Travel Web UI", category: "Figma",
    primaryHref: "https://www.figma.com/proto/P13uWgQnKpxVQ2muYkuMTa/Tropical", primaryLabel: "Open in Figma", primaryIcon: Figma,
    secondaryHref: "https://www.figma.com/proto/P13uWgQnKpxVQ2muYkuMTa/Tropical", secondaryLabel: "View prototype", secondaryIcon: Eye },
  { img: "/images/work3.jpg", title: "Apple Vision Pro UI", category: "Figma",
    primaryHref: "https://www.figma.com/proto/lBpwEqpKXPyzTRD8ydjzNX/Untitled", primaryLabel: "Open in Figma", primaryIcon: Figma,
    secondaryHref: "https://www.figma.com/proto/lBpwEqpKXPyzTRD8ydjzNX/Untitled", secondaryLabel: "View prototype", secondaryIcon: Eye },
  { img: "/images/work5.png", title: "Disco Music Player", category: "Framer",
    primaryHref: "https://whenwedisco.netlify.app/", primaryLabel: "Live preview", primaryIcon: ExternalLink,
    secondaryHref: "https://whenwedisco.netlify.app/", secondaryLabel: "Open in Framer", secondaryIcon: Palette },
];

const TABS = ["All", "Frontend", "Figma", "Framer"] as const;
type Tab = typeof TABS[number];
const TAB_ICONS: Record<Tab, typeof Code2> = { All: ArrowUpRight, Frontend: Code2, Figma: Figma, Framer: Palette };

function Adventure() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<Tab>("All");
  const scroll = (dir: number) =>
    galleryRef.current?.scrollBy({ left: dir * (galleryRef.current.clientWidth * 0.8), behavior: "smooth" });

  const filtered = tab === "All" ? projects : projects.filter((p) => p.category === tab);

  return (
    <Layout>
      <PageIntro
        eyebrow="Dream Destinations · 01"
        title="Travel."
        description="I haven't been outside Ethiopia yet, but the world is full of places I'd love to explore. Here's where I'd start."
      />

      <section id="travel" className="pb-16 pt-8 md:pt-10">
        <div className="relative group">
          <div
            ref={galleryRef}
            className="no-scrollbar flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 px-5 md:px-12"
          >
            {destinations.map((d) => (
              <article
                key={d.label}
                className="snap-start shrink-0 w-[260px] sm:w-[320px] md:w-[360px] overflow-hidden border border-border bg-background hover-lift"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={d.img} alt={d.label} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
                </div>
                <div className="p-5 border-t border-border">
                  <p className="font-display text-lg font-semibold leading-tight">{d.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{d.sub}</p>
                </div>
              </article>
            ))}
          </div>

          <button
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="hidden md:grid place-items-center absolute left-3 top-1/2 -translate-y-1/2 size-12 rounded-full bg-background/95 backdrop-blur border border-border shadow-lg hover:bg-foreground hover:text-background transition opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="hidden md:grid place-items-center absolute right-3 top-1/2 -translate-y-1/2 size-12 rounded-full bg-background/95 backdrop-blur border border-border shadow-lg hover:bg-foreground hover:text-background transition opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={20} />
          </button>

          <div className="mt-5 flex md:hidden gap-2 justify-center">
            <button onClick={() => scroll(-1)} aria-label="Scroll left" className="grid place-items-center size-11 border border-border">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll(1)} aria-label="Scroll right" className="grid place-items-center size-11 border border-border">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="border-t border-border bg-surface section-pad">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow text-muted-foreground">My · 02</p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl tracking-tighter">Experience.</h2>
          </div>

          <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-px bg-border border border-border">
            {experiences.map((e) => (
              <div key={e.title} className="bg-background p-6 md:p-8 hover-lift">
                <h3 className="font-display text-xl font-semibold tracking-tight pb-3 border-b border-border">{e.title}</h3>
                <div className="mt-2 divide-y divide-border">
                  {e.rows.map(([skill, detail]) => (
                    <div key={skill} className="py-4 grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-4 items-start">
                      <div className="flex items-center gap-2">
                        <span className="grid place-items-center size-5 bg-foreground text-background"><Check size={12} /></span>
                        <p className="text-sm font-semibold">{skill}</p>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exciting Projects */}
      <section id="exciting" className="section-pad">
        <div className="container-x">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-8 md:mb-12">
            <div className="max-w-2xl">
              <p className="eyebrow text-muted-foreground">Dive into · 03</p>
              <h2 className="mt-3 font-display text-3xl md:text-5xl tracking-tighter">Exciting projects.</h2>
            </div>
            <div className="inline-flex border border-border bg-background p-1">
              {TABS.map((t) => {
                const Icon = TAB_ICONS[t];
                return (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold transition ${
                      tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon size={13} /> {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {filtered.map((p) => {
              const PIcon = p.primaryIcon;
              const SIcon = p.secondaryIcon;
              return (
                <article key={p.title} className="group bg-background overflow-hidden flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                  </div>
                  <div className="p-5 md:p-6 flex flex-col flex-1 border-t border-border">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{p.category}</p>
                    <h3 className="mt-2 font-display text-lg font-semibold tracking-tight">{p.title}</h3>
                    <div className="mt-5 flex gap-2 mt-auto">
                      <a href={p.primaryHref} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-1.5 bg-foreground text-background px-3 py-2.5 text-xs font-semibold hover:bg-foreground/85 transition">
                        <PIcon size={13} /> {p.primaryLabel}
                      </a>
                      {p.secondaryHref && SIcon && (
                        <a href={p.secondaryHref} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-1.5 border border-border px-3 py-2.5 text-xs font-semibold hover:bg-surface transition">
                          <SIcon size={13} /> {p.secondaryLabel}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-10 flex justify-start">
            <a href="https://github.com/liyat-1" target="_blank" rel="noreferrer" className="btn-primary">
              <Github size={16} /> Visit GitHub
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
