"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const storeItems = [
  { id: "s1", title: "Signature Tee", price: 1299, artist_username: "Kraftra Studio", category: "Tees" },
  { id: "s2", title: "Street Hoodie", price: 2199, artist_username: "Kraftra Studio", category: "Hoodies" },
  { id: "s3", title: "Canvas Sneakers", price: 3499, artist_username: "Kraftra Studio", category: "Shoes" },
  { id: "s4", title: "Graphic Cap", price: 899, artist_username: "Kraftra Studio", category: "Accessories" },
];

const categories = ["All", "Tees", "Hoodies", "Shoes", "Accessories"];

export default function Shop() {
  const [active, setActive] = useState("All");
  const [communityItems, setCommunityItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("designs")
        .select("*")
        .order("created_at", { ascending: false });
      setCommunityItems(data || []);
      setLoading(false);
    };
    load();
  }, []);

  const allItems = [...communityItems, ...storeItems];
  const filtered = active === "All" ? allItems : allItems.filter((i) => i.category === active);

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

        {loading ? (
          <p className="page-sub">Loading designs…</p>
        ) : (
          <div className="placeholder-grid">
            {filtered.map((item) => (
              <div className="placeholder-card" key={item.id}>
                <div className="placeholder-thumb" />
                <h3>{item.title}</h3>
                <p className="placeholder-by">
                  {item.artist_username === "Kraftra Studio" ? "Kraftra Studio" : `@${item.artist_username}`}
                </p>
                <p className="placeholder-price">₹{item.price}</p>
              </div>
            ))}
          </div>
        )}

        <span className="badge-soon">Checkout — coming soon</span>
      </section>
    </main>
  );
}
