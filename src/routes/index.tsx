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
  Phone,
  Clock,
  MapPin,
} from "lucide-react";

import heroAsset from "@/assets/musk/musk-egypt.jpg.asset.json";
import orientalAsset from "@/assets/musk/musk-oriental.jpg.asset.json";
import serumAsset from "@/assets/musk/musk-serum.jpg.asset.json";
import parfumeurAsset from "@/assets/musk/musk-parfumeur.jpg.asset.json";
import harmonyAsset from "@/assets/musk/musk-harmony.jpg.asset.json";
import splashAsset from "@/assets/musk/musk-splash.jpg.asset.json";
import rosesAsset from "@/assets/musk/musk-roses.jpg.asset.json";
import woodRitualAsset from "@/assets/musk/new-55.jpg.asset.json";
import nuitEtoileeAsset from "@/assets/musk/new-Gemini_Generated_Image_ye0a8pye0a8pye0a.png.asset.json";
import ambreDoreAsset from "@/assets/musk/new-RRF.jpg.asset.json";
import emeraudeAsset from "@/assets/musk/new-33.jpg.asset.json";
import rougePassionAsset from "@/assets/musk/new-Gemini_Generated_Image_7x9ogr7x9ogr7x9o.jpg.asset.json";
import lotusRoyalAsset from "@/assets/musk/musk-lotus-royal.jpg.asset.json";
import cordageAsset from "@/assets/musk/musk-cordage.jpg.asset.json";
import emeraldSilkAsset from "@/assets/musk/musk-emerald-silk.jpg.asset.json";
import violetLotusAsset from "@/assets/musk/musk-violet-lotus.jpg.asset.json";
import alhambraAsset from "@/assets/musk/musk-alhambra.jpg.asset.json";
import mediterraneeAsset from "@/assets/musk/musk-mediterranee.jpg.asset.json";

import noteWoody from "@/assets/note-woody.jpg";
import noteSpice from "@/assets/note-spice.jpg";
import noteFruit from "@/assets/note-fruit.jpg";
import noteFloral from "@/assets/note-floral.jpg";
import noteMusk from "@/assets/note-musk.jpg";
import giftImg from "@/assets/gift.jpg";

const hero = heroAsset.url;
const oriental = orientalAsset.url;
const serum = serumAsset.url;
const parfumeur = parfumeurAsset.url;
const harmony = harmonyAsset.url;
const splash = splashAsset.url;
const roses = rosesAsset.url;
const woodRitual = woodRitualAsset.url;
const nuitEtoilee = nuitEtoileeAsset.url;
const ambreDore = ambreDoreAsset.url;
const emeraude = emeraudeAsset.url;
const rougePassion = rougePassionAsset.url;
const lotusRoyal = lotusRoyalAsset.url;
const cordage = cordageAsset.url;
const emeraldSilk = emeraldSilkAsset.url;
const violetLotus = violetLotusAsset.url;
const alhambra = alhambraAsset.url;
const mediterranee = mediterraneeAsset.url;

const PHONE = "01202911463";
const PHONE_INTL = "+201202911463";
const HOURS = "السبت – الخميس · 10:00 ص – 10:00 م";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MUSK — Extrait de Parfum · Born in Egypt, Inspired by Eternity" },
      { name: "description", content: "MUSK — دار عطور فاخرة من قلب مصر. عطور نادرة بإلهام فرنسي وروح شرقية. أحجام 35مل، 50مل، 100مل بأسعار تبدأ من 350 جنيه." },
      { property: "og:title", content: "MUSK — Extrait de Parfum" },
      { property: "og:description", content: "Born in Egypt · Inspired by Eternity. عطور فاخرة بإلهام شرقي." },
      { property: "og:image", content: hero },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

type Family = "All" | "Oriental" | "Woody" | "Floral" | "Fresh" | "Serum";
type Size = 35 | 50 | 100;

const PRICES: Record<Size, number> = { 35: 350, 50: 450, 100: 600 };
const DISCOUNT = 0.3;
const priced = (s: Size) => Math.round(PRICES[s] * (1 - DISCOUNT));

type Product = {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  family: Family;
  notes: { top: string; heart: string; base: string };
  rating: number;
  reviews: number;
  sizes: Size[];
};

