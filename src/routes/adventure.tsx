import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Check, Github } from "lucide-react";
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
  { img: "/images/paris.jpg", label: "Paris, France — The City of Light" },
  { img: "/images/japan.jpg", label: "Tokyo, Japan — Tradition meets Innovation" },
  { img: "/images/newyork.jpg", label: "New York City — The City That Never Sleeps" },
  { img: "/images/maldives.jpg", label: "Maldives — A Tropical Paradise" },
  { img: "/images/safrica.jpg", label: "Cape Town — Beauty and Culture" },
  { img: "/images/sydney.jpg", label: "Sydney — Iconic Landmarks & Beaches" },
  { img: "/images/korea.jpg", label: "Seoul — Vibrant Culture & Skyscrapers" },
  { img: "/images/bali.jpg", label: "Bali — Temples and Beaches" },
];

const experiences = [
  {
    title: "UI/UX Design",
    rows: [
      ["Wireframing", "2 years creating wireframes in Figma and Adobe XD."],
      ["Prototyping", "Designed interactive prototypes for client presentations."],
      ["User Testing", "Conducted usability testing to improve interfaces."],
    ],
  },
  {
    title: "Python Programming",
    rows: [
      ["Data Analysis", "2 years analyzing datasets with Pandas and Matplotlib."],
      ["Web Development", "Backend systems using Django and Flask."],
      ["Automation", "Scripts to automate repetitive tasks."],
    ],
  },
  {
    title: "Angular & React",
    rows: [
      ["Frontend Dev", "1.5 years building responsive SPAs."],
      ["State Management", "Worked with Redux and RxJS."],
      ["Component Design", "Designed and built reusable UI components."],
    ],
  },
  {
    title: "Linux Systems",
    rows: [
      ["Server Management", "2 years managing Linux servers for hosting."],
      ["Scripting", "Automated tasks using Bash and Python."],
      ["Networking", "Configured and maintained network settings."],
    ],
  },
];

const projects = [
  { img: "/images/work2.png", href: "https://ememrc.com/", label: "EMCCMO" },
  { img: "/images/work6.png", href: "https://abolcoffee.netlify.app/", label: "Abol Coffee" },
  { img: "/images/work4.jpg", href: "https://tomford.netlify.app/", label: "Tom Ford" },
];

function Adventure() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) =>
    galleryRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });

  return (
    <Layout>
      <PageIntro eyebrow="Dream Destinations" title="Travel" />

      <section id="travel" className="container-x pb-20 pt-10 md:pt-14">
        <p className="text-muted-foreground max-w-2xl text-base">
          I've never been outside Ethiopia, but the world is full of incredible
          places I'd love to explore. Here are some dream destinations.
        </p>

        <div className="relative mt-10">
          <div
            ref={galleryRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-5 px-5 md:-mx-8 md:px-8"
          >
            {destinations.map((d) => (
              <div
                key={d.label}
                className="snap-start shrink-0 w-[260px] sm:w-[320px] overflow-hidden border border-border bg-background"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={d.img} alt={d.label} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
                </div>
                <p className="p-5 text-sm border-t border-border">{d.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 hidden sm:flex gap-2 justify-end">
            <button
              onClick={() => scroll(-1)}
              aria-label="Scroll left"
              className="grid place-items-center size-11 border border-border hover:bg-foreground hover:text-background transition"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Scroll right"
              className="grid place-items-center size-11 border border-border hover:bg-foreground hover:text-background transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="border-t border-border bg-surface section-pad">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow text-muted-foreground">My…</p>
            <h2 className="mt-3 text-3xl md:text-5xl">Experience</h2>
          </div>

          <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-px bg-border border border-border">
            {experiences.map((e) => (
              <div key={e.title} className="bg-background p-6 md:p-8">
                <h3 className="font-display text-xl font-semibold tracking-tight pb-3 border-b border-border">{e.title}</h3>
                <div className="mt-2 divide-y divide-border">
                  {e.rows.map(([skill, detail]) => (
                    <div key={skill} className="py-4 grid sm:grid-cols-[140px_1fr] gap-2 sm:gap-4 items-start">
                      <div className="flex items-center gap-2">
                        <Check size={14} />
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
          <div className="max-w-2xl">
            <p className="eyebrow text-muted-foreground">Dive into</p>
            <h2 className="mt-3 text-3xl md:text-5xl">Exciting Projects</h2>
          </div>

          <div className="mt-10 md:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {projects.map((p) => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group bg-background overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.label} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                </div>
                <div className="p-5 flex items-center justify-between border-t border-border">
                  <p className="font-display text-base font-semibold">{p.label}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium">
                    See more <ArrowUpRight size={14} />
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 flex justify-start">
            <a
              href="https://github.com/liyat-1"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              <Github size={16} /> Visit GitHub
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
