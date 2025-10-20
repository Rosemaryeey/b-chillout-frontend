// components/CartIcon.tsx
"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartIcon() {
  const { cartCount } = useCart();

  return (
    <Link href="/cart" className="relative">
      <div className="w-10 h-10 bg-[#bb591c] rounded-full flex items-center justify-center text-white hover:bg-[#a04d18] transition">
        🛒
      </div>
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Link>
  );
}
