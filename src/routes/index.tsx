import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Download, Github, Linkedin } from "lucide-react";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Liyat Tesfaye — Frontend Developer & UI/UX Designer" },
      { name: "description", content: "Portfolio home — Liyat Tesfaye, frontend developer and designer." },
      { property: "og:title", content: "Liyat Tesfaye — Portfolio" },
      { property: "og:description", content: "Portfolio home — frontend developer and designer." },
      { property: "og:image", content: "/images/hero-image.png" },
    ],
  }),
  component: Home,
});

const skills = [
  { name: "Angular", img: "/images/angular.png" },
  { name: "React", img: "/images/react.png" },
  { name: "Python", img: "/images/python.png" },
  { name: "Linux", img: "/images/linux.png" },
  { name: "Figma", img: "/images/figma.png" },
  { name: "Node.js", img: "/images/node.png" },
  { name: "MySQL", img: "/images/mysql.png" },
  { name: "Git", img: "/images/gitcircle.png" },
];

const works = [
  { title: "Tropical Travel Web UI Design", img: "/images/work1.jpg", demo: "https://www.figma.com/proto/P13uWgQnKpxVQ2muYkuMTa/Tropical", github: "https://github.com/liyat-1" },
  { title: "EMCCMO For Ethiopian Musicians Royalty", img: "/images/work2.png", demo: "https://ememrc.com/", github: "https://github.com/liyat-1" },
  { title: "Apple Vision Pro UI Design", img: "/images/work3.jpg", demo: "https://www.figma.com/proto/lBpwEqpKXPyzTRD8ydjzNX/Untitled", github: "https://github.com/liyat-1" },
  { title: "Tom Ford Product Display Website", img: "/images/work4.jpg", demo: "https://tomford.netlify.app/", github: "https://github.com/liyat-1" },
  { title: "Music Player", img: "/images/work5.png", demo: "https://whenwedisco.netlify.app/", github: "https://github.com/liyat-1" },
  { title: "Abol Coffee Shop & Center Static Web", img: "/images/work6.png", demo: "https://abolcoffee.netlify.app/", github: "https://github.com/liyat-1" },
];

function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="container-x pt-10 md:pt-16 pb-20 md:pb-28">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-16 items-center">
          <div>
            <p className="eyebrow text-muted-foreground">Portfolio — 2026</p>
            <h1 className="mt-5 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tighter">
              Liyat<br />Tesfaye.
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              A frontend developer and UI/UX designer crafting precise, minimal
              interfaces — where code meets composition.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about" className="btn-primary">
                About me <ArrowUpRight size={16} />
              </Link>
              <a href="/file/Liyat_Tesfaye_CV.pdf" download className="btn-ghost">
                <Download size={16} /> Download CV
              </a>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid place-items-center size-10 border border-border hover:bg-foreground hover:text-background transition"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://github.com/liyat-1"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid place-items-center size-10 border border-border hover:bg-foreground hover:text-background transition"
              >
                <Github size={16} />
              </a>
              <div className="h-px flex-1 bg-border ml-2" />
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                Available
              </p>
            </div>
          </div>

          <div className="relative">
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
              <p className="eyebrow text-muted-foreground">Toolbox / 01</p>
              <h2 className="mt-3 text-3xl md:text-5xl">Skills I work with</h2>
            </div>
            <Link to="/about" className="text-sm font-medium underline underline-offset-4 hover:text-muted-foreground">
              See all skills →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 border border-border bg-background">
            {skills.map((s) => (
              <div
                key={s.name}
                className="flex flex-col items-center justify-center gap-3 p-6 border-b border-r border-border last:border-r-0 hover:bg-surface transition"
              >
                <img src={s.img} alt={s.name} className="size-10 object-contain" />
                <p className="text-xs font-medium">{s.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Works */}
      <section className="section-pad">
        <div className="container-x">
          <div className="flex items-end justify-between mb-10 md:mb-14 flex-wrap gap-4">
            <div className="max-w-2xl">
              <p className="eyebrow text-muted-foreground">Selected Works / 02</p>
              <h2 className="mt-3 text-3xl md:text-5xl">Recent projects</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              A curated selection of recent work — showcasing skill, creativity,
              and dedication.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {works.map((w) => (
              <article
                key={w.title}
                className="group bg-background overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-surface">
                  <img
                    src={w.img}
                    alt={w.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                </div>
                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <h3 className="font-display text-lg font-semibold tracking-tight">{w.title}</h3>
                  <div className="mt-5 flex gap-2">
                    <a href={w.github} target="_blank" rel="noreferrer" className="flex-1 text-center border border-border px-4 py-2.5 text-xs font-semibold hover:bg-surface transition">
                      GitHub
                    </a>
                    <a href={w.demo} target="_blank" rel="noreferrer" className="flex-1 text-center bg-foreground text-background px-4 py-2.5 text-xs font-semibold hover:bg-foreground/85 transition">
                      Live Demo
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CV CTA */}
      <section className="container-x pb-20 md:pb-28">
        <div className="border border-border bg-foreground text-background p-8 md:p-14 grid md:grid-cols-[1fr_auto] items-center gap-8">
          <div>
            <p className="eyebrow !text-background/60">CV / Resume</p>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl tracking-tighter">
              See my expertise at a glance.
            </h2>
            <p className="mt-4 text-background/70 max-w-xl">
              Download my full CV or browse the highlights on the resume page.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/file/Liyat_Tesfaye_CV.pdf"
              download
              className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3.5 text-sm font-semibold border border-background hover:bg-transparent hover:text-background transition"
            >
              <Download size={16} /> Download CV
            </a>
            <Link
              to="/resume"
              className="inline-flex items-center gap-2 border border-background/30 text-background px-6 py-3.5 text-sm font-semibold hover:border-background transition"
            >
              View Resume <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
