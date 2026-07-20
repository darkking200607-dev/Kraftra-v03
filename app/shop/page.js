"use client";

import Link from "next/link";
import { useState } from "react";

const items = [
  { name: "Signature Tee", price: "₹1,299", by: "Kraftra Studio", category: "Tees" },
  { name: "Street Hoodie", price: "₹2,199", by: "@ravi.designs", category: "Hoodies" },
  { name: "Canvas Sneakers", price: "₹3,499", by: "Kraftra Studio", category: "Shoes" },
  { name: "Graphic Cap", price: "₹899", by: "@meera.art", category: "Accessories" },
  { name: "Oversized Tee", price: "₹1,099", by: "@aria.made", category: "Tees" },
  { name: "Zip Hoodie", price: "₹2,499", by: "Kraftra Studio", category: "Hoodies" },
  { name: "Runner Sneakers", price: "₹3,999", by: "@kenji.designs", category: "Shoes" },
  { name: "Woven Belt", price: "₹699", by: "@dev.crafts", category: "Accessories" },
];

const categories = ["All", "Tees", "Hoodies", "Shoes", "Accessories"];

export default function Shop() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

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
