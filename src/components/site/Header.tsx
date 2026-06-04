import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/interest", label: "Interest" },
  { to: "/adventure", label: "Adventure" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-background border-b border-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-display text-base font-semibold tracking-tight"
        >
          <span className="grid place-items-center size-8 bg-foreground text-background font-semibold text-sm">
            L
          </span>
          <span className="hidden sm:inline">Liyat Tesfaye</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{
                className:
                  "px-3 py-2 text-sm font-medium text-foreground border-b border-foreground",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden md:inline-flex btn-primary !py-2.5 !px-4"
        >
          Let's talk
        </Link>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden grid place-items-center size-10 border border-border text-foreground"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container-x flex flex-col py-2">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="px-1 py-4 text-base font-medium text-foreground/80 hover:text-foreground border-b border-border last:border-0"
                activeProps={{
                  className:
                    "px-1 py-4 text-base font-semibold text-foreground border-b border-border last:border-0",
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-4 mb-3 justify-center"
            >
              Let's talk
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