const PRODUCTS: Product[] = [
  {
    id: "musk-noir",
    name: "Musk Noir",
    subtitle: "Extrait de Parfum · Luxury Collection",
    image: hero,
    family: "Oriental",
    notes: { top: "Saffron, Bergamot, Pineapple", heart: "Damask Rose, Oud", base: "Amber, Sandalwood, Vanilla" },
    rating: 5.0,
    reviews: 312,
    sizes: [35, 50, 100],
  },
  {
    id: "musk-oriental",
    name: "Musk Oriental",
    subtitle: "Eau de Parfum · Oriental Fragrance",
    image: oriental,
    family: "Oriental",
    notes: { top: "Pink Pepper, Saffron", heart: "Rose, Lotus, Amber Resin", base: "Oud, Tonka, Musk" },
    rating: 4.9,
    reviews: 248,
    sizes: [35, 50, 100],
  },
  {
    id: "musk-azure",
    name: "Musk Azure",
    subtitle: "Eau de Parfum · Splash of Royalty",
    image: splash,
    family: "Fresh",
    notes: { top: "Marine Accord, Bergamot", heart: "Lavender, Sea Salt", base: "Ambergris, White Musk" },
    rating: 4.8,
    reviews: 196,
    sizes: [35, 50, 100],
  },
  {
    id: "musk-harmony",
    name: "Musk Harmony",
    subtitle: "Extrait de Parfum · Nature & Elegance",
    image: harmony,
    family: "Woody",
    notes: { top: "Orange, Guava, Mango", heart: "Bergamot, Cedar", base: "Oud, Vetiver, Patchouli" },
    rating: 4.9,
    reviews: 174,
    sizes: [35, 50, 100],
  },
  {
    id: "musk-parfumeur",
    name: "Musk Parfumeur",
    subtitle: "Eau de Parfum · Signature Couture",
    image: parfumeur,
    family: "Floral",
    notes: { top: "Peony, Pear", heart: "Jasmine, Tuberose", base: "Iris, Cashmere Musk" },
    rating: 5.0,
    reviews: 221,
    sizes: [35, 50, 100],
  },
  {
    id: "musk-roses",
    name: "Musk Rose Eternal",
    subtitle: "Eau de Parfum · Petals on the Shore",
    image: roses,
    family: "Floral",
    notes: { top: "Red Rose, Sand Accord", heart: "White Rose, Iris", base: "Amber, Cashmere" },
    rating: 4.9,
    reviews: 188,
    sizes: [35, 50, 100],
  },
  {
    id: "musk-serum",
    name: "Musk Élixir",
    subtitle: "Luxury Body Serum · 30ml",
    image: serum,
    family: "Serum",
    notes: { top: "Citrus, Plumeria", heart: "Tropical Hibiscus", base: "Argan, Gold Musk" },
    rating: 4.8,
    reviews: 142,
    sizes: [50],
  },
  {
    id: "musk-wood-rituel",
    name: "Musk Wood Rituel",
    subtitle: "Extrait de Parfum · Smoked Wood Ceremony",
    image: woodRitual,
    family: "Woody",
    notes: { top: "Smoked Cacao, Pink Pepper", heart: "Cedar, Guaiac Wood", base: "Oud, Leather, Amber" },
    rating: 5.0,
    reviews: 156,
    sizes: [35, 50, 100],
  },
  {
    id: "musk-nuit-etoilee",
    name: "Musk Nuit Étoilée",
    subtitle: "Eau de Parfum · Sapphire Nights",
    image: nuitEtoilee,
    family: "Fresh",
    notes: { top: "Blue Iris, Bergamot", heart: "Violet, Star Anise", base: "White Musk, Ambroxan" },
    rating: 4.9,
    reviews: 138,
    sizes: [35, 50, 100],
  },
  {
    id: "musk-ambre-dore",
    name: "Musk Ambre Doré",
    subtitle: "Eau de Parfum · Sunset in the Sahara",
    image: ambreDore,
    family: "Oriental",
    notes: { top: "Golden Wheat, Saffron", heart: "Amber Resin, Rose", base: "Sandalwood, Vanilla" },
    rating: 5.0,
    reviews: 204,
    sizes: [35, 50, 100],
  },
  {
    id: "musk-emeraude",
    name: "Musk Émeraude",
    subtitle: "Extrait de Parfum · Royal Green Velvet",
    image: emeraude,
    family: "Woody",
    notes: { top: "Green Cardamom, Bay Leaf", heart: "Vetiver, Fig Leaf", base: "Patchouli, Moss, Musk" },
    rating: 4.9,
    reviews: 167,
    sizes: [35, 50, 100],
  },
  {
    id: "musk-rouge-passion",
    name: "Musk Rouge Passion",
    subtitle: "Extrait de Parfum · Ruby Fire",
    image: rougePassion,
    family: "Oriental",
    notes: { top: "Blood Orange, Pink Pepper", heart: "Red Rose, Cinnamon", base: "Oud, Amber, Tonka" },
    rating: 5.0,
    reviews: 231,
    sizes: [35, 50, 100],
  },
];

