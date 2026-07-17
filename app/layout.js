import "./globals.css";

export const metadata = {
  title: "Kraftra",
  description: "Create. Wear. Repeat.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
