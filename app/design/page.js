import Link from "next/link";

export default function Design() {
  return (
    <main className="main">
      <div className="glow-bg" />
      <section className="page-hero">
        <Link href="/" className="back-link">← Back to Kraftra</Link>
        <span className="eyebrow">01 · design</span>
        <h1 className="page-title">Design Your Own</h1>
        <p className="page-sub">
          Sketch it, colour it, place it — build your own clothes and shoes
          from scratch. The full design canvas is being crafted right now.
        </p>

        <div className="canvas-mock">
          <div className="canvas-toolbar">
            <span>🎨</span>
            <span>👕</span>
            <span>👟</span>
            <span>🖊️</span>
          </div>
          <div className="canvas-area">
            <p>Your design canvas will appear here</p>
          </div>
        </div>

        <span className="badge-soon">Design tool — coming soon</span>
      </section>
    </main>
  );
}
