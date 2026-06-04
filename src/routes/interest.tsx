import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageIntro } from "@/components/site/Layout";

export const Route = createFileRoute("/interest")({
  head: () => ({
    meta: [
      { title: "Interests — Liyat Tesfaye" },
      { name: "description", content: "Art, space, and books that inspire Liyat." },
      { property: "og:title", content: "Interests — Liyat Tesfaye" },
      { property: "og:description", content: "Art, space, and books." },
    ],
  }),
  component: Interest,
});

const books = [
  { img: "/images/threebody.jpg", title: "The Three-Body Problem", text: "Liu Cixin explores humanity's response to an impending alien invasion, blending science and philosophy." },
  { img: "/images/theidiot.jpg", title: "The Idiot", text: "Dostoevsky's profound tale of love, morality, and the struggle for goodness in a flawed world." },
  { img: "/images/wutheringheights.jpg", title: "Wuthering Heights", text: "Emily Brontë's timeless story of passion, vengeance, and the haunting power of love." },
];

function Interest() {
  return (
    <Layout>
      <PageIntro eyebrow="My Canvas" title="Art" />

      {/* Art */}
      <section id="art" className="container-x pb-20 pt-10 md:pt-14">
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <div className="grid gap-4 md:gap-6">
            <img src="/images/art-image1.jfif" alt="Art" className="border border-border w-full object-cover aspect-[4/5]" />
            <img src="/images/art-image2.jfif" alt="Art" className="border border-border w-full object-cover aspect-[4/3]" />
          </div>
          <div className="grid gap-4 md:gap-6">
            <img src="/images/art-image3.jfif" alt="Art" className="border border-border w-full object-cover aspect-[4/3]" />
            <div className="border border-border bg-surface p-8">
              <p className="text-base md:text-lg leading-relaxed">
                I have a deep love for art, especially paintings. Each piece
                speaks to me in unique ways — here are some of my favorite
                collections that inspire and captivate me.
              </p>
            </div>
            <img src="/images/art-image5.jpg" alt="Art" className="border border-border w-full object-cover aspect-[4/5]" />
          </div>
        </div>
      </section>

      {/* Space */}
      <section id="space" className="border-t border-border bg-surface section-pad">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow text-muted-foreground">Space</p>
            <h2 className="mt-3 text-3xl md:text-5xl">A Journey Beyond</h2>
          </div>

          <div className="mt-10 md:mt-14 grid lg:grid-cols-[1.2fr_0.8fr] gap-px bg-border border border-border">
            <div className="overflow-hidden aspect-video bg-black">
              <video muted loop autoPlay playsInline className="w-full h-full object-cover">
                <source src="/videos/video1.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="bg-background p-8 md:p-10 flex flex-col justify-center">
              <p className="text-base md:text-lg leading-relaxed">
                Space has always fascinated humanity, with its vastness and
                mysteries waiting to be uncovered. It reminds us of our small
                yet significant place in the universe.
              </p>
            </div>
          </div>

          <div className="mt-px grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-border border border-border border-t-0">
            <figure className="bg-background">
              <img src="/images/space-image1.jfif" alt="Galaxy" className="w-full h-56 object-cover" />
              <figcaption className="p-5 text-sm text-muted-foreground border-t border-border">
                Galaxies swirl in the endless void, painting the universe with brilliance.
              </figcaption>
            </figure>
            <figure className="bg-background">
              <img src="/images/space-image2.jfif" alt="Nebula" className="w-full h-56 object-cover" />
              <figcaption className="p-5 text-sm text-muted-foreground border-t border-border">
                Nebulas showcase the beauty of star formation, where chaos gives birth to light.
              </figcaption>
            </figure>
            <figure className="bg-background sm:col-span-2 md:col-span-1">
              <video muted loop autoPlay playsInline className="w-full h-56 object-cover">
                <source src="/videos/video2.mp4" type="video/mp4" />
              </video>
              <figcaption className="p-5 text-sm text-muted-foreground border-t border-border">
                Star clusters illuminate the sky, revealing the unity of celestial bodies.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Books */}
      <section id="books" className="section-pad">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow text-muted-foreground">Books</p>
            <h2 className="mt-3 text-3xl md:text-5xl">Windows to Other Worlds</h2>
          </div>

          <div className="mt-10 md:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {books.map((b) => (
              <article key={b.title} className="bg-background overflow-hidden flex flex-col">
                <div className="aspect-[3/4] overflow-hidden bg-surface">
                  <img src={b.img} alt={b.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex-1 flex flex-col border-t border-border">
                  <h3 className="font-display text-lg font-semibold tracking-tight">{b.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground flex-1 leading-relaxed">{b.text}</p>
                  <button className="btn-primary mt-5 self-start !py-2.5 !px-5">
                    Read Book
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
