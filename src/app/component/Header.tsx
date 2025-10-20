"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ModeToggle from "./modeToggle";
import OrderNow from "./orderbtn";
import "../globals.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect current section in view
      const sections = document.querySelectorAll("section[id]");
      let current = "home";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          current = section.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#menu", label: "Menu" },
    { href: "#event", label: "Events" },
    { href: "#testmonial", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className="z-30 fixed w-full transition-colors duration-300 bg-[var(--stubborn)]"
      //   className={`fixed w-full z-50 transition-colors duration-300 $
      //     {
      //     scrolled ? "bg-[var(--background)] shadow-md" : "bg-transparent"
      //   }`
      // }
    >
      {/* Desktop Nav */}
      <nav className="max-w-7xl mx-auto sm:flex hidden justify-between items-center px-8 py-4 ">
        <h1 className="text-2xl font-extrabold tracking-wide text-[var( --color-accent)]">
         Bamboo Chillout
        </h1>

        <ul className="flex gap-8 text-[var(--foreground)] font-medium">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setActiveSection(link.href.replace("#", ""))}
                className={`transition-colors hover:text-[var(--color-contrast)] ${
                  activeSection === link.href.replace("#", "")
                    ? "text-[var(--color-contrast)] border-b-2 border-[var(--color-contrast)] pb-1"
                    : ""
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex gap-4 items-center">
          <OrderNow />
          <ModeToggle />
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className="sm:hidden flex justify-between items-center p-4">
        <img
          src="/logo.png" // replace with your actual logo path
          alt="Logo"
          className="h-12 w-12 border-2 border-[var(--color-contrast)] rounded-full bg-[var(--muted)] object-cover"
        />

        <div className="flex items-center gap-3">
          <OrderNow />
          <ModeToggle />
          <button
            onClick={() => setMenuOpen(true)}
            className="text-[var(--foreground)] focus:outline-none"
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* Overlay + Mobile dropdown */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Background Blur */}
          <div
            className="flex-1 bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Dropdown Panel */}
          <div className="w-3/4 h-screen bg-[var(--background)] shadow-lg p-6 relative">
            {/* Close (X) */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 text-[var(--foreground)]"
            >
              <X size={28} />
            </button>

            <ul className="flex flex-col gap-6 mt-12 text-[var(--foreground)] font-medium">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => {
                      setActiveSection(link.href.replace("#", ""));
                      setMenuOpen(false);
                    }}
                    className={`block text-lg transition-colors hover:text-[var(--color-contrast)] ${
                      activeSection === link.href.replace("#", "")
                        ? "text-[var(--color-contrast)] border-b border-[var(--color-contrast)] pb-1"
                        : ""
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
