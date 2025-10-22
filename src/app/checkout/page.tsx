// app/checkout/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

interface MenuItem {
  id: string;
  name: string;
  price: number;
}

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export default function CheckoutPage() {
  const { cartItems, fetchCart } = useCart();
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"paystack" | "transfer">(
    "transfer"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false); // redirect/loading state
  const [errors, setErrors] = useState<Record<string, string>>({});
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://b-chillout-backend.onrender.com";
  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!customerDetails.name.trim()) newErrors.name = "Name is required";
    if (!customerDetails.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10,15}$/.test(customerDetails.phone.replace(/\D/g, "")))
      newErrors.phone = "Enter a valid phone number";
    if (!customerDetails.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerDetails.email))
      newErrors.email = "Enter a valid email";
    if (!customerDetails.address.trim())
      newErrors.address = "Delivery address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const initializePaystackPayment = async (orderId: string, amount: number) => {
    try {
      const res = await fetch(`${API_BASE}/payment/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          email: customerDetails.email,
          amount,
        }),
      });

      const data = await res.json();

      if (data.status && data.data.authorization_url) {
        window.location.href = data.data.authorization_url;
      } else {
        alert("Payment initialization failed.");
        console.error("Paystack response:", data);
      }
    } catch (err: any) {
      // ✅ Add type annotation
      console.error("Paystack initialization error:", err);
      alert("Failed to initialize payment. Try again.");
    }
  };

  const handleCreateOrder = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "customer123",
          customerDetails,
          paymentMethod,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(`Error: ${error.message}`);
        return;
      }

      const orderData = await response.json();

      if (paymentMethod === "paystack") {
        // ✅ Use the single function
        await initializePaystackPayment(
          orderData.orderId,
          orderData.totalAmount
        );
      } else {
        localStorage.setItem("orderId", orderData.orderId);
        window.location.href = "/payment-transfer";
      }
    } catch (error: any) {
      // ✅ Add type annotation
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <header
        className="bg-white shadow-sm"
        style={{ backgroundColor: "var(--stubborn)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/cart"
              className="text-2xl font-bold"
              style={{ color: "var(--color-accent)" }}
            >
              B-Chillout
            </Link>
            <h1
              className="text-xl font-semibold"
              style={{ color: "var(--color-contrast)" }}
            >
              Checkout
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Details Form */}
          <div className="lg:col-span-2">
            <div
              className="rounded-lg shadow-md p-6"
              style={{ backgroundColor: "var(--background)" }}
            >
              <h2
                className="text-xl font-bold mb-6"
                style={{ color: "var(--color-contrast)" }}
              >
                Customer Information
              </h2>

              <div className="space-y-4">
                {/* ... your existing form fields ... */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--foreground)" }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={customerDetails.name}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-lg focus:ring-2 focus:outline-none transition ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    style={{
                      border: errors.name
                        ? "1px solid #ef4444"
                        : "1px solid var(--color-contrast)",
                      backgroundColor: "var(--background)",
                      color: "var(--foreground)",
                    }}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--foreground)" }}
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={customerDetails.phone}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-lg focus:ring-2 focus:outline-none transition ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                    style={{
                      border: errors.phone
                        ? "1px solid #ef4444"
                        : "1px solid var(--color-contrast)",
                      backgroundColor: "var(--background)",
                      color: "var(--foreground)",
                    }}
                    placeholder="08012345678"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--foreground)" }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={customerDetails.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-lg focus:ring-2 focus:outline-none transition ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    style={{
                      border: errors.email
                        ? "1px solid #ef4444"
                        : "1px solid var(--color-contrast)",
                      backgroundColor: "var(--background)",
                      color: "var(--foreground)",
                    }}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--foreground)" }}
                  >
                    Delivery Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={customerDetails.address}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full p-3 rounded-lg focus:ring-2 focus:outline-none transition ${
                      errors.address ? "border-red-500" : ""
                    }`}
                    style={{
                      border: errors.address
                        ? "1px solid #ef4444"
                        : "1px solid var(--color-contrast)",
                      backgroundColor: "var(--background)",
                      color: "var(--foreground)",
                    }}
                    placeholder="Enter your full delivery address"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Payment Method Selection */}
                <div className="pt-4">
                  <h3
                    className="font-medium mb-2"
                    style={{ color: "var(--foreground)" }}
                  >
                    Payment Method
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "transfer"}
                        onChange={() => setPaymentMethod("transfer")}
                        className="mr-2"
                      />
                      <span>Bank Transfer (Free)</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "paystack"}
                        onChange={() => setPaymentMethod("paystack")}
                        className="mr-2"
                      />
                      <span>Paystack (Cards/Bank Apps)</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <Link
                  href="/cart"
                  className="px-6 py-3 rounded-lg font-medium transition hover:opacity-90"
                  style={{
                    border: `1px solid var(--color-accent)`,
                    color: "var(--color-accent)",
                    backgroundColor: "transparent",
                  }}
                >
                  Back to Cart
                </Link>
                <button
                  onClick={handleCreateOrder}
                  disabled={isSubmitting || loading} // ✅ disable during submission or redirect
                  className="px-6 py-3 rounded-lg font-medium transition flex items-center justify-center hover:opacity-90"
                  style={{
                    backgroundColor:
                      isSubmitting || loading
                        ? "var(--color-contrast)"
                        : "var(--color-accent)",
                    color: "white",
                    cursor: isSubmitting || loading ? "not-allowed" : "pointer",
                  }}
                >
                  {isSubmitting || loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {loading ? "Redirecting to Paystack..." : "Processing..."}
                    </>
                  ) : paymentMethod === "paystack" ? (
                    "Pay with Paystack"
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div
              className="rounded-lg shadow-md p-6 sticky top-24 "
              style={{ backgroundColor: "var(--stubborn)" }}
            >
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "var(--color-contrast)" }}
              >
                Order Summary
              </h3>

              <div className="space-y-3 mb-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span style={{ color: "var(--foreground)" }}>
                      {item.menuItem.name} × {item.quantity}
                    </span>
                    <span
                      style={{
                        color: "var(--color-accent)",
                        fontWeight: "600",
                      }}
                    >
                      ₦{(item.menuItem.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="pt-3 space-y-2"
                style={{ borderTop: "1px solid var(--color-contrast)" }}
              >
                <div className="flex justify-between">
                  <span
                    style={{ color: "var(--foreground)", fontWeight: "600" }}
                  >
                    Subtotal
                  </span>
                  <span
                    style={{ color: "var(--color-accent)", fontWeight: "600" }}
                  >
                    ₦{total.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--foreground)" }}>Delivery</span>
                  <span style={{ color: "var(--foreground)" }}>Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2">
                  <span style={{ color: "var(--color-contrast)" }}>Total</span>
                  <span style={{ color: "var(--color-contrast)" }}>
                    ₦{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div
                className="mt-6 p-4 rounded-lg"
                style={{
                  backgroundColor: "var(--color-contrast)",
                  color: "var(--foreground)",
                }}
              >
                <h4
                  className="font-bold mb-2"
                  style={{ color: "var(--color-accent)" }}
                >
                  {paymentMethod === "transfer"
                    ? "Bank Transfer Instructions"
                    : "Paystack Payment"}
                </h4>
                <p className="text-sm">
                  {paymentMethod === "transfer"
                    ? "After placing your order, you'll receive bank details for payment via transfer. Please send payment proof to complete your order."
                    : "You'll be redirected to Paystack to complete your secure payment."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
