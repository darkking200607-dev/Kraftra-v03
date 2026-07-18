import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Kraftra — Create. Wear. Repeat.",
  description: "Design, shop, thrift, and sell fashion — all in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700;900&family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <nav className="navbar">
          <Link href="/" className="nav-logo">KRAFTRA</Link>
          <div className="nav-links">
            <Link href="/design">Design</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/thrift">Thrift</Link>
            <Link href="/artists">Artists</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
