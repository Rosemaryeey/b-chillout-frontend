import "../globals.css"; 

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--stubborn)] text-[var(--foreground)] py-6">
      <div className="max-w-6xl mx-auto text-center">
        <p>
          © {new Date().getFullYear()} Bamboo Chillout. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
