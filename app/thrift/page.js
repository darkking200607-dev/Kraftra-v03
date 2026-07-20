"use client";

import Link from "next/link";
import { useState } from "react";

const items = [
  { name: "Vintage Denim Jacket", price: "₹999", condition: "Gently used", category: "Outerwear" },
  { name: "Retro Band Tee", price: "₹499", condition: "Well loved", category: "Tees" },
  { name: "Leather Boots", price: "₹1,799", condition: "Like new", category: "Shoes" },
  { name: "Corduroy Shirt", price: "₹699", condition: "Gently used", category: "Shirts" },
  { name: "Wool Cardigan", price: "₹899", condition: "Like new", category: "Outerwear" },
  { name: "Denim Shorts", price: "₹599", condition: "Well loved", category: "Bottoms" },
];

const categories = ["All", "Outerwear", "Tees", "Shirts", "Shoes", "Bottoms"];

const whyThrift = [
  { icon: "♻", title: "Less Waste", text: "Every piece thrifted is one less made from scratch." },
  { icon: "💸", title: "Better Prices", text: "Quality finds without the full price tag." },
  { icon: "✨", title: "One of a Kind", text: "Pieces you won't find anywhere else." },
];

export default function Thrift() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

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

        <div className="filter-tabs">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={`filter-tab ${active === c ? "active" : ""}`}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="placeholder-grid">
          {filtered.map((item) => (
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

      <section className="how-section">
        <p className="eyebrow">why thrift</p>
        <h2 className="section-title">Good for You, Good for the Planet</h2>
        <div className="pillars-grid">
          {whyThrift.map((p) => (
            <div className="pillar" key={p.title}>
              <span className="pillar-icon">{p.icon}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
