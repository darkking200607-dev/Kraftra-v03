import Link from "next/link";

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
    </main>
  );
}
