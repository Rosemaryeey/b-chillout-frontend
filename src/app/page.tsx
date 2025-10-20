"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import MenuCard, { MenuItem } from "./component/menuCard";
import EventCard, { events } from "./component/events";
import Image from "next/image";
import Testimonial from "./component/testimonial";
import Contact from "./component/contact";
import { useState, useEffect } from "react";

const galleryImages = [
  { id: 1, src: "/place.jpg", alt: "Signature Dish" },
  { id: 2, src: "/place2.jpg", alt: "Traditional Drink" },
  { id: 3, src: "/place3.jpg", alt: "Restaurant Interior" },
  { id: 4, src: "/place3.jpg", alt: "Event Setup" },
  { id: 5, src: "/place.jpg", alt: "Chef at Work" },
  { id: 6, src: "/place2.jpg", alt: "Tropicana Experience" },
];

export default function Home() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<
    "food" | "drinks" | "wines"
  >("food");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/menu");
        const data = await response.json();
        setMenuItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu:", error);
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return (
    <main className="relative w-full text-[var(--foreground)] flex flex-col items-center justify-center overflow-hidden ">
      {/* Video Background Wrapper */}
      <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
        <video
          className="object-cover w-full h-full"
          src="/vi.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--bg-start),var(--bg-mid),var(--bg-end))] pointer-events-none"></div>
      </div>

      {/* HOME */}
      <section
        id="home"
        className="relative z-10 w-full py-28 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24"
      >
        <div
          className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8
        "
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif px-2">
            Welcome to Bamboo Chillout
          </h1>
          <p className="font-serif font-medium px-4 sm:px-10 md:px-20 lg:px-40 max-w-4xl text-sm sm:text-base">
            placeat quae sint veritatis fugit a, facilis distinctio voluptatem t
            quae sint veritatis fugit a, facilis distinctio voluptatem inventore
          </p>
          <div className="flex flex-col sm:flex-row md:justify-around items-center gap-2 sm:gap-6 w-full max-w-sm sm:max-w-md ">
            <Link href="/menu">
              <button className="py-2 px-10 md:px-6 sm:px-6 border-2 rounded-md text-sm sm:text-base">
                View Menu
              </button>
            </Link>

            <a href="tel:08037419758">
              <button className="py-2 px-10 md:px- sm:px-6 border-2 rounded-md text-sm sm:text-base">
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* about */}
      <section
        id="about"
        className="bg-[var(--background)] w-full py-16 px-6 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10 "
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 py-12">
          <div className="w-full md:w-3/5 space-y-6 px-2 sm:px-4">
            <h2 className="text-3xl sm:text-4xl font-serif text-[var(--color-contrast)]">
              Our Story
            </h2>
            <p className="text-sm sm:text-base">
              Bamboo Bistro was born from a passion for sharing the rich,
              diverse flavors of Nigerian and Igbo culture. We are more than
              just a restaurant; we are a "chillout" spot, a vibrant gathering
              place where good food, great music, and warm company come together
              to create unforgettable memories. Our name, "Bamboo Bistro,"
              reflects our tropical-inspired decor that provides a serene
              escape. We pride ourselves on using fresh, locally-sourced
              ingredients to craft authentic dishes that tell a story of
              tradition and innovation.
            </p>
          </div>
          <div className="w-full md:w-3/5">
            <img
              src="/place.jpg"
              alt="Restaurant Interior"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* menu */}
      <section
        id="menu"
        className="bg-[var(--stubborn)] w-full py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10"
      >
        <div className="text-center max-w-3xl mx-auto mb-10 px-4 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-serif text-[var(--color-accent)]">
            Today's Menu
          </h2>
          <p className="text-sm sm:text-base text-[var(--foreground)]/80">
            Explore our selection of authentic Nigerian dishes, refreshing
            drinks, and fine wines.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center px-2 sm:px-4 space-y-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 bg-[var(--background)] p-1 rounded-lg text-[var(--foreground)]/60">
            <button
              onClick={() => setActiveCategory("food")}
              className={`px-4 py-2 sm:px-6 sm:py-2 rounded-md text-sm sm:text-base ${
                activeCategory === "food"
                  ? "bg-[var(--stubborn)] text-[var(--foreground)]"
                  : "hover:bg-[var(--stubborn)] hover:text-[var(--foreground)]"
              }`}
            >
              Dishes
            </button>
            <button
              onClick={() => setActiveCategory("drinks")}
              className={`px-4 py-2 sm:px-6 sm:py-2 rounded-md text-sm sm:text-base ${
                activeCategory === "drinks"
                  ? "bg-[var(--stubborn)] text-[var(--foreground)]"
                  : "hover:bg-[var(--stubborn)] hover:text-[var(--foreground)]"
              }`}
            >
              Drinks
            </button>
            <button
              onClick={() => setActiveCategory("wines")}
              className={`px-4 py-2 sm:px-6 sm:py-2 rounded-md text-sm sm:text-base ${
                activeCategory === "wines"
                  ? "bg-[var(--stubborn)] text-[var(--foreground)]"
                  : "hover:bg-[var(--stubborn)] hover:text-[var(--foreground)]"
              }`}
            >
              Wines
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="w-full text-center py-8">
              <p className="text-lg">Loading menu...</p>
            </div>
          )}

          {/* Cards */}
          {!loading && (
            <div className="w-full">
              {activeCategory === "food" && (
                <section className="w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuItems
                      .filter((item) => item.category === "food")
                      .slice(0, 3)
                      .map((item) => (
                        <MenuCard key={item._id} item={item} />
                      ))}
                  </div>
                </section>
              )}

              {activeCategory === "drinks" && (
                <section className="w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuItems
                      .filter((item) => item.category === "drink")
                      .slice(0, 3)
                      .map((item) => (
                        <MenuCard key={item._id} item={item} />
                      ))}
                  </div>
                </section>
              )}

              {activeCategory === "wines" && (
                <section className="w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuItems
                      .filter((item) => item.category === "wine")
                      .slice(0, 3)
                      .map((item) => (
                        <MenuCard key={item._id} item={item} />
                      ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* No items found */}
          {!loading &&
            menuItems.filter(
              (item) =>
                item.category ===
                (activeCategory === "drinks"
                  ? "drink"
                  : activeCategory === "wines"
                  ? "wine"
                  : "food")
            ).length === 0 && (
              <div className="w-full text-center py-8 text-[var(--foreground)]/60">
                No items available in this category
              </div>
            )}

          <div className="w-full max-w-xs flex items-center justify-center mt-6">
            <Link href="/menu">
              <button className="w-full px-4 py-3 sm:px-8 sm:py-3 bg-[var(--color-accent)] text-[var(--background)] rounded-md text-sm sm:text-base">
                Full Menu
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* events */}
      <section
        id="event"
        className="p-4 sm:p-6 md:p-8 lg:p-12 xl:p-14 bg-[var(--background)] w-full relative z-10 "
      >
        <div className="text-center max-w-2xl mx-auto mb-10 px-4 space-y-2 ">
          <h2 className="text-3xl sm:text-4xl font-serif text-[var(--color-contrast)]">
            Weekly Events
          </h2>
          <p className="text-sm sm:text-base text-[var(--foreground)]/80">
            There's always something happening at Bamboo Bistro. Join us for a
            week of fun, music, and good vibes.
          </p>
        </div>
        <div className="px-2 sm:px-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {events.map((item) => (
              <EventCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* gallery */}
      <section className="w-full py-16 px-6 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-[var(--stubborn)] relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-10 font-serif">
            Our Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {galleryImages.map((img) => (
              <div
                key={img.id}
                className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300 sm:px-9"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* testimonial */}
      <section
        id="testmonial"
        className="bg-[var(--background)] w-full py-16 px-2 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10"
      >
        <Testimonial />
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="bg-[var(--stubborn)] w-full py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10"
      >
        <Contact />
      </section>
    </main>
  );
}
