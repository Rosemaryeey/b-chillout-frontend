// component/menuCard.tsx
import React from "react";
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  link: string; // required if you use it in data-menu
  category?: string;
  createdAt?: string;
}

interface MenuCardProps {
  item: MenuItem;
  onAddToCart?: (item: MenuItem) => void;
  isAdmin?: boolean;
}

const MenuCard: React.FC<MenuCardProps> = ({
  item,
  onAddToCart,
  isAdmin = false,
}) => {
  return (
    <div className="bg-[var(--background)] rounded-lg shadow-md overflow-hidden flex flex-col">
      <img
        src={item.image}
        alt={item.name}
        className="h-48 w-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "https://placehold.co/400x300?text=No+Image";
        }}
      />
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
            {item.name}
          </h3>
          <p className="text-sm text-[var(--foreground)]/80">
            {item.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-semibold text-[var(--foreground)]">
            ₦{item.price.toLocaleString()}
          </span>
          {isAdmin ? (
            <div className="flex gap-2">
              <button className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600">
                Edit
              </button>
              <button className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600">
                Delete
              </button>
            </div>
          ) : onAddToCart ? (
            <button
              onClick={() => onAddToCart(item)}
              className="bg-[var(--color-accent)] text-[var(--background)] px-4 py-2 rounded hover:bg-[var(--color-accent-hover)]"
            >
              Add to Cart
            </button>
          ) : (
            <button className="bg-[var(--color-accent)] text-[var(--background)] px-4 py-2 rounded hover:bg-[var(--color-accent-hover)]">
              Order Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
