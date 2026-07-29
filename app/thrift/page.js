"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const staticItems = [
  { id: "t1", title: "Vintage Denim Jacket", price: 999, condition: "Gently used", category: "Outerwear", seller_username: "Kraftra Studio" },
  { id: "t2", title: "Retro Band Tee", price: 499, condition: "Well loved", category: "Tees", seller_username: "Kraftra Studio" },
  { id: "t3", title: "Leather Boots", price: 1799, condition: "Like new", category: "Shoes", seller_username: "Kraftra Studio" },
  { id: "t4", title: "Corduroy Shirt", price: 699, condition: "Gently used", category: "Shirts", seller_username: "Kraftra Studio" },
  { id: "t5", title: "Wool Cardigan", price: 899, condition: "Like new", category: "Outerwear", seller_username: "Kraftra Studio" },
  { id: "t6", title: "Denim Shorts", price: 599, condition: "Well loved", category: "Bottoms", seller_username: "Kraftra Studio" },
];

const categories = ["All", "Outerwear", "Tees", "Shirts", "Shoes", "Bottoms"];
const conditions = ["Gently used", "Well loved", "Like new"];

const whyThrift = [
  { icon: "♻", title: "Less Waste", text: "Every piece thrifted is one less made from scratch." },
  { icon: "💸", title: "Better Prices", text: "Quality finds without the full price tag." },
  { icon: "✨", title: "One of a Kind", text: "Pieces you won't find anywhere else." },
];

export default function Thrift() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [active, setActive] = useState("All");
  const [communityItems, setCommunityItems] = useState([]);
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showSell, setShowSell] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState(conditions[0]);
  const [category, setCategory] = useState("Tees");
  const [sellError, setSellError] = useState("");
  const [selling, setSelling] = useState(false);

  const loadAll = async (userId) => {
    const { data } = await supabase
      .from("thrift_items")
      .select("*")
      .order("created_at", { ascending: false });
    setCommunityItems(data || []);
    if (userId) {
      setMyItems((data || []).filter((i) => i.seller_id === userId));
    }
  };

  useEffect(() => {
    const load = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const currentUser = userData?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", currentUser.id)
          .single();
        if (profile?.username) setUsername(profile.username);
      }

      await loadAll(currentUser?.id);
      setLoading(false);
    };
    load();
  }, []);

  const handleSell = async (e) => {
    e.preventDefault();
    setSellError("");
    const priceNum = parseFloat(price);
    if (!title.trim() || !priceNum || priceNum <= 0) {
      setSellError("Add a title and a valid price.");
      return;
    }
    setSelling(true);
    const { error } = await supabase.from("thrift_items").insert({
      seller_id: user.id,
      seller_username: username,
      title: title.trim(),
      price: priceNum,
      condition,
      category,
    });
    setSelling(false);
    if (error) {
      setSellError(error.message);
    } else {
      setTitle("");
      setPrice("");
      setShowSell(false);
      await loadAll(user.id);
    }
  };

  const handleRemove = async (id) => {
    await supabase.from("thrift_items").delete().eq("id", id);
    await loadAll(user.id);
  };

  const allItems = [...communityItems, ...staticItems];
  const filtered = active === "All" ? allItems : allItems.filter((i) => i.category === active);

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

        {loading ? (
          <p className="page-sub">Loading finds…</p>
        ) : (
          <div className="placeholder-grid">
            {filtered.map((item) => (
              <div className="placeholder-card" key={item.id}>
                <div className="placeholder-thumb" />
                <h3>{item.title}</h3>
                <p className="placeholder-by">{item.condition}</p>
                <p className="placeholder-price">₹{item.price}</p>
              </div>
            ))}
          </div>
        )}

        {user ? (
          <>
            <button
              type="button"
              className="cta cta-solid"
              style={{ marginTop: "2.5rem" }}
              onClick={() => setShowSell(!showSell)}
            >
              {showSell ? "Close" : "Sell an Item"}
            </button>

            {showSell && (
              <form className="auth-form" onSubmit={handleSell} style={{ marginTop: "1.8rem" }}>
                <label>
                  Title
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <label>
                  Price (₹)
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} min="1" required />
                </label>
                <label>
                  Condition
                  <select value={condition} onChange={(e) => setCondition(e.target.value)} className="category-select">
                    {conditions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Category
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="category-select">
                    {categories.filter((c) => c !== "All").map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </label>
                {sellError && <p className="auth-error">{sellError}</p>}
                <button type="submit" className="cta cta-solid auth-submit" disabled={selling}>
                  {selling ? "Listing…" : "List Item"}
                </button>
              </form>
            )}
          </>
        ) : (
          <Link href="/login" className="cta cta-solid" style={{ marginTop: "2.5rem" }}>
            Log In to Sell an Item
          </Link>
        )}
      </section>

      {user && myItems.length > 0 && (
        <section className="how-section">
          <p className="eyebrow">your listings</p>
          <h2 className="section-title">Items You're Selling</h2>
          <div className="placeholder-grid">
            {myItems.map((item) => (
              <div className="placeholder-card" key={item.id}>
                <div className="placeholder-thumb" />
                <h3>{item.title}</h3>
                <p className="placeholder-by">{item.condition}</p>
                <p className="placeholder-price">₹{item.price}</p>
                <button type="button" className="back-link" style={{ marginTop: "0.6rem" }} onClick={() => handleRemove(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

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
