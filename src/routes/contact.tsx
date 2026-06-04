import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Mail, Linkedin, Github, MapPin, ArrowUpRight, Send, Loader2, CheckCircle2 } from "lucide-react";
import { Layout, PageIntro } from "@/components/site/Layout";
import { submitContact } from "@/lib/contact.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Liyat Tesfaye" },
      { name: "description", content: "Get in touch with Liyat Tesfaye — frontend developer and designer." },
      { property: "og:title", content: "Contact — Liyat Tesfaye" },
      { property: "og:description", content: "Send a message, or reach out on LinkedIn or GitHub." },
    ],
  }),
  component: Contact,
});

const channels = [
  { icon: Mail, label: "Email", value: "liyattesfaye8@gmail.com", href: "mailto:liyattesfaye8@gmail.com" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/liyat", href: "https://linkedin.com" },
  { icon: Github, label: "GitHub", value: "github.com/liyat-1", href: "https://github.com/liyat-1" },
  { icon: MapPin, label: "Location", value: "Addis Ababa, Ethiopia", href: "#" },
];

function Contact() {
  const submit = useServerFn(submitContact);
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");
    const fd = new FormData(e.currentTarget);
    try {
      await submit({
        data: {
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          subject: String(fd.get("subject") || ""),
          message: String(fd.get("message") || ""),
        },
      });
      setState("done");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <Layout>
      <PageIntro
        eyebrow="Get in touch"
        title="Let's talk."
        description="Have a project in mind, want to collaborate, or just feel like saying hello? Drop me a line — I read every message."
      />

      <section className="container-x pb-16 md:pb-20 pt-8 md:pt-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {channels.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group bg-background p-6 md:p-7 hover-lift transition"
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

      <section className="border-t border-border bg-surface section-pad">
        <div className="container-x grid lg:grid-cols-[0.9fr_1.1fr] gap-12 md:gap-16">
          <div>
            <p className="eyebrow text-muted-foreground">Send a message</p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl tracking-tighter">
              Tell me about your project.
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              Your message lands straight in my inbox. I usually reply within 24 hours on weekdays.
            </p>

            <div className="mt-8 grid gap-5">
              {[
                ["Freelance design & development", "Websites, landing pages, product UI"],
                ["Collaboration", "Open to interesting partnerships"],
                ["A friendly hello", "Always nice to meet new people"],
              ].map(([t, d]) => (
                <div key={t} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 grid place-items-center size-5 bg-foreground text-background">
                    <CheckCircle2 size={12} />
                  </span>
                  <div>
                    <p className="font-semibold">{t}</p>
                    <p className="text-muted-foreground">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="bg-background border border-border p-6 md:p-8 grid gap-5"
          >
            <Field label="Your name" name="name" placeholder="Jane Doe" required />
            <Field label="Email" name="email" type="email" placeholder="jane@studio.com" required />
            <Field label="Subject (optional)" name="subject" placeholder="Project, collaboration, etc." />
            <div>
              <label htmlFor="message" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={5000}
                placeholder="Tell me a bit about what you're working on…"
                className="mt-2 w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={state === "loading"}
              className="btn-primary justify-center disabled:opacity-60"
            >
              {state === "loading" ? (
                <><Loader2 size={16} className="animate-spin" /> Sending…</>
              ) : state === "done" ? (
                <><CheckCircle2 size={16} /> Message sent</>
              ) : (
                <>Send message <Send size={14} /></>
              )}
            </button>

            {state === "done" && (
              <p className="text-sm text-foreground">
                Thanks — I'll be in touch shortly at the email you provided.
              </p>
            )}
            {state === "error" && (
              <p className="text-sm text-destructive">{errorMsg || "Could not send. Try again."}</p>
            )}
          </form>
        </div>
      </section>
    </Layout>
  );
}

function Field({
  label, name, type = "text", placeholder, required,
}: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition"
      />
    </div>
  );
}
