// app/order-success/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function OrderSuccess() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    // Get customer name from localStorage
    const storedOrder = localStorage.getItem("lastOrder");
    if (storedOrder) {
      const order = JSON.parse(storedOrder);
      setCustomerName(order.customerDetails.name);
    }
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <header
        className="shadow-sm"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="text-2xl font-bold"
              style={{ color: "var(--color-accent)" }}
            >
              B-Chillout
            </Link>
            <h1
              className="text-xl font-semibold"
              style={{ color: "var(--color-contrast)" }}
            >
              Order Confirmed
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className="rounded-lg shadow-md p-8 text-center"
          style={{ backgroundColor: "var(--background)" }}
        >
          {/* Success Icon */}
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>

          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: "var(--color-contrast)" }}
          >
            Order & Payment Successful! ✅
          </h1>

          <p className="text-2xl mb-8" style={{ color: "var(--foreground)" }}>
            Mr. {customerName || "Customer"}, your order will be with you in{" "}
            <strong>30 minutes</strong>! 🚀
          </p>

          <div
            className="p-6 rounded-lg mb-8"
            style={{ backgroundColor: "var(--stubborn)" }}
          >
            <p style={{ color: "var(--foreground)" }}>
              Thank you for choosing Bamboo Chillout! We're preparing your
              delicious meal right now.
            </p>
            <p className="mt-2" style={{ color: "var(--foreground)" }}>
              <strong>Order ID:</strong> {orderId}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="px-6 py-3 rounded-lg font-medium transition hover:opacity-90 text-center"
              style={{
                border: `1px solid var(--color-accent)`,
                color: "var(--color-accent)",
                backgroundColor: "transparent",
              }}
            >
              Order More Items
            </Link>
            <Link
              href="/"
              className="px-6 py-3 rounded-lg font-medium transition hover:opacity-90 text-center"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "white",
              }}
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
