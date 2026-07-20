import Link from "next/link";

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

        <div className="profile-mock">
          <div className="profile-avatar" />
          <h3>@your.name</h3>
          <div className="profile-stats">
            <div>
              <strong>0</strong>
              <span>Designs</span>
            </div>
            <div>
              <strong>0</strong>
              <span>Followers</span>
            </div>
            <div>
              <strong>0</strong>
              <span>Following</span>
            </div>
          </div>
        </div>

        <span className="badge-soon">Artist profiles — coming soon</span>
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

      <section className="cta-band">
        <h2>Ready to share your designs?</h2>
        <p>Start creating and put your work in front of buyers.</p>
        <Link href="/design" className="cta cta-solid">Start Creating</Link>
      </section>
    </main>
  );
}
