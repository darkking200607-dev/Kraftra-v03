import Link from "next/link";
import ShoeCustomizer from "./ShoeCustomizer";

const featured = [
  { name: "Sunset Bomber", by: "@aria.made" },
  { name: "Origami Sneakers", by: "@kenji.designs" },
  { name: "Retro Varsity", by: "@noor.studio" },
  { name: "Neon Cargo", by: "@dev.crafts" },
];

const pillars = [
  { icon: "✦", title: "Own Your Style", text: "No two pieces alike — what you create is truly yours." },
  { icon: "♻", title: "Sustainable by Design", text: "Thrift, remix, and reduce waste. Fashion that circles back." },
  { icon: "✂", title: "Made, Not Mass-Produced", text: "Every piece starts as someone's idea, not a factory line." },
  { icon: "✧", title: "Creators Get Paid", text: "Artists earn commission every time their design sells." },
];

export default function Home() {
  return (
    <main className="main">
      <div className="glow-bg" />

      <section className="hero">
        <p className="eyebrow fade-in delay-1">welcome to</p>
        <h1 className="brand fade-in delay-2">KRAFTRA</h1>

        <div className="shoe-wrap fade-in delay-3">
          <svg
            className="shoe-svg"
            viewBox="0 0 300 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="shoe-path"
              d="M20 120 C20 100, 30 90, 45 88 C60 86, 65 70, 80 65 C100 58, 110 40, 135 38 C160 36, 175 45, 190 55 C205 65, 215 62, 230 60 C250 58, 265 65, 275 80 C283 92, 282 105, 275 115 C265 128, 240 130, 210 130 L45 130 C30 130, 20 128, 20 120 Z"
              stroke="#caa24b"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="shoe-sole"
              d="M20 120 L275 115 C280 122, 278 132, 265 135 L35 135 C22 135, 18 128, 20 120 Z"
              stroke="#caa24b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="shoe-lace"
              d="M120 55 L145 75 M135 50 L160 72 M150 46 L172 68"
              stroke="#caa24b"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="tagline fade-in delay-4">
          <span className="word">Create.</span>
          <span className="word">Wear.</span>
          <span className="word">Repeat.</span>
        </div>

        <p className="sub fade-in delay-5">
          A world where fashion begins with your imagination —
          design it, wear it, thrift it, sell it.
        </p>

        <a href="#try-it" className="cta fade-in delay-6">
          Explore Kraftra
        </a>
      </section>

      <section id="try-it" className="how-section">
        <p className="eyebrow">try it yourself</p>
        <h2 className="section-title">Pick a Colourway</h2>
        <p className="page-sub" style={{ marginTop: "-1.5rem", marginBottom: "0.5rem" }}>
          A small taste of the design studio — tap a shade below.
        </p>
        <ShoeCustomizer />
        <span className="badge-soon">Full design studio — coming soon</span>
      </section>

      <section className="how-section">
        <p className="eyebrow">the kraftra loop</p>
        <h2 className="section-title">How It Works</h2>

        <div className="steps-timeline">
          <div className="step-item">
            <span className="step-num">01</span>
            <div className="step-text">
              <h3>Create</h3>
              <p>Sketch your own piece on our design canvas, or explore designs made by other creators.</p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-num">02</span>
            <div className="step-text">
              <h3>Wear</h3>
              <p>Order it stitched, pick it up thrifted, or grab it straight from the store — made yours.</p>
            </div>
          </div>
          <div className="step-item">
            <span className="step-num">03</span>
            <div className="step-text">
              <h3>Repeat</h3>
              <p>Come back, remix, create again. Sell what you no longer wear and start a new loop.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-section">
        <p className="eyebrow">from the community</p>
        <h2 className="section-title">Featured Designs</h2>

        <div className="placeholder-grid">
          {featured.map((item) => (
            <div className="placeholder-card" key={item.name}>
              <div className="placeholder-thumb" />
              <h3>{item.name}</h3>
              <p className="placeholder-by">{item.by}</p>
            </div>
          ))}
        </div>
        <span className="badge-soon">Community uploads — coming soon</span>
      </section>

      <section className="how-section">
        <p className="eyebrow">why kraftra</p>
        <h2 className="section-title">Fashion, Rewritten</h2>

        <div className="pillars-grid">
          {pillars.map((p) => (
            <div className="pillar" key={p.title}>
              <span className="pillar-icon">{p.icon}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="explore" className="cards-section">
        <p className="eyebrow">explore kraftra</p>
        <h2 className="section-title">Four Ways In</h2>
        <div className="cards">
          <Link href="/design" className="card">
            <span className="card-index">01</span>
            <h2>Design</h2>
            <p>Create your own clothes &amp; shoes, stitch by stitch, idea by idea.</p>
          </Link>
          <Link href="/shop" className="card">
            <span className="card-index">02</span>
            <h2>Shop</h2>
            <p>Buy designs made by fellow creators or browse curated store pieces.</p>
          </Link>
          <Link href="/thrift" className="card">
            <span className="card-index">03</span>
            <h2>Thrift</h2>
            <p>Give pre-loved fashion a second life — buy and sell thrifted pieces.</p>
          </Link>
          <Link href="/artists" className="card">
            <span className="card-index">04</span>
            <h2>Artists</h2>
            <p>Build your profile, upload your designs, and earn commission on every sale.</p>
          </Link>
        </div>
      </section>

      <section className="cta-band">
        <h2>Ready to start your loop?</h2>
        <p>Your first design is one click away.</p>
        <Link href="/design" className="cta cta-solid">Start Creating</Link>
      </section>

      <footer className="footer">
        <p className="footer-brand">KRAFTRA</p>
        <p className="footer-tag">Create. Wear. Repeat.</p>
        <div className="footer-links">
          <Link href="/design">Design</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/thrift">Thrift</Link>
          <Link href="/artists">Artists</Link>
        </div>
        <p className="footer-copy">© 2026 Kraftra. All rights reserved.</p>
      </footer>
    </main>
  );
}
