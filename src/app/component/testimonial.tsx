"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // npm install lucide-react

interface Testimonial {
  id: number;
  name: string;
  title: string;
  message: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Chioma Okafor",
    title: "Food Blogger",
    message:
      "The Jollof Rice at Bamboo Bistro is a game-changer! The ambiance is perfect for a chill evening with friends. Highly recommended.",
    image: "/images/testimonial1.jpg",
  },
  {
    id: 2,
    name: "David Adeleke",
    title: "Regular Customer",
    message:
      "I'm a regular at Hype Friday, and it never disappoints. The energy is infectious, and the drinks are amazing. Best spot in town!",
    image: "/images/testimonial2.jpg",
  },
  {
    id: 3,
    name: "Funke Akindele",
    title: "Actress",
    message:
      "A true taste of home. The Egusi soup took me back to my grandmother's kitchen. The service is excellent too.",
    image: "/images/testimonial3.jpg",
  },
  {
    id: 4,
    name: "Chuka O.",
    title: "Chef",
    message:
      "Love the attention to detail and authentic flavors. Tropicana is a must-visit!",
    image: "/images/testimonial4.jpg",
  },
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section className="  max-w-6xl mx-auto px-4  flex flex-col items-center ">
      <h2 className="text-4xl font-bold text-center mb-4 font-serif text-[var(--color-accent)] ">
        From Our Guests
      </h2>
      <p className="text-center mb-8 ">
        Don’t just take our word for it. Here’s what our happy customers have to
        say.
      </p>

      <div className="relative w-5/6 ">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-[var(--background)] p-2 rounded-full shadow hover:bg-[var(--stubborn)]"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="
          flex space-x-7 overflow-x-auto overflow-y-hidden scrollbar-none py-6 px-0 sm:px-8 
          "
        >
          {testimonials.map((t) => (
            <div
              key={t.id}
              className=" 
                flex-shrink-0 snap-center 
                w-64 sm:w-32 md:w-69
               bg-[var(--stubborn)] 
                rounded-2xl shadow-lg p-6 
                flex flex-col items-center text-center space-y-2 
              "
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full object-cover "
              />
              <div className="flex justify-center">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
              </div>
              <p className="italic text-sm text-[var(--muted)]">
                “{t.message}”
              </p>
              <h4 className="font-semibold text-lg text-[var(--color-highlight)]">
                {t.name}
              </h4>
              <span className="text-sm text-[var(--muted)]">{t.title}</span>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-[var(--background)] p-2 rounded-full shadow hover:bg-[var(--stubborn)] "
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
