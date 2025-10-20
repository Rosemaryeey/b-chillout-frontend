// app/cart/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem {
  _id: string;
  menuItem: MenuItem;
  quantity: number;
}

export default function CartPage() {
  const { cartItems, fetchCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      await fetchCart();
      setLoading(false);
    };
    loadCart();
  }, []);

  // Remove item from cart function
  const removeItem = async (menuItemId: string) => {
    try {
      const userId = "customer123"; // Replace with actual user ID
      const response = await fetch("http://localhost:3000/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          menuItemId,
        }),
      });

      if (response.ok) {
        await fetchCart(); // Refresh cart after removal
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item from cart");
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading cart...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="bg-[var(--color-contrast)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/menu"
              className="text-2xl font-bold text-[var( --stubborn)]"
            >
              B-Chillout
            </Link>
            <h1 className="text-xl font-semibold">Shopping Cart</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
              Your cart is empty
            </h2>
            <Link
              href="/menu"
              className="bg-[var(--color-contrast)] text-[var(--foreground)] px-6 py-3 rounded-lg hover:bg-[#a04d18] transition"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-[var(--stubborn)] rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold">
                    Your Order ({cartItems.length} items)
                  </h2>
                </div>
                <div className="divide-y">
                  {cartItems.map((cartItem) => (
                    <div key={cartItem._id} className="p-6 relative">
                      {/* X icon for removal */}
                      <button
                        onClick={() => removeItem(cartItem.menuItem._id)}
                        className="absolute top-2 right-2 w-6 h-6 text-[var(--foreground)] rounded-full flex items-center justify-center hover:bg-red-600 transition text-sm font-bold"
                        title="Remove item"
                      >
                        X
                      </button>

                      <div className="flex gap-4">
                        <img
                          src={cartItem.menuItem.image}
                          alt={cartItem.menuItem.name}
                          className="w-20 h-20 object-cover rounded"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "https://placehold.co/80x80?text=No+Image";
                          }}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">
                            {cartItem.menuItem.name}
                          </h3>
                          <p className="text-[var(--muted)] ">
                            Quantity: {cartItem.quantity}
                          </p>
                          <p className="text-lg font-bold text-[var(--color-contrast)] ">
                            ₦
                            {(
                              cartItem.menuItem.price * cartItem.quantity
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-[var(--stubborn)] rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="w-full bg-[var(--color-contrast)] text-[var(--foreground)] py-3 rounded-lg hover:bg-[#a04d18] transition text-center block font-medium"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
