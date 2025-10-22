import { useEffect, useState } from "react";
import MenuCard, { MenuItem } from "./menuCard";

export default function WinesPage() {
  const [Wines, setWines] = useState<MenuItem[]>([]);
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://b-chillout-backend.onrender.com";
  useEffect(() => {
    fetch(`${API_BASE}/menu/wine`) // your backend API
      .then((res) => res.json())
      .then((data) => setWines(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Our Wines</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Wines.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
