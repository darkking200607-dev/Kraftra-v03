import Link from "next/link";

const items = [
  { name: "Signature Tee", price: "₹1,299", by: "Kraftra Studio" },
  { name: "Street Hoodie", price: "₹2,199", by: "by @ravi.designs" },
  { name: "Canvas Sneakers", price: "₹3,499", by: "Kraftra Studio" },
  { name: "Graphic Cap", price: "₹899", by: "by @meera.art" },
];

export default function Shop() {
  return (
    <main className="main">
      <div className="glow-bg" />
      <section className="page-hero">
        <Link href="/" className="back-link">← Back to Kraftra</Link>
        <span className="eyebrow">02 · shop</span>
        <h1 className="page-title">Shop the Collection</h1>
        <p className="page-sub">
          Designs made by our community and pieces from the Kraftra store —
          checkout is coming soon.
        </p>

        <div className="placeholder-grid">
          {items.map((item) => (
            <div className="placeholder-card" key={item.name}>
              <div className="placeholder-thumb" />
              <h3>{item.name}</h3>
              <p className="placeholder-by">{item.by}</p>
              <p className="placeholder-price">{item.price}</p>
            </div>
          ))}
        </div>

        <span className="badge-soon">Checkout — coming soon</span>
      </section>
    </main>
  );
}
