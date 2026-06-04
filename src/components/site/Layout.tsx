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
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="container-x pt-20 md:pt-28 pb-10 md:pb-14 border-b border-border">
      <p className="eyebrow text-muted-foreground">{eyebrow}</p>
      <h1 className="mt-4 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tighter">
        {title}
      </h1>
    </div>
  );
}
