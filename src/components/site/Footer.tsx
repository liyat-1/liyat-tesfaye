import { Github, Instagram, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const socials = [
  { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
  { href: "https://github.com/liyat-1", label: "GitHub", icon: Github },
  { href: "https://instagram.com", label: "Instagram", icon: Instagram },
  { href: "mailto:liyattesfaye8@gmail.com", label: "Email", icon: Mail },
];

const nav = ["About", "Interest", "Adventure", "Resume", "Blog", "Contact"];

export function Footer() {
  return (
    <footer className="mt-20 md:mt-28 border-t border-border bg-background">
      <div className="container-x py-14 md:py-20 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link to="/" className="font-display text-3xl font-semibold tracking-tighter">
            Liyat Tesfaye
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
            Frontend developer & UI/UX designer crafting considered interfaces from Addis Ababa, Ethiopia.
          </p>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-4">
            Start a project <ArrowUpRight size={14} />
          </Link>
        </div>

        <div>
          <p className="eyebrow text-muted-foreground">Navigate</p>
          <ul className="mt-5 grid grid-cols-2 gap-3 text-sm">
            {nav.map((l) => (
              <li key={l}>
                <Link to={`/${l.toLowerCase()}`} className="text-foreground/80 hover:text-foreground transition">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-muted-foreground">Elsewhere</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid place-items-center size-10 border border-border text-foreground/80 hover:text-background hover:bg-foreground transition"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x py-5 text-xs text-muted-foreground flex flex-col sm:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} Liyat Tesfaye. All rights reserved.</p>
          <p className="font-mono">Designed & built with care · 2026</p>
        </div>
      </div>
    </footer>
  );
}