const FAMILIES: Family[] = ["All", "Oriental", "Woody", "Floral", "Fresh", "Serum"];

const EXPERIENCES = [
  { name: "Woody", image: noteWoody, desc: "Oud, sandalwood, cedar — the soul of the East." },
  { name: "Spices", image: noteSpice, desc: "Saffron, cardamom, pepper — warmth and intrigue." },
  { name: "Fruits", image: noteFruit, desc: "Bergamot, fig, mango — the first golden impression." },
  { name: "Flowers", image: noteFloral, desc: "Rose, jasmine, lotus — petals carved in light." },
  { name: "Musk", image: noteMusk, desc: "White musk, ambroxan — the lingering trace of skin." },
];

const REVIEWS = [
  { name: "ليلى م.", city: "القاهرة", text: "رائحة تجذب الأنظار قبل الكلمات. Musk Noir لا يُنسى أبدًا.", rating: 5 },
  { name: "Yousef A.", city: "Alexandria", text: "MUSK يجمع بين أناقة باريس وغموض النيل. تجربة استثنائية.", rating: 5 },
  { name: "Sofia R.", city: "Milan", text: "Musk Parfumeur is the most refined fragrance I have ever worn.", rating: 5 },
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [filter, setFilter] = useState<Family>("All");
  const [selectedSize, setSelectedSize] = useState<Record<string, Size>>({});
  const [cart, setCart] = useState<{ id: string; size: Size; qty: number }[]>([]);

  useEffect(() => {
    document.body.style.overflow = cartOpen || menuOpen ? "hidden" : "";
  }, [cartOpen, menuOpen]);

  const filtered = useMemo(
    () => (filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.family === filter)),
    [filter],
  );

  const getSize = (p: Product) => selectedSize[p.id] ?? (p.sizes.includes(50) ? 50 : p.sizes[0]);

  const cartItems = cart.map((c) => {
    const p = PRODUCTS.find((x) => x.id === c.id)!;
    return { ...p, size: c.size, qty: c.qty, unitPrice: priced(c.size) };
  });
  const subtotal = cartItems.reduce((s, i) => s + i.unitPrice * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = (id: string, size: Size) => {
    setCart((c) => {
      const ex = c.find((i) => i.id === id && i.size === size);
      if (ex) return c.map((i) => (i === ex ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { id, size, qty: 1 }];
    });
    setCartOpen(true);
  };
  const updateQty = (id: string, size: Size, delta: number) =>
    setCart((c) =>
      c
        .map((i) => (i.id === id && i.size === size ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );
  const removeItem = (id: string, size: Size) =>
    setCart((c) => c.filter((i) => !(i.id === id && i.size === size)));

  const whatsappCheckout = () => {
    const lines = cartItems.map(
      (i) => `• ${i.name} (${i.size}ml) × ${i.qty} = ${i.unitPrice * i.qty} ج.م`,
    );
    const original = cartItems.reduce((s, i) => s + PRICES[i.size] * i.qty, 0);
    const msg = encodeURIComponent(
      `السلام عليكم، أود الطلب من MUSK:\n${lines.join("\n")}\n\nالسعر قبل الخصم: ${original} ج.م\nخصم 30%: −${original - subtotal} ج.م\nالإجمالي بعد الخصم: ${subtotal} ج.م`,
    );
    window.open(`https://wa.me/${PHONE_INTL.replace("+", "")}?text=${msg}`, "_blank");
  };

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
              <a href="#contact" className="hover:text-gold transition">Contact</a>
            </nav>
            <a href="#top" className="font-display text-2xl tracking-[0.45em] text-gold">
              MUSK
            </a>
            <div className="flex items-center gap-5 text-foreground/70">
              <a
                href={`tel:${PHONE}`}
                className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-gold/80 hover:text-gold transition"
              >
                <Phone className="h-3.5 w-3.5" />
                {PHONE}
              </a>
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
            {["Collection", "Fragrance", "Maison", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                {l}
              </a>
            ))}
            <a
              href={`tel:${PHONE}`}
              className="mt-6 text-gold text-lg tracking-[0.3em]"
            >
              {PHONE}
            </a>
          </nav>
        </div>
      )}

      {/* HERO */}
      <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24">
        <div className="pointer-events-none absolute inset-0 animate-rays" aria-hidden>
          <div className="absolute left-1/2 top-1/2 h-[140vh] w-[140vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
               style={{ background: "var(--gradient-radial-glow)" }} />
        </div>

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

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-12">
          <div className="order-2 text-center lg:order-1 lg:text-left animate-fade-up">
            <p className="eyebrow mb-6">Born in Egypt · Inspired by Eternity</p>
            <h1 className="font-display text-5xl leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl">
              A Journey
              <br />
              <span className="text-gold italic">of Senses</span>
              <br />
              Rooted in Heritage.
            </h1>
            <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-muted-foreground lg:mx-0">
              MUSK — Extrait de Parfum. عطور نادرة تُصاغ بإلهام فرنسي وروح مصرية،
              مكوّنة من التوابل والأخشاب والفواكه النبيلة.
            </p>

            {/* Quick price strip */}
            <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3 lg:mx-0">
              {([35, 50, 100] as Size[]).map((s) => (
                <div key={s} className="glass rounded-sm border border-gold/20 px-3 py-3 text-center">
                  <div className="font-display text-lg text-gold">{s}ml</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gold">{priced(s)} ج.م</div>
                  <div className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground line-through">{PRICES[s]} ج.م</div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <a href="#collection" className="btn-gold btn-gold-hover">
                Discover the Collection <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a href={`tel:${PHONE}`} className="btn-ghost-gold hover:text-gold hover:border-gold/70">
                <Phone className="h-3.5 w-3.5 mr-2 inline" /> {PHONE}
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 -z-10 blur-3xl"
                   style={{ background: "var(--gradient-radial-glow)" }} />
              <img
                src={hero}
                alt="MUSK Extrait de Parfum — luxury bottle with Egyptian heritage"
                width={540}
                height={810}
                className="relative max-h-[82vh] w-auto rounded-sm animate-cinematic-zoom drop-shadow-[0_40px_60px_rgba(212,175,55,0.35)]"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-foreground/40">
          Scroll
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-border/30 py-6 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap font-display text-2xl text-gold/70">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-16 px-8">
              {["30% OFF · خصم لفترة محدودة", "Born in Egypt", "Inspired by Eternity", "Spices · Woods · Fruits", "Hand-Poured", "Micro-Batch"].map((t) => (
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
              src={parfumeur}
              alt="MUSK Parfumeur — signature crystal bottle and gold coffret"
              loading="lazy"
              width={1280}
              height={1700}
              className="w-full rounded-sm border border-border/40 shadow-[var(--shadow-deep)]"
            />
            <div className="absolute -bottom-8 -right-4 glass-strong px-8 py-6 lg:-right-12">
              <div className="font-display text-5xl text-gold">12</div>
              <div className="eyebrow mt-1">Signature Compositions</div>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-6">La Maison MUSK</p>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              A House Built on
              <br />
              <span className="text-gold italic">Obsession.</span>
            </h2>
            <div className="hairline my-10 w-24" />
            <p className="text-base leading-loose text-muted-foreground">
              من قلب الإسكندرية وصعيد مصر إلى مدرسة العطور الفرنسية في غراس،
              تُولد عطور MUSK من لقاء حضارتين. كل تركيبة تنضج لستة أشهر،
              وكل زجاجة تُصاغ وتُختم باليد.
            </p>
            <p className="mt-6 text-base leading-loose text-muted-foreground">
              لا نلاحق الموضة — نحن ننحت حضورًا لا يُنسى.
            </p>
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border/40 pt-10">
              {[
                ["6 mo", "Maceration"],
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
                Twelve <span className="text-gold italic">Olfactive</span> Statements.
              </h2>
              <p className="mt-4 max-w-lg text-sm text-muted-foreground">
                <span className="rounded-sm bg-gold/15 px-2 py-0.5 text-gold font-semibold tracking-widest text-[10px] mr-2">−30% OFF</span>
                <span className="text-gold">35مل · {priced(35)}ج.م</span> <span className="line-through opacity-50">350</span> ·
                <span className="text-gold"> 50مل · {priced(50)}ج.م</span> <span className="line-through opacity-50">450</span> ·
                <span className="text-gold"> 100مل · {priced(100)}ج.م</span> <span className="line-through opacity-50">600</span>
              </p>
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

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, idx) => {
              const size = getSize(p);
              return (
                <article
                  key={p.id}
                  className="group relative overflow-hidden rounded-sm border border-border/30 bg-background/60 transition-all duration-700 hover:border-gold/50 hover:-translate-y-2"
                  style={{ animation: `fade-up 0.8s ${idx * 0.08}s both` }}
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

                    {/* Size selector */}
                    {p.sizes.length > 1 && (
                      <div className="mt-4 flex gap-1.5">
                        {p.sizes.map((s) => (
                          <button
                            key={s}
                            onClick={() => setSelectedSize((m) => ({ ...m, [p.id]: s }))}
                            className={`flex-1 border px-2 py-1.5 text-[10px] uppercase tracking-[0.18em] transition ${
                              size === s
                                ? "border-gold bg-gold/10 text-gold"
                                : "border-border/60 text-foreground/60 hover:border-gold/50"
                            }`}
                          >
                            {s}ml
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 flex items-center justify-between">
                      <span className="flex items-baseline gap-2">
                        <span className="font-display text-xl text-gold">
                          {priced(size)} <span className="text-xs">ج.م</span>
                        </span>
                        <span className="text-xs text-muted-foreground line-through">
                          {PRICES[size]}
                        </span>
                        <span className="rounded-sm bg-gold/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-gold">−30%</span>
                      </span>
                      <button
                        onClick={() => addToCart(p.id, size)}
                        className="text-[10px] uppercase tracking-[0.3em] text-foreground/70 transition hover:text-gold"
                      >
                        Add — <span className="text-gold">+</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
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
                    <p className="mt-4 flex items-baseline gap-2">
                      <span className="font-display text-xl text-gold">
                        from {priced(35)} <span className="text-xs">ج.م</span>
                      </span>
                      <span className="text-xs text-muted-foreground line-through">{PRICES[35]}</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(p.id, 50)}
                  className="mt-6 w-full border border-gold/40 py-3 text-[10px] uppercase tracking-[0.3em] text-gold transition hover:bg-gold hover:text-background"
                >
                  Add 50ml — {priced(50)} <span className="line-through opacity-60 ml-1">{PRICES[50]}</span> ج.م
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
              كل عطر من MUSK يصل في علبة أوبسيديان سوداء مزخرفة باليد ومختومة
              بحرير ذهبي وشعار الدار — طقس فتح يبقى ذكرى للأبد.
            </p>
            <a href="#collection" className="btn-gold btn-gold-hover mt-10">
              Compose a Gift <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="relative">
            <img
              src={giftImg}
              alt="MUSK black gift box with gold ribbon"
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

      {/* CONTACT */}
      <section id="contact" className="relative overflow-hidden py-32">
        <div className="absolute inset-0 -z-10 opacity-50"
             style={{ background: "var(--gradient-radial-glow)" }} />
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <div className="text-center">
            <p className="eyebrow mb-4">Atelier MUSK</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl">
              Visit. <span className="text-gold italic">Call.</span> Discover.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <a
              href={`tel:${PHONE}`}
              className="glass-strong group flex flex-col items-center rounded-sm p-10 text-center transition hover:-translate-y-1 hover:border-gold/60"
            >
              <div className="grid h-14 w-14 place-items-center rounded-full border border-gold/40 text-gold transition group-hover:bg-gold group-hover:text-background">
                <Phone className="h-5 w-5" />
              </div>
              <p className="eyebrow mt-6">Hotline</p>
              <p className="mt-3 font-display text-3xl text-gold" dir="ltr">{PHONE}</p>
              <p className="mt-2 text-xs text-muted-foreground">اتصل أو اطلب عبر واتساب</p>
            </a>

            <div className="glass-strong flex flex-col items-center rounded-sm p-10 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full border border-gold/40 text-gold">
                <Clock className="h-5 w-5" />
              </div>
              <p className="eyebrow mt-6">Working Hours</p>
              <p className="mt-3 font-display text-xl text-foreground">{HOURS}</p>
              <p className="mt-2 text-xs text-muted-foreground">الجمعة مغلق</p>
            </div>

            <div className="glass-strong flex flex-col items-center rounded-sm p-10 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full border border-gold/40 text-gold">
                <MapPin className="h-5 w-5" />
              </div>
              <p className="eyebrow mt-6">Maison</p>
              <p className="mt-3 font-display text-xl text-foreground">Cairo · Egypt</p>
              <p className="mt-2 text-xs text-muted-foreground">Atelier privé — بالحجز المسبق</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href={`https://wa.me/${PHONE_INTL.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold btn-gold-hover"
            >
              Order via WhatsApp <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/40 bg-background py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-4 lg:px-12">
          <div className="lg:col-span-2">
            <p className="font-display text-3xl tracking-[0.45em] text-gold">MUSK</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Extrait de Parfum</p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Born in Egypt · Inspired by Eternity. عطور فاخرة تجمع بين أناقة
              غراس وغموض النيل.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-5">Contact</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-gold" />
                <a href={`tel:${PHONE}`} className="hover:text-gold transition" dir="ltr">{PHONE}</a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-3.5 w-3.5 text-gold" />
                <span>{HOURS}</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-gold" />
                <span>Cairo · Egypt</span>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-5">House</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-gold transition">The Maison</a></li>
              <li><a href="#collection" className="hover:text-gold transition">Collection</a></li>
              <li><a href="#contact" className="hover:text-gold transition">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-border/30 px-6 pt-8 text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:flex-row lg:px-12">
          <span>© MMXXVI MUSK Parfumeur</span>
          <span>Born in Egypt · Inspired by Eternity</span>
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
                    <li key={`${i.id}-${i.size}`} className="flex gap-4 border-b border-border/20 pb-6">
                      <img src={i.image} alt={i.name} className="h-24 w-20 rounded-sm object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-lg">{i.name}</h4>
                        <p className="text-xs text-muted-foreground">{i.size}ml</p>
                        <p className="mt-2 text-sm text-gold">{i.unitPrice * i.qty} ج.م</p>
                        <div className="mt-3 flex items-center gap-3">
                          <button onClick={() => updateQty(i.id, i.size, -1)} className="grid h-7 w-7 place-items-center border border-border/60 text-gold hover:border-gold">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm">{i.qty}</span>
                          <button onClick={() => updateQty(i.id, i.size, 1)} className="grid h-7 w-7 place-items-center border border-border/60 text-gold hover:border-gold">
                            <Plus className="h-3 w-3" />
                          </button>
                          <button onClick={() => removeItem(i.id, i.size)} className="ml-auto text-muted-foreground hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {cartItems.length > 0 && (() => {
              const original = cartItems.reduce((s, i) => s + PRICES[i.size] * i.qty, 0);
              const savings = original - subtotal;
              return (
              <div className="border-t border-border/30 p-6">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Original</span>
                  <span className="line-through">{original} ج.م</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-sm">
                  <span className="text-gold">Discount −30%</span>
                  <span className="text-gold">−{savings} ج.م</span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border/30 pt-3">
                  <span className="eyebrow">Total</span>
                  <span className="font-display text-2xl text-gold">{subtotal} ج.م</span>
                </div>
                <button onClick={whatsappCheckout} className="btn-gold btn-gold-hover mt-6 w-full">
                  Checkout via WhatsApp
                </button>
                <p className="mt-3 text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  الشحن لكل محافظات مصر · الدفع عند الاستلام
                </p>
              </div>
              );
            })()}
          </aside>
        </div>
      )}
    </div>
  );
}
