"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const perks = [
  { icon: "💰", title: "Earn Commission", text: "Get paid every time your design sells." },
  { icon: "🌍", title: "Real Reach", text: "Your work in front of people actually looking to buy." },
  { icon: "🛠️", title: "Free Tools", text: "Use Kraftra's design tools at no cost." },
  { icon: "🎨", title: "Full Ownership", text: "Your designs, your rules, your credit." },
];

const uploadCategories = ["Tees", "Hoodies", "Shoes", "Accessories"];

export default function Artists() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saveError, setSaveError] = useState("");

  const [myDesigns, setMyDesigns] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(uploadCategories[0]);
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);

  const loadDesigns = async (userId) => {
    const { data } = await supabase
      .from("designs")
      .select("*")
      .eq("artist_id", userId)
      .order("created_at", { ascending: false });
    setMyDesigns(data || []);
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

        if (profile?.username) {
          setUsername(profile.username);
          setDraftName(profile.username);
        }
        await loadDesigns(currentUser.id);
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleSave = async () => {
    setSaveError("");
    const cleaned = draftName.trim().toLowerCase().replace(/\s+/g, "");
    if (!cleaned) {
      setSaveError("Username can't be empty.");
      return;
    }
    const { error } = await supabase
      .from("profiles")
      .update({ username: cleaned })
      .eq("id", user.id);

    if (error) {
      setSaveError(error.message.includes("duplicate") ? "That username is taken." : error.message);
    } else {
      setUsername(cleaned);
      setEditing(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadError("");

    const priceNum = parseFloat(price);
    if (!title.trim() || !priceNum || priceNum <= 0) {
      setUploadError("Add a title and a valid price.");
      return;
    }

    setUploading(true);
    const { error } = await supabase.from("designs").insert({
      artist_id: user.id,
      artist_username: username,
      title: title.trim(),
      price: priceNum,
      category,
    });
    setUploading(false);

    if (error) {
      setUploadError(error.message);
    } else {
      setTitle("");
      setPrice("");
      setShowUpload(false);
      await loadDesigns(user.id);
    }
  };

  const handleDelete = async (id) => {
    await supabase.from("designs").delete().eq("id", id);
    await loadDesigns(user.id);
  };

  return (
    <main className="main">
      <div className="glow-bg" />
      <section className="page-hero">
        <Link href="/" className="back-link">← Back to Kraftra</Link>
        <span className="eyebrow">04 · artists</span>
        <h1 className="page-title">Built for Creators</h1>
        <p className="page-sub">
          Make a profile, upload your designs, grow followers, and earn
          commission every time someone wears your work.
        </p>

        {!loading && !user && (
          <div className="profile-mock">
            <div className="profile-avatar" />
            <h3>@your.name</h3>
            <div className="profile-stats">
              <div><strong>0</strong><span>Designs</span></div>
              <div><strong>0</strong><span>Followers</span></div>
              <div><strong>0</strong><span>Following</span></div>
            </div>
            <Link href="/login" className="cta cta-solid" style={{ marginTop: "1.8rem" }}>
              Log In to Create Your Profile
            </Link>
          </div>
        )}

        {!loading && user && (
          <div className="profile-mock">
            <div className="profile-avatar" />
            {editing ? (
              <div className="username-edit">
                <input
                  type="text"
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  placeholder="username"
                />
                <div className="username-edit-actions">
                  <button type="button" className="filter-tab active" onClick={handleSave}>Save</button>
                  <button
                    type="button"
                    className="filter-tab"
                    onClick={() => { setEditing(false); setDraftName(username); setSaveError(""); }}
                  >
                    Cancel
                  </button>
                </div>
                {saveError && <p className="auth-error">{saveError}</p>}
              </div>
            ) : (
              <>
                <h3>@{username || "..."}</h3>
                <button type="button" className="back-link" style={{ marginTop: "0.6rem" }} onClick={() => setEditing(true)}>
                  Edit username
                </button>
              </>
            )}
            <div className="profile-stats">
              <div><strong>{myDesigns.length}</strong><span>Designs</span></div>
              <div><strong>0</strong><span>Followers</span></div>
              <div><strong>0</strong><span>Following</span></div>
            </div>

            <button
              type="button"
              className="cta cta-solid"
              style={{ marginTop: "1.8rem" }}
              onClick={() => setShowUpload(!showUpload)}
            >
              {showUpload ? "Close" : "Upload a Design"}
            </button>

            {showUpload && (
              <form className="auth-form" onSubmit={handleUpload} style={{ marginTop: "1.8rem" }}>
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
                {uploadError && <p className="auth-error">{uploadError}</p>}
                <button type="submit" className="cta cta-solid auth-submit" disabled={uploading}>
                  {uploading ? "Uploading…" : "Publish Design"}
                </button>
              </form>
            )}
          </div>
        )}
      </section>

      {!loading && user && myDesigns.length > 0 && (
        <section className="how-section">
          <p className="eyebrow">your work</p>
          <h2 className="section-title">Your Designs</h2>
          <div className="placeholder-grid">
            {myDesigns.map((d) => (
              <div className="placeholder-card" key={d.id}>
                <div
                  className="placeholder-thumb"
                  style={d.color ? { background: `linear-gradient(135deg, ${d.color}33, ${d.color}11)` } : undefined}
                />
                <h3>{d.title}</h3>
                <p className="placeholder-by">{d.category}</p>
                <p className="placeholder-price">₹{d.price}</p>
                <button type="button" className="back-link" style={{ marginTop: "0.6rem" }} onClick={() => handleDelete(d.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="how-section">
        <p className="eyebrow">why join</p>
        <h2 className="section-title">Made for Creators, Not Corporations</h2>
        <div className="pillars-grid">
          {perks.map((p) => (
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
