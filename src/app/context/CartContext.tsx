// context/CartContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface MenuItem {
  id: string;
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

  const userId = "customer123"; // Replace with actual user ID in production
  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE ||
    "https://b-chillout-backend.onrender.com";

  const fetchCart = async () => {
    try {
      const response = await fetch(`${API_BASE}/cart/${userId}`);
      const data = await response.json();
      if (data.items) {
        setCartItems(data.items);
        const totalItems = data.items.reduce(
          (sum: number, item: CartItem) => sum + item.quantity,
          0
        );
        setCartCount(totalItems);
      } else {
        setCartItems([]);
        setCartCount(0);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (item: MenuItem) => {
    try {
      const response = await fetch(`${API_BASE}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          menuItemId: item.id,
          quantity: 1,
        }),
      });

      if (response.ok) {
        await fetchCart(); // Refresh cart after adding
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

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
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
