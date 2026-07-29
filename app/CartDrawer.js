"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./cartContext";
import { supabase } from "./supabaseClient";

export default function CartDrawer() {
  const { items, removeFromCart, updateQty, clearCart, total, open, setOpen } = useCart();
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [checkError, setCheckError] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
  }, []);

  const handlePlaceOrder = async () => {
    setCheckError("");
    const { data: userData } = await supabase.auth.getUser();
    const currentUser = userData?.user ?? null;
    if (!currentUser) {
      setCheckError("Please log in first.");
      return;
    }
    setChecking(true);
    const { error } = await supabase.from("orders").insert({
      user_id: currentUser.id,
      items,
      total,
    });
    setChecking(false);
    if (error) {
      setCheckError(error.message);
    } else {
      setPlaced(true);
      clearCart();
    }
  };

  if (!open) return null;

  return (
    <div className="cart-overlay" onClick={() => setOpen(false)}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button type="button" className="cart-close" onClick={() => setOpen(false)}>✕</button>
        </div>

        {placed ? (
          <div className="cart-placed">
            <p className="auth-message">Order placed! Thank you for shopping at Kraftra.</p>
            <button
              type="button"
              className="cta cta-solid"
              onClick={() => { setPlaced(false); setOpen(false); }}
            >
              Continue Browsing
            </button>
          </div>
        ) : items.length === 0 ? (
          <p className="page-sub">Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div
                    className="cart-item-thumb"
                    style={item.color ? { background: `linear-gradient(135deg, ${item.color}33, ${item.color}11)` } : undefined}
                  />
                  <div className="cart-item-info">
                    <h4>{item.title}</h4>
                    <p>₹{item.price}</p>
                    <div className="qty-stepper">
                      <button type="button" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button type="button" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                  </div>
                  <button type="button" className="cart-remove" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <span>Total</span>
              <strong>₹{total}</strong>
            </div>

            {checkError && <p className="auth-error">{checkError}</p>}

            {user ? (
              <button
                type="button"
                className="cta cta-solid auth-submit"
                onClick={handlePlaceOrder}
                disabled={checking}
              >
                {checking ? "Placing Order…" : "Place Order"}
              </button>
            ) : (
              <Link
                href="/login"
                className="cta cta-solid auth-submit"
                style={{ textAlign: "center", display: "block" }}
                onClick={() => setOpen(false)}
              >
                Log In to Checkout
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
                }
