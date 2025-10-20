import { MenuItem } from "./menuCard";

export const dishes: MenuItem[] = [
  {
    id: 1,
    name: "Jollof Rice with Grilled Chicken",
    description:
      "A smoky, flavorful classic! Slow-cooked in a rich tomato and pepper sauce, infused with traditional spices, served with perfectly grilled chicken.",
    price: 4500,
    image: "/chicken-1807883_1280.jpg",
    link: "/menu/dishes/jollof-rice",
  },
  {
    id: 2,
    name: "Egusi Soup with Pounded Yam",
    description:
      "A rich and savory soup made from ground melon seeds, spinach, and assorted meats. Served with smooth, satisfying pounded yam.",
    price: 5500,
    image: "/grill-4709068_1280.jpg",
    link: "/menu/dishes/egusi-soup",
  },
  {
    id: 3,
    name: "Grilled Tilapia & Plantain",
    description:
      "Fresh Tilapia marinated in local spices, grilled to perfection, accompanied by sweet fried plantains and spicy pepper sauce.",
    price: 6000,
    image: "/chicken-1807883_1280.jpg",
    link: "/menu/dishes/grilled-tilapia",
  },
  // add more for full menu page
];

export const drinks: MenuItem[] = [
  {
    id: 1,
    name: "Zobo Drink",
    description:
      "Refreshing hibiscus drink infused with spices,Refreshing hibiscus drink infused with .",
    price: 1200,
    image: "/images/zobo.jpg",
    link: "/menu/drinks/zobo",
  },
  {
    id: 2,
    name: "Palm Wine",
    description:
      "Traditional fresh palm wine, chilled to perfection.,Refreshing hibiscus drink infused with ",
    price: 1500,
    image: "/images/palmwine.jpg",
    link: "/menu/drinks/palm-wine",
  },
  {
    id: 3,
    name: "Chapman",
    description:
      "A sweet, fruity cocktail with a Nigerian twist.,Refreshing hibiscus drink infused with ",
    price: 2000,
    image: "/images/chapman.jpg",
    link: "/menu/drinks/chapman",
  },
];

export const wines: MenuItem[] = [
  {
    id: 1,
    name: "Red Wine (Imported)",
    description: "Full-bodied red wine with rich flavors.",
    price: 8000,
    image: "/images/redwine.jpg",
    link: "/menu/wines/red-wine",
  },
  {
    id: 2,
    name: "White Wine (Imported)",
    description: "Crisp, chilled white wine with a smooth finish.",
    price: 8500,
    image: "/images/whitewine.jpg",
    link: "/menu/wines/white-wine",
  },
  {
    id: 3,
    name: "Sparkling Wine",
    description: "Perfectly chilled sparkling wine for special occasions.",
    price: 9500,
    image: "/images/sparklingwine.jpg",
    link: "/menu/wines/sparkling-wine",
  },
];
