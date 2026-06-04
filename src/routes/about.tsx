import { createFileRoute } from "@tanstack/react-router";
import { Camera, Film, Pencil, BookOpen, Music, Languages, Check } from "lucide-react";
import { Layout, PageIntro } from "@/components/site/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Liyat Tesfaye" },
      { name: "description", content: "Learn about Liyat Tesfaye — background, skills and hobbies." },
      { property: "og:title", content: "About — Liyat Tesfaye" },
      { property: "og:description", content: "Background, skills and hobbies." },
    ],
  }),
  component: About,
});

const stats = [
  { img: "/images/experience.png", title: "Experience", text: "2+ years Frontend Development" },
  { img: "/images/education1.png", title: "Education", text: "B.Sc. in Software Engineering" },
  { img: "/images/education2.jpg", title: "Education", text: "Certification in Ethical Hacking" },
  { img: "/images/education3.webp", title: "Education", text: "Nano Degree in Data Analysis" },
];

const skillGroups = [
  {
    title: "Frontend Development",
    items: [
      ["HTML", "Experienced"], ["CSS", "Experienced"], ["SASS", "Intermediate"],
      ["JavaScript", "Basic"], ["React", "Basic"], ["Angular", "Intermediate"],
    ],
  },
  {
    title: "Back-End Development",
    items: [
      ["Laravel", "Basic"], ["PostgreSQL", "Basic"], ["MySQL", "Experienced"],
      ["Node JS", "Intermediate"], ["Express JS", "Intermediate"], ["Git", "Intermediate"],
    ],
  },
  {
    title: "Cybersecurity",
    items: [
      ["Linux", "Intermediate"], ["RedHat", "Intermediate"], ["Kali Linux", "Intermediate"],
      ["PenTesting", "Intermediate"], ["Wireshark", "Intermediate"], ["Metasploit", "Intermediate"],
    ],
  },
  {
    title: "UI/UX Design",
    items: [
      ["Figma", "Intermediate"], ["Canva", "Intermediate"], ["Photoshop", "Intermediate"],
      ["Sketch", "Intermediate"], ["Adobe XD", "Intermediate"], ["InVision", "Intermediate"],
    ],
  },
] as const;

const hobbies = [
  { img: "/images/hobbie1.png", items: [{ icon: Camera, label: "Photography" }, { icon: Film, label: "Movies" }] },
  { img: "/images/hobbie2.png", items: [{ icon: Pencil, label: "Sketching" }, { icon: BookOpen, label: "Reading Books" }] },
  { img: "/images/hobbie3.png", items: [{ icon: Music, label: "Exploring Music" }, { icon: Languages, label: "Learning Languages" }] },
];

function About() {
  return (
    <Layout>
      <PageIntro eyebrow="Get to know more" title="About Me" />

      {/* Profile + stats */}
      <section className="container-x grid md:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-14 items-start pb-20 pt-12 md:pt-16">
        <div className="relative">
          <div className="relative aspect-square overflow-hidden border border-border bg-surface">
            <img src="/images/hero-image.png" alt="Liyat" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-px bg-border border border-border">
          {stats.map((s, i) => (
            <div key={i} className="bg-background p-6 md:p-7">
              <img src={s.img} alt="" className="size-9 object-cover" />
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="about-skills" className="section-pad border-t border-border bg-surface">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow text-muted-foreground">Explore my</p>
            <h2 className="mt-3 text-3xl md:text-5xl">Skills</h2>
          </div>

          <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-px bg-border border border-border">
            {skillGroups.map((g) => (
              <div key={g.title} className="bg-background p-6 md:p-8">
                <h3 className="text-lg font-semibold mb-5 pb-3 border-b border-border">{g.title}</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {g.items.map(([name, level]) => (
                    <div key={name} className="flex items-start gap-3 py-1">
                      <span className="mt-0.5 grid place-items-center size-5 bg-foreground text-background">
                        <Check size={12} />
                      </span>
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
            <p className="eyebrow text-muted-foreground">Into my…</p>
            <h2 className="mt-3 text-3xl md:text-5xl">Hobbies</h2>
          </div>

          <div className="mt-10 md:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {hobbies.map((h, i) => (
              <div key={i} className="bg-background overflow-hidden flex flex-col">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={h.img} alt="" className="w-full h-full object-cover" />
                </div>
                <ul className="p-6 space-y-3 border-t border-border">
                  {h.items.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-3 text-sm font-medium">
                      <Icon size={16} />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
