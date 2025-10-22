// app/menu/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CartIcon from "../component/CartIcon";
import { useCart } from "../context/CartContext";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  createdAt?: string;
}

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const { addToCart, cartCount } = useCart();
  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE ||
    "https://b-chillout-backend.onrender.com";


  // Check if admin is logged in
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    setAdmin(isAdmin);
  }, []);

  // Fetch menu based on category and search
  useEffect(() => {
    setLoading(true);
    let url = `${API_BASE}/menu`;

    const queryParams = [];
    if (category !== "all") {
      queryParams.push(`category=${category}`);
    }
    if (search) {
      queryParams.push(`search=${encodeURIComponent(search)}`);
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join("&")}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
        setLoading(false);
      });
  }, [category, search]);

  const handleAddToCart = async (menuItem: MenuItem) => {
    await addToCart(menuItem);
    setAddedItems((prev) => new Set(prev).add(menuItem.id));
    // Reset "Added" state after 2 seconds
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(menuItem.id);
        return newSet;
      });
    }, 2000);
  };

  // Add these state variables
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "food",
    image: "",
  });

  // Add these functions
  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setEditForm({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      image: item.image,
    });
  };

  const handleUpdateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      const response = await fetch(`${API_BASE}/menu/${editingItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": "MySuperSecurePassword123!", // Use your actual password
        },
        body: JSON.stringify({
          ...editForm,
          price: parseFloat(editForm.price),
        }),
      });

      if (response.ok) {
        // Refresh menu
        const url = `${API_BASE}/menu`;
        const res = await fetch(url);
        const data = await res.json();
        setItems(data);
        setEditingItem(null);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(`${API_BASE}/menu/${itemId}`, {
        method: "DELETE",
        headers: { "x-admin-password": "MySuperSecurePassword123!" },
      });
      // Refresh menu
      const url = `${API_BASE}/menu`;
      const res = await fetch(url);
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header with Cart Icon */}
      <header className="bg-[var(--stubborn)] shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[var(--color-contrast)]">
                B-Chillout
              </h1>
            </div>

            <div className="flex items-center gap-4">
              {admin ? (
                <Link
                  href="/Admin/dashboard"
                  className="text-lg text-[var(--foreground)] hover:text-[#bb591c]"
                >
                  Admin Dashboard
                </Link>
              ) : (
                <Link
                  href="../Admin"
                  className="text-lg text-[var(--foreground)] hover:text-[#bb591c]"
                >
                  Admin Login
                </Link>
              )}
              <CartIcon />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4 sm:mb-0">
            Menu
          </h1>
          <Link
            href="/"
            className="border-2 border-[#bb591c] text-[var(--muted)] px-4 py-2 rounded-lg hover:bg-[var(--color-contrast)] hover:text-white transition"
          >
            Back to Home
          </Link>
        </div>

        {/* Category buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["all", "food", "drink", "wine"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded text-sm md:text-base transition ${
                category === cat
                  ? "bg-[var(--color-contrast)] text-[var(--foreground)]"
                  : "bg-[var(--stubborn)] hover:bg-[var(--color-contrast)]"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 p-3 border rounded w-full max-w-md"
        />

        {/* Loading state */}
        {loading && (
          <div className="text-center py-8">
            <p className="text-lg">Loading menu...</p>
          </div>
        )}
        {/* Edit Form */}
        {editingItem && (
          <div className="bg-white p-6 rounded shadow mb-6">
            <h3 className="text-lg font-bold mb-4">Edit Menu Item</h3>
            <form onSubmit={handleUpdateItem} className="space-y-3">
              <input
                type="text"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="number"
                value={editForm.price}
                onChange={(e) =>
                  setEditForm({ ...editForm, price: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <select
                value={editForm.category}
                onChange={(e) =>
                  setEditForm({ ...editForm, category: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="food">Food</option>
                <option value="drink">Drink</option>
                <option value="wine">Wine</option>
              </select>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Menu items */}
        {!loading && !editingItem && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-[var(--foreground)] rounded-lg shadow-md overflow-hidden flex flex-col"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/400x300?text=No+Image";
                  }}
                />
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-bold text-[var(--background)] mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[var(--stubborn)]">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-semibold text-[var(--color-contrast)]">
                      ₦{item.price.toLocaleString()}
                    </span>
                    {admin ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditItem(item)}
                          className="bg-blue-500 text-[var(--foreground)] px-2 py-1 rounded text-sm hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="bg-red-500 text-[var(--foreground)] px-2 py-1 rounded text-sm hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={addedItems.has(item.id)}
                        className={`px-4 py-2 rounded text-[var(--foreground)] font-medium transition ${
                          addedItems.has(item.id)
                            ? "bg-[var(--color-accent)] hover:bg-green-500 cursor-default"
                            : "bg-[var(--color-contrast)] hover:bg-[#a04d18]"
                        }`}
                      >
                        {addedItems.has(item.id) ? "Added!" : "Add to Cart"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No items found */}
        {!loading && items.length === 0 && (
          <div className="text-center py-8 text- text-[var(--muted)]">
            No items found
          </div>
        )}
      </main>
    </div>
  );
}
