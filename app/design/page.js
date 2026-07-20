import Link from "next/link";
import ShoeCustomizer from "../ShoeCustomizer";

const categories = [
  { icon: "👟", title: "Shoes", text: "Sneakers, sandals, boots — yours from sole to lace." },
  { icon: "👕", title: "Tees & Hoodies", text: "Start blank or remix a base template." },
  { icon: "🧢", title: "Caps & Accessories", text: "Small pieces, just as much you." },
  { icon: "🖼️", title: "Your Own Graphics", text: "Upload art, photos, or patterns of your own." },
];

export default function Design() {
  return (
    <main className="main">
      <div className="glow-bg" />
      <section className="page-hero">
        <Link href="/" className="back-link">← Back to Kraftra</Link>
        <span className="eyebrow">01 · design</span>
        <h1 className="page-title">Design Your Own</h1>
        <p className="page-sub">
          Sketch it, colour it, place it — build your own clothes and shoes
          from scratch. Try a taste of it below.
        </p>

        <ShoeCustomizer />
        <span className="badge-soon">Full design studio — coming soon</span>
      </section>

      <section className="how-section">
        <p className="eyebrow">what you can design</p>
        <h2 className="section-title">Every Piece, Your Call</h2>
        <div className="pillars-grid">
          {categories.map((c) => (
            <div className="pillar" key={c.title}>
              <span className="pillar-icon">{c.icon}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <h2>Not the creative type?</h2>
        <p>Browse designs made by the Kraftra community instead.</p>
        <Link href="/shop" className="cta cta-solid">Go to Shop</Link>
      </section>
    </main>
  );
}
