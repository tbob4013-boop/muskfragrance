import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Plus,
  Minus,
  Star,
  ArrowRight,
  Trash2,
  Sparkles,
  Heart,
} from "lucide-react";

import heroBottle from "@/assets/hero-bottle.jpg";
import p1 from "@/assets/perfume-1.jpg";
import p2 from "@/assets/perfume-2.jpg";
import p3 from "@/assets/perfume-3.jpg";
import p4 from "@/assets/perfume-4.jpg";
import noteWoody from "@/assets/note-woody.jpg";
import noteSpice from "@/assets/note-spice.jpg";
import noteFruit from "@/assets/note-fruit.jpg";
import noteFloral from "@/assets/note-floral.jpg";
import noteMusk from "@/assets/note-musk.jpg";
import giftImg from "@/assets/gift.jpg";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAISON ANUBIS — Luxury Niche Perfume House" },
      { name: "description", content: "Rare niche fragrances inspired by French haute parfumerie and Egyptian heritage. Discover the collection." },
      { property: "og:title", content: "MAISON ANUBIS — Luxury Scents. Unforgettable Presence." },
      { property: "og:description", content: "Rare niche fragrances inspired by French haute parfumerie and Egyptian heritage." },
      { property: "og:image", content: heroBottle },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Maison Anubis",
          description: "Luxury niche perfume house inspired by French haute parfumerie and Egyptian heritage.",
        }),
      },
    ],
  }),
  component: Home,
});

type Family = "All" | "Oriental" | "Woody" | "Floral" | "Musk";

type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  family: Family;
  notes: { top: string; heart: string; base: string };
  rating: number;
  reviews: number;
};

const PRODUCTS: Product[] = [
  {
    id: "nile-gold",
    name: "Nil d'Or",
    subtitle: "Eau de Parfum · 100ml",
    price: 320,
    image: p1,
    family: "Oriental",
    notes: { top: "Saffron, Bergamot", heart: "Bulgarian Rose, Oud", base: "Amber, Sandalwood" },
    rating: 4.9,
    reviews: 184,
  },
  {
    id: "rose-cairo",
    name: "Rose du Caire",
    subtitle: "Extrait de Parfum · 75ml",
    price: 410,
    image: p2,
    family: "Floral",
    notes: { top: "Pink Pepper, Pear", heart: "Damask Rose, Jasmine", base: "Cashmeran, Musk" },
    rating: 4.8,
    reviews: 211,
  },
  {
    id: "anubis-noir",
    name: "Anubis Noir",
    subtitle: "Extrait de Parfum · 100ml",
    price: 480,
    image: p3,
    family: "Woody",
    notes: { top: "Black Pepper, Incense", heart: "Cambodian Oud, Leather", base: "Vetiver, Tonka" },
    rating: 5.0,
    reviews: 96,
  },
  {
    id: "ombre-musc",
    name: "Ombre Musc",
    subtitle: "Eau de Parfum · 100ml",
    price: 290,
    image: p4,
    family: "Musk",
    notes: { top: "Aldehydes, Mandarin", heart: "Iris, White Musk", base: "Ambroxan, Vanilla" },
    rating: 4.7,
    reviews: 152,
  },
];

const FAMILIES: Family[] = ["All", "Oriental", "Woody", "Floral", "Musk"];

const EXPERIENCES = [
  { name: "Woody", image: noteWoody, desc: "Oud, sandalwood, cedar — the soul of the East." },
  { name: "Spices", image: noteSpice, desc: "Saffron, cardamom, pepper — warmth and intrigue." },
  { name: "Fruits", image: noteFruit, desc: "Bergamot, fig, pear — the first golden impression." },
  { name: "Flowers", image: noteFloral, desc: "Rose, jasmine, iris — petals carved in light." },
  { name: "Musk", image: noteMusk, desc: "White musk, ambroxan — the lingering trace of skin." },
];

