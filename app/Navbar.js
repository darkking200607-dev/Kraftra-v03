"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const links = [
  { href: "/design", label: "Design" },
  { href: "/shop", label: "Shop" },
  { href: "/thrift", label: "Thrift" },
  { href: "/artists", label: "Artists" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
  };

  return (
    <nav className="navbar">
      <Link href="/" className="nav-logo" onClick={() => setOpen(false)}>
        KRAFTRA
      </Link>

      <button
        className="nav-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span className={`bar ${open ? "open" : ""}`} />
        <span className={`bar ${open ? "open" : ""}`} />
        <span className={`bar ${open ? "open" : ""}`} />
      </button>

      <div className={`nav-links ${open ? "open" : ""}`}>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={pathname === l.href ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </Link>
        ))}

        {user ? (
          <button type="button" className="nav-logout" onClick={handleLogout}>
            Log Out
          </button>
        ) : (
          <Link
            href="/login"
            className={pathname === "/login" ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
