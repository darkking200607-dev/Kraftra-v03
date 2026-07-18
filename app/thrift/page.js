import Link from "next/link";

const items = [
  { name: "Vintage Denim Jacket", price: "₹999", condition: "Gently used" },
  { name: "Retro Band Tee", price: "₹499", condition: "Well loved" },
  { name: "Leather Boots", price: "₹1,799", condition: "Like new" },
  { name: "Corduroy Shirt", price: "₹699", condition: "Gently used" },
];

export default function Thrift() {
  return (
    <main className="main">
      <div className="glow-bg" />
      <section className="page-hero">
        <Link href="/" className="back-link">← Back to Kraftra</Link>
        <span className="eyebrow">03 · thrift</span>
        <h1 className="page-title">Give Fashion a Second Life</h1>
        <p className="page-sub">
          Buy and sell pre-loved pieces. Good for your wardrobe, better for the planet.
        </p>

        <div className="placeholder-grid">
          {items.map((item) => (
            <div className="placeholder-card" key={item.name}>
              <div className="placeholder-thumb" />
              <h3>{item.name}</h3>
              <p className="placeholder-by">{item.condition}</p>
              <p className="placeholder-price">{item.price}</p>
            </div>
          ))}
        </div>

        <span className="badge-soon">Sell your own thrift — coming soon</span>
      </section>
    </main>
  );
    }
