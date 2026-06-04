import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, ExternalLink, Github } from "lucide-react";
import { Layout, PageIntro } from "@/components/site/Layout";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume — Liyat Tesfaye" },
      { name: "description", content: "GitHub, projects, and downloadable resume." },
      { property: "og:title", content: "Resume — Liyat Tesfaye" },
      { property: "og:description", content: "Resume, GitHub and projects." },
    ],
  }),
  component: Resume,
});

const works = [
  { title: "Tropical Travel Web UI Design", img: "/images/work1.jpg", demo: "https://www.figma.com/proto/P13uWgQnKpxVQ2muYkuMTa/Tropical" },
  { title: "EMCCMO For Ethiopian Musicians Royalty", img: "/images/work2.png", demo: "https://ememrc.com/" },
  { title: "Apple Vision Pro UI Design", img: "/images/work3.jpg", demo: "https://www.figma.com/proto/lBpwEqpKXPyzTRD8ydjzNX/Untitled" },
  { title: "Tom Ford Product Display Website", img: "/images/work4.jpg", demo: "https://tomford.netlify.app/" },
  { title: "Music Player", img: "/images/work5.png", demo: "https://whenwedisco.netlify.app/" },
  { title: "Abol Coffee Shop & Center", img: "/images/work6.png", demo: "https://abolcoffee.netlify.app/" },
];

function Resume() {
  return (
    <Layout>
      <PageIntro eyebrow="Check out my" title="GitHub" />

      <section id="github" className="container-x pb-20 pt-10 md:pt-14">
        <p className="text-muted-foreground max-w-2xl text-base">
          Explore my GitHub repository to see the projects I've been working
          on — from creative web designs to innovative solutions.
        </p>

        <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-px bg-border border border-border">
          <div className="overflow-hidden bg-background">
            <img src="/images/liyat-github.jpg" alt="GitHub" className="w-full h-full object-cover" />
          </div>
          <div className="bg-background p-8 md:p-10 flex flex-col justify-center">
            <Github className="size-9" />
            <h3 className="mt-5 text-2xl md:text-3xl font-semibold tracking-tight">Visit my GitHub</h3>
            <p className="mt-3 text-muted-foreground text-sm md:text-base">
              Source code, experiments, and open contributions live here.
            </p>
            <a
              href="https://github.com/liyat-1"
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-6 self-start"
            >
              github.com/liyat-1 <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="border-t border-border bg-surface section-pad">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow text-muted-foreground">Check out my</p>
            <h2 className="mt-3 text-3xl md:text-5xl">Projects</h2>
            <p className="mt-4 text-muted-foreground text-sm md:text-base">
              A curated selection of recent works showcasing skill, creativity,
              and dedication.
            </p>
          </div>

          <div className="mt-10 md:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {works.map((w) => (
              <article key={w.title} className="bg-background overflow-hidden group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={w.img} alt={w.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                </div>
                <div className="p-5 border-t border-border">
                  <h3 className="font-display text-base font-semibold tracking-tight">{w.title}</h3>
                  <a
                    href={w.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-4"
                  >
                    Live Demo <ExternalLink size={13} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CV */}
      <section id="cv" className="section-pad">
        <div className="container-x grid md:grid-cols-[1fr_1.2fr] gap-px bg-border border border-border">
          <div className="overflow-hidden bg-background">
            <img src="/images/cv-image.webp" alt="CV" className="w-full h-full object-cover" />
          </div>
          <div className="bg-background p-8 md:p-12 flex flex-col justify-center">
            <p className="eyebrow text-muted-foreground">Check out my</p>
            <h2 className="mt-3 text-3xl md:text-5xl tracking-tighter">CV / Resume</h2>
            <p className="mt-4 text-muted-foreground max-w-lg text-sm md:text-base">
              Discover my expertise and accomplishments at a glance. Download
              the full document or get in touch to learn more.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/file/Liyat_Tesfaye_CV.pdf"
                download
                className="btn-primary"
              >
                <Download size={16} /> Download CV
              </a>
              <Link to="/contact" className="btn-ghost">
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
