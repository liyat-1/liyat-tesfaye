import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Linkedin, Github, MapPin, ArrowUpRight } from "lucide-react";
import { Layout, PageIntro } from "@/components/site/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Liyat Tesfaye" },
      { name: "description", content: "Get in touch with Liyat Tesfaye." },
      { property: "og:title", content: "Contact — Liyat Tesfaye" },
      { property: "og:description", content: "Email, LinkedIn and GitHub." },
    ],
  }),
  component: Contact,
});

const channels = [
  { icon: Mail, label: "Email", value: "example@gmail.com", href: "mailto:example@gmail.com" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/liyat", href: "https://linkedin.com" },
  { icon: Github, label: "GitHub", value: "github.com/liyat-1", href: "https://github.com/liyat-1" },
  { icon: MapPin, label: "Location", value: "Addis Ababa, Ethiopia", href: "#" },
];

const skills = [
  { name: "Angular", img: "/images/angular.png" },
  { name: "Linux", img: "/images/linux.png" },
  { name: "Python", img: "/images/python.png" },
  { name: "React", img: "/images/react.png" },
];

function Contact() {
  return (
    <Layout>
      <PageIntro eyebrow="Get in touch" title="Contact Me" />

      <section id="contact" className="container-x pb-20 pt-10 md:pt-14">
        <p className="max-w-2xl text-muted-foreground text-base">
          Have a project in mind, or just want to say hello? Pick whichever
          channel works best — I'll get back to you soon.
        </p>

        <div className="mt-10 md:mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {channels.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group bg-background p-6 md:p-7 hover:bg-surface transition"
            >
              <div className="flex items-center justify-between">
                <span className="grid place-items-center size-10 border border-border group-hover:bg-foreground group-hover:text-background transition">
                  <Icon size={18} />
                </span>
                <ArrowUpRight className="text-muted-foreground group-hover:text-foreground transition" size={18} />
              </div>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
              <p className="mt-1 font-display text-base font-semibold break-all">{value}</p>
            </a>
          ))}
        </div>
      </section>

      <section id="skills" className="border-t border-border bg-surface section-pad">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow text-muted-foreground">For the following</p>
            <h2 className="mt-3 text-3xl md:text-5xl">Skills</h2>
            <p className="mt-4 text-muted-foreground text-sm md:text-base">
              If you need help with any of these, please feel free to{" "}
              <a href="mailto:example@gmail.com" className="text-foreground underline underline-offset-4">
                contact me
              </a>
              .
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border max-w-3xl">
            {skills.map((s) => (
              <div key={s.name} className="flex flex-col items-center justify-center gap-3 p-6 bg-background">
                <img src={s.img} alt={s.name} className="size-10 object-contain" />
                <p className="text-xs font-medium">{s.name}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 border border-border bg-background p-8 md:p-10 max-w-3xl">
            <p className="text-foreground/90 text-base md:text-lg leading-relaxed">
              For more information about me, my skills, and the projects I've
              done — please check out my resume.
            </p>
            <Link to="/resume" className="btn-primary mt-6">
              View Resume <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
