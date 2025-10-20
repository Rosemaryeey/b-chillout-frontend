import React from "react";
import "../globals.css";

export interface EventItem {
  id: number;
  name: string;
  description: string;
  price?: number; // optional
  image: string;
  link?: string; // optional
}

// Array of events
export const events: EventItem[] = [
  {
    id: 1,
    name: "Dorima Monday",
    description:
      "Kickstart your week with electrifying beats. Our DJ spins the best of Afrobeats to get you moving.",
    image: "/place.jpg",
  },
  {
    id: 2,
    name: "Chill Wednesday",
    description:
      "Unwind mid-week in our serene bamboo garden. Enjoy cool, soulful music and special discounts on cocktails.",
    image: "/place2.jpg",
  },
  {
    id: 3,
    name: "Hype Friday",
    description:
      "The weekend is here! Experience maximum energy with our hype man and DJ setting the dance floor on fire.",
    image: "/place.jpg",
  },
  {
    id: 4,
    name: "Odogwu Sunday",
    description:
      "UThe weekend is here! Experience maximum energy with our hype man and DJ setting the dance floor on fire.",
    image: "/place3.jpg",
  },
];

// Component for a single event card
interface EventCardProps {
  item: EventItem;
}

const EventCard: React.FC<EventCardProps> = ({ item }) => {
  return (
    <div className="bg-[var(--stubborn)] rounded-lg shadow-md overflow-hidden flex flex-col">
      <img
        src={item.image}
        alt={item.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-5 flex flex-col justify-between flex-1">
        <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
          {item.name}
        </h3>
        <p className="text-[var(--foreground)]/80">{item.description}</p>
      </div>
    </div>
  );
};

export default EventCard;
