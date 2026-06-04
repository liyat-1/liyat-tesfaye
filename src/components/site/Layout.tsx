import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="container-x pt-8 md:pt-10 pb-6 md:pb-8 border-b border-border">
      <p className="eyebrow text-muted-foreground reveal">{eyebrow}</p>
      <h1
        className="mt-3 font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tighter reveal"
        style={{ animationDelay: "60ms" }}
      >
        {title}
      </h1>
      {description && (
        <p
          className="mt-5 max-w-2xl text-base md:text-lg text-muted-foreground reveal"
          style={{ animationDelay: "120ms" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