const REVIEWS = [
  { name: "Léa M.", city: "Paris", text: "A scent that draws people closer before a word is spoken. Anubis Noir is unforgettable.", rating: 5 },
  { name: "Yousef A.", city: "Cairo", text: "Maison Anubis bridges two worlds — the elegance of Paris and the mystery of the Nile.", rating: 5 },
  { name: "Sofia R.", city: "Milan", text: "Rose du Caire is the most refined rose I have ever worn. A true couture fragrance.", rating: 5 },
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [filter, setFilter] = useState<Family>("All");
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([]);

  useEffect(() => {
    document.body.style.overflow = cartOpen || menuOpen ? "hidden" : "";
  }, [cartOpen, menuOpen]);

  const filtered = useMemo(
    () => (filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.family === filter)),
    [filter],
  );

  const cartItems = cart.map((c) => ({ ...PRODUCTS.find((p) => p.id === c.id)!, qty: c.qty }));
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = (id: string) => {
    setCart((c) => {
      const existing = c.find((i) => i.id === id);
      if (existing) return c.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { id, qty: 1 }];
    });
    setCartOpen(true);
  };
  const updateQty = (id: string, delta: number) =>
    setCart((c) =>
      c
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );
  const removeItem = (id: string) => setCart((c) => c.filter((i) => i.id !== id));

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 z-50 w-full">
        <div className="glass-strong">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
            <button
              className="md:hidden text-gold"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <nav className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.28em] text-foreground/70">
              <a href="#collection" className="hover:text-gold transition">Collection</a>
              <a href="#experience" className="hover:text-gold transition">Fragrance</a>
              <a href="#about" className="hover:text-gold transition">Maison</a>
            </nav>
            <a href="#top" className="font-display text-2xl tracking-[0.3em] text-gold">
              ANUBIS
            </a>
            <div className="flex items-center gap-5 text-foreground/70">
              <button aria-label="Search" className="hover:text-gold transition hidden sm:block">
                <Search className="h-4 w-4" />
              </button>
              <button
                aria-label="Cart"
                onClick={() => setCartOpen(true)}
                className="relative hover:text-gold transition"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-gold text-[10px] font-medium text-background">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl animate-fade-up">
          <div className="flex justify-end p-6">
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="text-gold">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col items-center gap-8 pt-16 font-display text-4xl text-foreground">
            {["Collection", "Fragrance", "Maison", "Gifts"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                {l}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* HERO */}
      <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24">
        {/* Light rays */}
        <div className="pointer-events-none absolute inset-0 animate-rays" aria-hidden>
          <div className="absolute left-1/2 top-1/2 h-[140vh] w-[140vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
               style={{ background: "var(--gradient-radial-glow)" }} />
        </div>

        {/* Floating particles */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              className="absolute block rounded-full"
              style={{
                width: `${1 + Math.random() * 3}px`,
                height: `${1 + Math.random() * 3}px`,
                background: "oklch(0.88 0.09 85)",
                boxShadow: "0 0 8px oklch(0.78 0.13 78 / 0.8)",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float-particle ${6 + Math.random() * 8}s ease-in-out ${Math.random() * 5}s infinite`,
                opacity: 0.4,
              }}
            />
          ))}
        </div>

        {/* Smoke wisps */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2" aria-hidden>
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="absolute bottom-0 block h-48 w-48 rounded-full"
              style={{
                left: `${20 + i * 18}%`,
                background: "radial-gradient(circle, oklch(0.78 0.13 78 / 0.18), transparent 70%)",
                filter: "blur(20px)",
                animation: `smoke ${10 + i * 2}s ease-in ${i * 1.5}s infinite`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-12">
          <div className="order-2 text-center lg:order-1 lg:text-left animate-fade-up">
            <p className="eyebrow mb-6">Maison Anubis · Est. MMXXIV</p>
            <h1 className="font-display text-5xl leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl">
              Luxury Scents.
              <br />
              <span className="text-gold italic">Unforgettable</span>
              <br />
              Presence.
            </h1>
            <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-muted-foreground lg:mx-0">
              A rare olfactive house where French haute parfumerie meets the
              gilded mystery of ancient Egypt. Crafted in micro-batches by hand.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <a href="#collection" className="btn-gold btn-gold-hover">
                Discover the Collection <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a href="#experience" className="btn-ghost-gold hover:text-gold hover:border-gold/70">
                The Fragrance Wheel
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 -z-10 blur-3xl"
                   style={{ background: "var(--gradient-radial-glow)" }} />
              <img
                src={heroBottle}
                alt="Maison Anubis signature perfume bottle with Egyptian gold engravings"
                width={540}
                height={810}
                className="relative max-h-[80vh] w-auto animate-cinematic-zoom drop-shadow-[0_40px_60px_rgba(212,175,55,0.25)]"
              />
              {/* reflection */}
              <div className="absolute -bottom-10 left-1/2 h-32 w-3/4 -translate-x-1/2 rounded-[50%] opacity-50 blur-2xl"
                   style={{ background: "radial-gradient(ellipse, oklch(0.78 0.13 78 / 0.45), transparent 70%)" }} />
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-foreground/40">
          Scroll
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-border/30 py-6 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap font-display text-2xl text-gold/70">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-16 px-8">
              {["Grasse · France", "Cairo · Egypt", "Hand-Poured", "Micro-Batch", "Cruelty Free", "100% Niche"].map((t) => (
                <span key={t} className="flex items-center gap-16 italic">
                  {t} <Sparkles className="h-4 w-4 text-gold" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="relative mx-auto max-w-7xl px-6 py-32 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="relative">
            <img
              src={aboutImg}
              alt="Master perfumer composing a fragrance in atelier"
              loading="lazy"
              width={1280}
              height={960}
              className="w-full rounded-sm border border-border/40 shadow-[var(--shadow-deep)]"
            />
            <div className="absolute -bottom-8 -right-4 glass-strong px-8 py-6 lg:-right-12">
              <div className="font-display text-5xl text-gold">12</div>
              <div className="eyebrow mt-1">Master Compositions</div>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-6">La Maison</p>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              A House Built on
              <br />
              <span className="text-gold italic">Obsession.</span>
            </h2>
            <div className="hairline my-10 w-24" />
            <p className="text-base leading-loose text-muted-foreground">
              Born from a meeting of two civilizations of scent — the master perfumers
              of Grasse and the ancient incense traders of the Nile — Maison Anubis
              composes fragrances that refuse to be forgotten.
            </p>
            <p className="mt-6 text-base leading-loose text-muted-foreground">
              Each formula matures for a minimum of six months. Every bottle is
              hand-engraved, hand-filled, and numbered. We do not chase trends;
              we carve presence.
            </p>
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border/40 pt-10">
              {[
                ["18 mo", "Maceration"],
                ["100%", "Natural Oils"],
                ["By Hand", "Bottled"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl text-gold">{v}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section id="collection" className="relative bg-card/30 py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-4">The Collection</p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl">
                Four <span className="text-gold italic">Olfactive</span> Statements.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {FAMILIES.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.28em] transition ${
                    filter === f
                      ? "border-gold bg-gold text-background"
                      : "border-border/60 text-foreground/60 hover:border-gold/60 hover:text-gold"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((p, idx) => (
              <article
                key={p.id}
                className="group relative overflow-hidden rounded-sm border border-border/30 bg-background/60 transition-all duration-700 hover:border-gold/50 hover:-translate-y-2"
                style={{ animation: `fade-up 0.8s ${idx * 0.1}s both` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-card to-background">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={800}
                    height={1024}
                    className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                  <button
                    aria-label="Wishlist"
                    className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full glass text-gold opacity-0 transition group-hover:opacity-100"
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                  {/* notes overlay on hover */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-background/95 p-5 text-xs leading-relaxed text-muted-foreground backdrop-blur-md transition-transform duration-500 group-hover:translate-y-0">
                    <div><span className="text-gold">Top · </span>{p.notes.top}</div>
                    <div className="mt-1"><span className="text-gold">Heart · </span>{p.notes.heart}</div>
                    <div className="mt-1"><span className="text-gold">Base · </span>{p.notes.base}</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold/80">{p.family}</p>
                  <h3 className="mt-2 font-display text-2xl">{p.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.subtitle}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="font-display text-xl text-gold">${p.price}</span>
                    <button
                      onClick={() => addToCart(p.id)}
                      className="text-[10px] uppercase tracking-[0.3em] text-foreground/70 transition hover:text-gold"
                    >
                      Add — <span className="text-gold">+</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="relative py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-4">The Fragrance Experience</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl">
              A Cinematic Journey
              <br />
              Through <span className="text-gold italic">Scent</span>.
            </h2>
          </div>
          <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {EXPERIENCES.map((e, i) => (
              <div
                key={e.name}
                className={`group relative overflow-hidden rounded-sm border border-border/30 ${
                  i === 0 ? "lg:row-span-2 lg:col-span-2" : ""
                }`}
                style={{ aspectRatio: i === 0 ? "1/1.1" : "4/5" }}
              >
                <img
                  src={e.image}
                  alt={e.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className={`font-display ${i === 0 ? "text-5xl" : "text-3xl"} text-gold`}>
                    {e.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/70 opacity-0 transition group-hover:opacity-100">
                    {e.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="relative bg-card/30 py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <p className="eyebrow mb-4">Best Sellers</p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl">
                Most <span className="text-gold italic">Coveted</span>.
              </h2>
            </div>
          </div>
          <div className="grid gap-10 lg:grid-cols-3">
            {PRODUCTS.slice(0, 3).map((p) => (
              <div key={p.id} className="glass-strong rounded-sm p-8 transition hover:-translate-y-1">
                <div className="flex gap-6">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={400}
                    height={500}
                    className="h-40 w-32 flex-shrink-0 rounded-sm object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < Math.floor(p.rating) ? "fill-gold text-gold" : "text-muted"}`}
                        />
                      ))}
                      <span className="ml-2 text-xs text-muted-foreground">{p.rating} ({p.reviews})</span>
                    </div>
                    <h3 className="mt-3 font-display text-2xl">{p.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{p.subtitle}</p>
                    <p className="mt-4 font-display text-xl text-gold">${p.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(p.id)}
                  className="mt-6 w-full border border-gold/40 py-3 text-[10px] uppercase tracking-[0.3em] text-gold transition hover:bg-gold hover:text-background"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GIFT */}
      <section className="relative overflow-hidden py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-12">
          <div>
            <p className="eyebrow mb-4">The Gift</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight">
              Make Every Moment
              <br />
              <span className="text-gold italic">Unforgettable.</span>
            </h2>
            <div className="hairline my-10 w-24" />
            <p className="max-w-md text-base leading-loose text-muted-foreground">
              Each Maison Anubis fragrance arrives in a hand-finished obsidian
              coffret, sealed in gold silk and stamped with the cartouche of the
              House. A ceremony of unwrapping designed to last a lifetime.
            </p>
            <a href="#collection" className="btn-gold btn-gold-hover mt-10">
              Compose a Gift <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="relative">
            <img
              src={giftImg}
              alt="Maison Anubis black gift box with gold ribbon"
              loading="lazy"
              width={1280}
              height={960}
              className="w-full rounded-sm border border-border/30 shadow-[var(--shadow-deep)]"
            />
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="relative bg-card/30 py-32">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-12">
          <p className="eyebrow mb-4">Whispers</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl">
            Words from the <span className="text-gold italic">Initiated</span>.
          </h2>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <figure
                key={i}
                className="glass-strong flex flex-col items-center rounded-sm p-8 text-left"
              >
                <div className="flex gap-1">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="h-3 w-3 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="mt-6 font-display text-xl italic leading-snug text-foreground/90">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-6 self-start">
                  <div className="text-sm text-gold">{r.name}</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{r.city}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0 -z-10 opacity-60"
             style={{ background: "var(--gradient-radial-glow)" }} />
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-12">
          <p className="eyebrow mb-4">The Inner Circle</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl">
            Receive the <span className="text-gold italic">Private</span> Editions.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Limited compositions, atelier invitations, and the secret history
            behind each fragrance — delivered only to those who ask.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="your@private.address"
              className="flex-1 border border-border bg-background/60 px-6 py-4 text-sm tracking-wider text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-gold"
            />
            <button type="submit" className="btn-gold btn-gold-hover">Subscribe</button>
          </form>
          <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
            By appointment only — unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/40 bg-background py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-4 lg:px-12">
          <div className="lg:col-span-2">
            <p className="font-display text-3xl tracking-[0.3em] text-gold">ANUBIS</p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Maison Anubis — Niche fragrances composed in Grasse, inspired by the
              gilded heritage of ancient Egypt.
            </p>
          </div>
          {[
            { title: "House", links: ["The Maison", "Atelier", "Press"] },
            { title: "Care", links: ["Contact", "Shipping", "Privacy"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-5">{col.title}</p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="hover:text-gold transition">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-border/30 px-6 pt-8 text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:flex-row lg:px-12">
          <span>© MMXXIV Maison Anubis</span>
          <span>Paris · Cairo</span>
        </div>
      </footer>

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-[70]">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-md animate-fade-up"
            onClick={() => setCartOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col glass-strong border-l border-border/40 animate-fade-up">
            <div className="flex items-center justify-between border-b border-border/30 p-6">
              <div>
                <p className="eyebrow">Your</p>
                <h3 className="font-display text-2xl">Coffret</h3>
              </div>
              <button onClick={() => setCartOpen(false)} aria-label="Close cart" className="text-gold">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="grid h-full place-items-center text-center text-muted-foreground">
                  <div>
                    <Sparkles className="mx-auto h-8 w-8 text-gold" />
                    <p className="mt-4 font-display text-2xl text-foreground">Your coffret awaits.</p>
                    <p className="mt-2 text-sm">Compose your first fragrance.</p>
                  </div>
                </div>
              ) : (
                <ul className="space-y-6">
                  {cartItems.map((i) => (
                    <li key={i.id} className="flex gap-4 border-b border-border/20 pb-6">
                      <img src={i.image} alt={i.name} className="h-24 w-20 rounded-sm object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-lg">{i.name}</h4>
                        <p className="text-xs text-muted-foreground">{i.subtitle}</p>
                        <p className="mt-2 text-sm text-gold">${i.price * i.qty}</p>
                        <div className="mt-3 flex items-center gap-3">
                          <button onClick={() => updateQty(i.id, -1)} className="grid h-7 w-7 place-items-center border border-border/60 text-gold hover:border-gold">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm">{i.qty}</span>
                          <button onClick={() => updateQty(i.id, 1)} className="grid h-7 w-7 place-items-center border border-border/60 text-gold hover:border-gold">
                            <Plus className="h-3 w-3" />
                          </button>
                          <button onClick={() => removeItem(i.id)} className="ml-auto text-muted-foreground hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="border-t border-border/30 p-6">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">Subtotal</span>
                  <span className="font-display text-2xl text-gold">${subtotal}</span>
                </div>
                <button className="btn-gold btn-gold-hover mt-6 w-full">Checkout</button>
                <p className="mt-3 text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Complimentary worldwide shipping
                </p>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
