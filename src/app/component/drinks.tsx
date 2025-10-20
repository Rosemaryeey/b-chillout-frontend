import { useEffect, useState } from "react";
import MenuCard, { MenuItem } from "./menuCard";

export default function DrinksPage() {
  const [Drinks, setDrinks] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/menu/drink") // your backend API
      .then((res) => res.json())
      .then((data) => setDrinks(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Our Drinks</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Drinks.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
