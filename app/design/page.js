"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const colors = [
  { name: "Gold", hex: "#caa24b" },
  { name: "Ivory", hex: "#f4efe6" },
  { name: "Wine", hex: "#8b2f3f" },
  { name: "Emerald", hex: "#2f6b4f" },
  { name: "Sapphire", hex: "#3457a6" },
  { name: "Charcoal", hex: "#7a7a7a" },
];

const uploadCategories = ["Shoes", "Tees", "Hoodies", "Accessories"];

const categoriesInfo = [
  { icon: "👟", title: "Shoes", text: "Sneakers, sandals, boots — yours from sole to lace." },
  { icon: "👕", title: "Tees & Hoodies", text: "Start blank or remix a base template." },
  { icon: "🧢", title: "Caps & Accessories", text: "Small pieces, just as much you." },
  { icon: "🖼️", title: "Your Own Graphics", text: "Upload art, photos, or patterns of your own." },
];

export default function Design() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  const [activeColor, setActiveColor] = useState(colors[0]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(uploadCategories[0]);
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState("");
  const [published, setPublished] = useState(false);

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
      setLoading(false);
    };
    load();
  }, []);

  const handlePublish = async (e) => {
    e.preventDefault();
    setPublishError("");
    const priceNum = parseFloat(price);
    if (!title.trim() || !priceNum || priceNum <= 0) {
      setPublishError("Add a title and a valid price.");
      return;
    }
    setPublishing(true);
    const { error } = await supabase.from("designs").insert({
      artist_id: user.id,
      artist_username: username,
      title: title.trim(),
      price: priceNum,
      category,
      color: activeColor.hex,
    });
    setPublishing(false);
    if (error) {
      setPublishError(error.message);
    } else {
      setPublished(true);
      setTitle("");
      setPrice("");
    }
  };

  return (
    <main className="main">
      <div className="glow-bg" />
      <section className="page-hero">
        <Link href="/" className="back-link">← Back to Kraftra</Link>
        <span className="eyebrow">01 · design</span>
        <h1 className="page-title">Design Your Own</h1>
        <p className="page-sub">
          Pick a colour, name your piece, set a price — publish it straight to the Kraftra shop.
        </p>

        <div className="customizer">
          <svg
            className="customizer-shoe"
            viewBox="0 0 300 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 120 C20 100, 30 90, 45 88 C60 86, 65 70, 80 65 C100 58, 110 40, 135 38 C160 36, 175 45, 190 55 C205 65, 215 62, 230 60 C250 58, 265 65, 275 80 C283 92, 282 105, 275 115 C265 128, 240 130, 210 130 L45 130 C30 130, 20 128, 20 120 Z"
              stroke={activeColor.hex}
              fill={activeColor.hex}
              fillOpacity="0.12"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 120 L275 115 C280 122, 278 132, 265 135 L35 135 C22 135, 18 128, 20 120 Z"
              stroke={activeColor.hex}
              fill={activeColor.hex}
              fillOpacity="0.3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M120 55 L145 75 M135 50 L160 72 M150 46 L172 68"
              stroke={activeColor.hex}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>

          <div className="swatches">
            {colors.map((c) => (
              <button
                key={c.hex}
                type="button"
                aria-label={c.name}
                className={`swatch ${activeColor.hex === c.hex ? "active" : ""}`}
                style={{ background: c.hex }}
                onClick={() => setActiveColor(c)}
              />
            ))}
          </div>
          <p className="customizer-color-name">{activeColor.name}</p>
        </div>

        {!loading && !user && (
          <Link href="/login" className="cta cta-solid" style={{ marginTop: "2rem" }}>
            Log In to Publish This Design
          </Link>
        )}

        {!loading && user && !published && (
          <form className="auth-form" onSubmit={handlePublish} style={{ marginTop: "2rem" }}>
            <label>
              Title
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>
            <label>
              Price (₹)
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} min="1" required />
            </label>
            <label>
              Category
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="category-select">
                {uploadCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            {publishError && <p className="auth-error">{publishError}</p>}
            <button type="submit" className="cta cta-solid auth-submit" disabled={publishing}>
              {publishing ? "Publishing…" : "Publish to Shop"}
            </button>
          </form>
        )}

        {published && (
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <p className="auth-message">Published! Your design is live.</p>
            <Link href="/shop" className="cta cta-solid" style={{ marginTop: "1rem" }}>
              View in Shop
            </Link>
          </div>
        )}
      </section>

      <section className="how-section">
        <p className="eyebrow">what you can design</p>
        <h2 className="section-title">Every Piece, Your Call</h2>
        <div className="pillars-grid">
          {categoriesInfo.map((c) => (
            <div className="pillar" key={c.title}>
              <span className="pillar-icon">{c.icon}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
