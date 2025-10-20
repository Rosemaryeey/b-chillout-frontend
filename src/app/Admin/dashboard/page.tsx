// src/app/admin/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerDetails: { name: string; phone: string; address: string };
  totalAmount: number;
  paymentStatus: string;
  paymentMethod: string;
  items: OrderItem[];
  createdAt: string;
}

interface NewMenuItem {
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const router = useRouter();
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    setAdmin(isAdmin);
  }, []);
  const [newItem, setNewItem] = useState<NewMenuItem>({
    name: "",
    description: "",
    price: "",
    category: "food",
    image: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
      return;
    }

    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [ordersRes, menuRes] = await Promise.all([
        fetch("http://localhost:3000/orders", {
          headers: {
            "x-admin-password": process.env.ADMIN_PASSWORD || "",
          },
        }),
        fetch("http://localhost:3000/menu"),
      ]);

      const ordersData = await ordersRes.json();
      const menuData = await menuRes.json();

      setOrders(ordersData);
      setMenuItems(menuData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await fetch(`http://localhost:3000/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": process.env.ADMIN_PASSWORD || "",
        },
        body: JSON.stringify({ status }),
      });
      fetchAllData(); // Refresh data
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const confirmPayment = async (orderId: string) => {
    try {
      await fetch(`http://localhost:3000/orders/${orderId}/confirm-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": process.env.ADMIN_PASSWORD || "",
        },
        body: JSON.stringify({ transferDetails: {} }),
      });
      fetchAllData(); // Refresh data
    } catch (error) {
      console.error("Error confirming payment:", error);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:3000/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": process.env.ADMIN_PASSWORD || "",
        },
        body: JSON.stringify({
          ...newItem,
          price: parseFloat(newItem.price),
        }),
      });

      if (response.ok) {
        setSuccess("Menu item added successfully!");
        setNewItem({
          name: "",
          description: "",
          price: "",
          category: "food",
          image: "",
        });
        setShowAddForm(false);
        fetchAllData();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to add menu item");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(`http://localhost:3000/menu/${itemId}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": process.env.ADMIN_PASSWORD || "",
        },
      });
      fetchAllData();
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--background)" }}
      >
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)" }}
    >
      <header className="bg-[var(--color-contrast)]">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <h1
              className="text-2xl font-bold"
              style={{ color: "var(--color-accent)" }}
            >
              Admin Dashboard
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 py-2 bg-blue-500 text-[var(--foreground)]
                 rounded hover:bg-blue-600"
              >
                {showAddForm ? "Cancel" : "Add Menu Item"}
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("isAdmin");
                  window.location.href = "/";
                }}
                className="px-4 py-2 bg-gray-500 text-[var(--foreground)] rounded hover:bg-gray-600"
              >
                Logout
              </button>
              {/* Admin Navigation */}
              {admin && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => {
                      router.push("/Admin"); // ✅ Correct Next.js navigation
                    }}
                    className="px-6 py-2 bg-gray-500 text-[var(--foreground)] rounded hover:bg-gray-600"
                  >
                    MENU
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Success/Error Messages */}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
            {error}
          </div>
        )}

        {/* Add Menu Item Form */}
        {showAddForm && (
          <div className="bg-[var(--color-contrast)] p-6 rounded shadow mb-8">
            <h2 className="text-xl font-bold mb-4">Add New Menu Item</h2>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block mb-1">Name *</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Description *</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Price *</label>
                <input
                  type="number"
                  value={newItem.price}
                  onChange={(e) =>
                    setNewItem({ ...newItem, price: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block mb-1">Category *</label>
                <select
                  value={newItem.category}
                  onChange={(e) =>
                    setNewItem({ ...newItem, category: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="food">Food</option>
                  <option value="drink">Drink</option>
                  <option value="wine">Wine</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Image URL</label>
                <input
                  type="text"
                  value={newItem.image}
                  onChange={(e) =>
                    setNewItem({ ...newItem, image: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-[var(--color-accent)] text-[var(--foreground)] rounded hover:bg-[var(--color-accent)]"
              >
                Add Item
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Orders Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              Recent Orders ({orders.length})
            </h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-[var(--stubborn)] p-4 rounded shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold">
                        {order.customerDetails.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Phone: {order.customerDetails.phone}
                      </p>
                      <p className="text-sm text-gray-600">
                        Address: {order.customerDetails.address}
                      </p>
                    </div>
                    <span
                      className="px-2 py-1 rounded text-sm font-medium"
                      style={{
                        backgroundColor:
                          order.paymentStatus === "confirmed"
                            ? "green"
                            : order.paymentStatus === "pending"
                            ? "orange"
                            : "red",
                        color: "white",
                      }}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>

                  <p className="font-bold">
                    Total: ₦{order.totalAmount.toLocaleString()}
                  </p>
                  <p className="text-sm">Payment: {order.paymentMethod}</p>

                  <div className="mt-2 space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="text-sm">
                        {item.quantity}x {item.menuItem?.name || "Deleted Item"}{" "}
                        - ₦{(item.price * item.quantity).toLocaleString()}
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex gap-2">
                    {order.paymentMethod === "transfer" &&
                      order.paymentStatus === "pending" && (
                        <button
                          onClick={() => confirmPayment(order.id)}
                          className="px-3 py-1 bg-[var(--color-accent)] text-[var(--foreground)] text-sm rounded hover:bg-[var(--color-accent)]"
                        >
                          Confirm Payment
                        </button>
                      )}

                    {order.paymentStatus !== "confirmed" && (
                      <select
                        value={order.paymentStatus}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                        className="text-sm p-1 border rounded bg-[var(--color-contrast)]"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Menu Management Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              Menu Items ({menuItems.length})
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[var(--stubborn)] p-4 rounded shadow flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      ₦{item.price.toLocaleString()} • {item.category}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="px-3 py-1 bg-red-500 text-[var(--foreground)] text-sm rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
