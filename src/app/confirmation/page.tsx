// app/order-confirmation/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface MenuItem {
  name: string;
  price: number;
}

interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}

interface Order {
  id: string;
  totalAmount: number;
  paymentMethod: "paystack" | "transfer";
  customerDetails: {
    name: string;
    phone: string;
    address: string;
    email: string;
  };
  items: OrderItem[];
  createdAt: string;
}

export default function OrderConfirmation() {
  const [order, setOrder] = useState<Order | null>(null);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const storedOrder = localStorage.getItem("lastOrder");
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    }
  }, []);

  const handleConfirmPayment = async () => {
    if (!order) return;

    setConfirming(true);
    try {
      const response = await fetch(
        "http://localhost:3000/orders/confirm-payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: order.id }),
        }
      );

      if (response.ok) {
        // Redirect to success page
        window.location.href = `/order-success?orderId=${order.id}`;
      } else {
        const error = await response.json();
        alert(`❌ Error: ${error.message}`);
      }
    } catch (error) {
      alert("❌ Failed to confirm payment. Please try again.");
    } finally {
      setConfirming(false);
    }
  };

  if (!order) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--background)" }}
      >
        <p>Loading...</p>
      </div>
    );
  }

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
              Order Received
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className="rounded-lg shadow-md p-8 text-center"
          style={{ backgroundColor: "var(--background)" }}
        >
          <div
            className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>

          <h1
            className="text-3xl font-bold mb-4"
            style={{ color: "var(--color-contrast)" }}
          >
            Order Received! 🎉
          </h1>

          <p className="mb-6" style={{ color: "var(--foreground)" }}>
            Hello <strong>{order.customerDetails.name}</strong>, thank you for
            your order!
          </p>

          {/* Bank Details Section */}
          <div
            style={{ backgroundColor: "var(--stubborn)" }}
            className="p-6 rounded-lg mb-8"
          >
            <h3
              style={{ color: "var(--color-accent)" }}
              className="text-xl font-bold mb-4"
            >
              🏦 Please Make Payment to:
            </h3>
            <div className="space-y-3 text-left max-w-md mx-auto">
              <div>
                <span style={{ color: "var(--color-contrast)" }}>Bank:</span>
                <p className="font-medium">First Bank</p>
              </div>
              <div>
                <span style={{ color: "var(--color-contrast)" }}>
                  Account Name:
                </span>
                <p className="font-medium">Bamboo Chillout Restaurant</p>
              </div>
              <div>
                <span style={{ color: "var(--color-contrast)" }}>
                  Account Number:
                </span>
                <p className="font-medium">1234567890</p>
              </div>
              <div>
                <span style={{ color: "var(--color-contrast)" }}>Amount:</span>
                <p className="font-medium">
                  ₦{order.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="mb-8">
            <p style={{ color: "var(--foreground)" }} className="mb-4">
              <strong>Next Steps:</strong>
            </p>
            <ol
              className="text-left max-w-md mx-auto space-y-2"
              style={{ color: "var(--foreground)" }}
            >
              <li>1. Make your payment to the bank details above</li>
              <li>2. Click the button below once you've sent the payment</li>
            </ol>
          </div>

          {/* Payment Confirmation Button */}
          <button
            onClick={handleConfirmPayment}
            disabled={confirming}
            className="px-8 py-4 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition font-bold text-lg"
            style={{
              backgroundColor: confirming
                ? "var(--color-contrast)"
                : "var(--color-accent)",
              cursor: confirming ? "not-allowed" : "pointer",
            }}
          >
            {confirming ? "Processing..." : "I Have Sent Payment ✅"}
          </button>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="px-6 py-3 rounded-lg font-medium transition hover:opacity-90 text-center"
              style={{
                border: `1px solid var(--color-accent)`,
                color: "var(--color-accent)",
                backgroundColor: "transparent",
              }}
            >
              Browse More Items
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
