"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import '../globals.css'

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const modes = [
    { name: "Light", value: "light", icon: <Sun className="w-4 h-4" /> },
    { name: "Dark", value: "dark", icon: <Moon className="w-4 h-4" /> },
    { name: "System", value: "system", icon: <Laptop className="w-4 h-4" /> },
  ];

  const currentIcon = modes.find((m) => m.value === theme)?.icon || (
    <Laptop className="w-4 h-4" />
  );

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 p-3 rounded-lg transition-colors"
        style={{
          backgroundColor: "var(--color-accent)",
          color: "var(--foreground)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--color-accent-hover)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "var(--color-accent)";
        }}
      >
        {currentIcon}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-32 rounded-md shadow-lg z-50 transition-colors"
          style={{
            backgroundColor: "var(--stubborn)",
            color: "var(--foreground)",
          }}
        >
          {modes.map((m) => (
            <button
              key={m.value}
              onClick={() => {
                setTheme(m.value);
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-left transition-colors rounded"
              style={{
                backgroundColor:
                  theme === m.value
                    ? "var(--color-accent-hover)"
                    : "var(--stubborn)",
                color: "var(--foreground)",
              }}
              onMouseEnter={(e) => {
                if (theme !== m.value)
                  e.currentTarget.style.backgroundColor =
                    "var(--color-accent-hover)";
              }}
              onMouseLeave={(e) => {
                if (theme !== m.value)
                  e.currentTarget.style.backgroundColor = "var(--stubborn)";
              }}
            >
              {m.icon} {m.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
