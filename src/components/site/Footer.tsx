import { Facebook, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";

const socials = [
  { href: "https://facebook.com", label: "Facebook", icon: Facebook },
  { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
  { href: "https://github.com/liyat-1", label: "GitHub", icon: Github },
  { href: "https://instagram.com", label: "Instagram", icon: Instagram },
  { href: "mailto:example@gmail.com", label: "Email", icon: Mail },
];

export function Footer() {
  return (
    <footer className="mt-20 md:mt-28 border-t border-border bg-background">
      <div className="container-x py-14 md:py-20 grid gap-12 md:grid-cols-3">
        <div>
          <Link to="/" className="font-display text-2xl font-semibold tracking-tight">
            Liyat Tesfaye
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
            Frontend developer & UI/UX designer crafting considered interfaces from Addis Ababa.
          </p>
        </div>

        <div>
          <p className="eyebrow text-muted-foreground">Navigate</p>
          <ul className="mt-5 grid grid-cols-2 gap-3 text-sm">
            {["About", "Interest", "Adventure", "Resume", "Contact"].map((l) => (
              <li key={l}>
                <Link
                  to={`/${l.toLowerCase()}`}
                  className="text-foreground/80 hover:text-foreground transition"
                >
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
          <p className="font-mono">Designed & built with care.</p>
        </div>
      </div>
    </footer>
  );
}
