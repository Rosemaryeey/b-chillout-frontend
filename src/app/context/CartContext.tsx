"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface MenuItem {
  _id?: string; // MongoDB ID
  id?: string; // optional fallback if some items use `id`
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (item: MenuItem) => Promise<void>;
  fetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [userId, setUserId] = useState<string | null>(null); // ✅

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUserId = localStorage.getItem("userId");
      if (savedUserId) {
        setUserId(savedUserId);
      } else {
        const newId = `guest_${Date.now()}`;
        localStorage.setItem("userId", newId);
        setUserId(newId);
      }
    }
  }, []);

  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE ||
    "https://b-chillout-backend.onrender.com";

  const fetchCart = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`${API_BASE}/cart/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.items) {
        setCartItems(data.items);
        setCartCount(
          data.items.reduce(
            (sum: number, item: CartItem) => sum + item.quantity,
            0
          )
        );
      } else {
        setCartItems([]);
        setCartCount(0);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      // Optionally, show a user-friendly message or retry logic
      // For now, keep cart empty but log the issue
    }
  };

  const addToCart = async (item: MenuItem) => {
    if (!userId) return;

    // ✅ DEBUG FIRST — we inspect before firing API
    console.log("DEBUG: Request body payload:", {
      userId,
      body: JSON.stringify({
        userId,
        menuItemId: item._id ?? item.id,
        quantity: 1,
      }),

      quantity: 1,
    });

    try {
      const response = await fetch(`${API_BASE}/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          menuItemId: item.id || (item as any)._id,
          quantity: 1,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        await fetchCart();
      } else {
        alert(`Error: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  return (
    <CartContext.Provider
      value={{ cartItems, cartCount, addToCart, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
