// app/layout.tsx
"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { CartProvider } from "./context/CartContext";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Pages that should NOT show Header/Footer
  const noLayoutPages = [
    "/login",
    "/cart",
    "/menu",
    "/checkout",
    "/confirmation",
    "/Admin", // ✅ lowercase
    "/payment-transfer",
    "/payment-success",
    "/order-success",
    "/Admin/dashboard",
  ];

  const hideLayout = noLayoutPages.includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {" "}
        {/* ✅ Added suppressHydrationWarning */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            {!hideLayout && <Header />}
            <main className="min-h-[calc(100vh-120px)] relative">
              {children}
            </main>
            {!hideLayout && <Footer />}
          </CartProvider>
        </ThemeProvider>
        <script src="https://js.paystack.co/v1/inline.js"></script>
      </body>
    </html>
  );
}


