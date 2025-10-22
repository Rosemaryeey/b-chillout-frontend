"use client";
export const dynamic = "force-dynamic";
export const revalidate = 0;


import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // ✅ now safe
import Link from "next/link";


export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  // ✅ Handle client-side only state
  const [isClient, setIsClient] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    // ✅ Only run on client-side
    setIsClient(true);
  }, []);

  // ✅ Handle redirect for missing orderId (client-side only)
  useEffect(() => {
    if (isClient && !orderId) {
      router.push("/menu");
    }
  }, [orderId, isClient, router]);

  // ✅ Show loading state during SSR
  if (!isClient) {
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
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div
        className="text-center p-8 rounded-lg"
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
          className="text-3xl font-bold mb-4"
          style={{ color: "var(--color-contrast)" }}
        >
          Payment Successful! ✅
        </h1>
        <p className="mb-6" style={{ color: "var(--foreground)" }}>
          Your order has been confirmed and is being prepared.
        </p>
        <Link
          href="/menu"
          className="px-6 py-3 rounded-lg font-medium"
          style={{ backgroundColor: "var(--color-accent)", color: "white" }}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
