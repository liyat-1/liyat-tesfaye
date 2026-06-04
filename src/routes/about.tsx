import { createFileRoute } from "@tanstack/react-router";
import {
  Camera, Film, Pencil, BookOpen, Music, Languages, Check,
  Briefcase, GraduationCap, Award, Compass, Lightbulb, Users, ShieldCheck,
} from "lucide-react";
import { Layout, PageIntro } from "@/components/site/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Liyat Tesfaye" },
      { name: "description", content: "Background, skills, values, hobbies and timeline of Liyat Tesfaye." },
      { property: "og:title", content: "About — Liyat Tesfaye" },
      { property: "og:description", content: "Background, skills, values, hobbies and timeline." },
    ],
  }),
  component: About,
});

const stats = [
  { icon: Briefcase, title: "Experience", text: "2+ years Frontend Development" },
  { icon: GraduationCap, title: "Education", text: "B.Sc. in Software Engineering" },
  { icon: ShieldCheck, title: "Certification", text: "Certified in Ethical Hacking" },
  { icon: Award, title: "Nano Degree", text: "Data Analysis specialization" },
];

const skillGroups = [
  { title: "Frontend Development", items: [
    ["HTML", "Experienced"], ["CSS", "Experienced"], ["SASS", "Intermediate"],
    ["JavaScript", "Basic"], ["React", "Basic"], ["Angular", "Intermediate"],
  ]},
  { title: "Back-End Development", items: [
    ["Laravel", "Basic"], ["PostgreSQL", "Basic"], ["MySQL", "Experienced"],
    ["Node JS", "Intermediate"], ["Express JS", "Intermediate"], ["Git", "Intermediate"],
  ]},
  { title: "Cybersecurity", items: [
    ["Linux", "Intermediate"], ["RedHat", "Intermediate"], ["Kali Linux", "Intermediate"],
    ["PenTesting", "Intermediate"], ["Wireshark", "Intermediate"], ["Metasploit", "Intermediate"],
  ]},
  { title: "UI/UX Design", items: [
    ["Figma", "Intermediate"], ["Canva", "Intermediate"], ["Photoshop", "Intermediate"],
    ["Sketch", "Intermediate"], ["Adobe XD", "Intermediate"], ["InVision", "Intermediate"],
  ]},
] as const;

const hobbies = [
  { img: "/images/hobbie1.png", items: [{ icon: Camera, label: "Photography" }, { icon: Film, label: "Movies" }] },
  { img: "/images/hobbie2.png", items: [{ icon: Pencil, label: "Sketching" }, { icon: BookOpen, label: "Reading Books" }] },
  { img: "/images/hobbie3.png", items: [{ icon: Music, label: "Exploring Music" }, { icon: Languages, label: "Learning Languages" }] },
];

const values = [
  { icon: Compass, title: "Clarity over cleverness", desc: "Interfaces should feel obvious. If a user needs a tooltip, I've already failed somewhere upstream." },
  { icon: Lightbulb, title: "Considered, not over-designed", desc: "Every line, color and animation earns its place — or it doesn't ship." },
  { icon: Users, title: "Collaboration first", desc: "The best work happens when design, engineering and product genuinely listen to each other." },
  { icon: ShieldCheck, title: "Ship with integrity", desc: "Accessible, performant, and honest about what the product does and doesn't do." },
];

const timeline = [
  { year: "2026", title: "Independent design & development", body: "Building product-focused websites and interfaces for studios and startups." },
  { year: "2024", title: "Frontend Engineer · EMCCMO", body: "Led the design and build of a royalty platform for Ethiopian musicians." },
  { year: "2023", title: "Certification — Ethical Hacking", body: "Deepened my interest in security and the underlying mechanics of the web." },
  { year: "2022", title: "Nano Degree — Data Analysis", body: "Picked up Python, Pandas and visualization to inform design decisions with data." },
  { year: "2020", title: "B.Sc. Software Engineering", body: "Foundation in algorithms, systems and software architecture." },
];

function About() {
  return (
    <Layout>
      <PageIntro
        eyebrow="Get to know me"
        title="About me."
        description="Frontend developer and UI/UX designer from Addis Ababa, Ethiopia — working at the intersection of code and composition."
      />

      {/* Profile + stats */}
      <section id="about-me" className="container-x grid md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-14 items-start pb-16 pt-8 md:pt-12">
        <div className="relative reveal">
          <div className="relative aspect-square overflow-hidden border border-border bg-surface">
            <img src="/images/hero-image.png" alt="Liyat" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-px bg-border border border-border">
          {stats.map((s) => (
            <div key={s.title} className="bg-background p-6 md:p-7 hover-lift">
              <span className="grid place-items-center size-10 border border-border"><s.icon size={18} /></span>
              <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="about-skills" className="section-pad border-t border-border bg-surface">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow text-muted-foreground">Explore my · 01</p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl tracking-tighter">Skills.</h2>
          </div>

          <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-px bg-border border border-border">
            {skillGroups.map((g) => (
              <div key={g.title} className="bg-background p-6 md:p-8">
                <h3 className="font-display text-lg font-semibold mb-5 pb-3 border-b border-border">{g.title}</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {g.items.map(([name, level]) => (
                    <div key={name} className="flex items-start gap-3 py-1">
                      <span className="mt-0.5 grid place-items-center size-5 bg-foreground text-background"><Check size={12} /></span>
                      <div>
                        <p className="text-sm font-medium">{name}</p>
                        <p className="text-xs text-muted-foreground">{level}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hobbies */}
      <section id="hobbies" className="section-pad">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow text-muted-foreground">Into my · 02</p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl tracking-tighter">Hobbies.</h2>
          </div>

          <div className="mt-10 md:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {hobbies.map((h, i) => (
              <div key={i} className="bg-background overflow-hidden flex flex-col hover-lift">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={h.img} alt="" className="w-full h-full object-cover" />
                </div>
                <ul className="p-6 space-y-3 border-t border-border">
                  {h.items.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-3 text-sm font-medium">
                      <Icon size={16} /> {label}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="section-pad border-t border-border bg-surface">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow text-muted-foreground">What I bring · 03</p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl tracking-tighter">Values.</h2>
            <p className="mt-5 text-muted-foreground max-w-lg">
              A short list of the things I refuse to compromise on, regardless of project size or scope.
            </p>
          </div>
          <div className="mt-10 md:mt-14 grid sm:grid-cols-2 gap-px bg-border border border-border">
            {values.map((v) => (
              <div key={v.title} className="bg-background p-6 md:p-8 hover-lift">
                <span className="grid place-items-center size-10 border border-border"><v.icon size={18} /></span>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{v.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="section-pad border-t border-border">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow text-muted-foreground">Milestones · 04</p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl tracking-tighter">Timeline.</h2>
          </div>
          <ol className="mt-10 md:mt-14 border-l border-border ml-3 md:ml-6">
            {timeline.map((t) => (
              <li key={t.year} className="relative pl-8 md:pl-10 pb-10 last:pb-0">
                <span className="absolute -left-[7px] top-1.5 size-3.5 rounded-full bg-foreground border-4 border-background" />
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{t.year}</p>
                <h3 className="mt-2 font-display text-xl md:text-2xl font-semibold tracking-tight">{t.title}</h3>
                <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">{t.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </Layout>
  );
}
