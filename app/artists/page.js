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

const creators = [
  { name: "@aria.made", tag: "Streetwear" },
  { name: "@kenji.designs", tag: "Footwear" },
  { name: "@noor.studio", tag: "Accessories" },
  { name: "@dev.crafts", tag: "Graphic Art" },
];

export default function Artists() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saveError, setSaveError] = useState("");

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
                  <button type="button" className="filter-tab active" onClick={handleSave}>
                    Save
                  </button>
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
              <div><strong>0</strong><span>Designs</span></div>
              <div><strong>0</strong><span>Followers</span></div>
              <div><strong>0</strong><span>Following</span></div>
            </div>
          </div>
        )}

        <span className="badge-soon">Design uploads — coming soon</span>
      </section>

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

      <section className="how-section">
        <p className="eyebrow">the community</p>
        <h2 className="section-title">Kraftra Creators</h2>
        <div className="placeholder-grid">
          {creators.map((c) => (
            <div className="placeholder-card" key={c.name}>
              <div className="placeholder-thumb" />
              <h3>{c.name}</h3>
              <p className="placeholder-by">{c.tag}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
