import { Product } from '../components/products/ProductCard';
import { Category } from '../components/products/CategoryCard';

export const categories: Category[] = [
  { name: "Summer Dress", img: "/placeholder.png" },
  { name: "Winter Jacket", img: "/placeholder.png" },
  { name: "Office Attire", img: "/placeholder.png" },
  { name: "Fashion Party", img: "/placeholder.png" },
  { name: "Outdoor Wear", img: "/placeholder.png" },
  { name: "Indoor Relaxation", img: "/placeholder.png" },
  { name: "Sportswear", img: "/placeholder.png" }
];

export const filterOptions = [
  { name: "All", count: 25 },
  { name: "Women Only", count: 16 },
  { name: "Men Only", count: 9 },
  { name: "Mix (For All)", count: 14 },
  { name: "Winter", count: 8 },
  { name: "Summer", count: 6 },
  { name: "Autumn", count: 5 }
];

export const luxuryProducts: Product[] = [
  { id: 'lux-1', name: "Mercedes Heritage", price: 2599.99, discount: 15, img: "/placeholder.png" },
  { id: 'lux-2', name: "Silk Wear", price: 799.99, discount: 30, img: "/placeholder.png" },
  { id: 'lux-3', name: "Pure Diamond Bracelet", price: 1299.99, discount: 25, img: "/placeholder.png" },
  { id: 'lux-4', name: "Italian Couture", price: 999.99, discount: 20, img: "/placeholder.png" },
  { id: 'lux-5', name: "Ruby Set", price: 3599.99, discount: 15, img: "/placeholder.png" },
  { id: 'lux-6', name: "White Gold Watch", price: 2899.99, discount: 20, img: "/placeholder.png" },
  { id: 'lux-7', name: "Diamond", price: 1999.99, discount: 25, img: "/placeholder.png" },
  { id: 'lux-8', name: "Tuxedo", price: 799.99, discount: 20, img: "/placeholder.png" }
];

export const festiveProducts: Product[] = [
  { id: 'fest-1', name: "Anarkali Silk (M to XL)", price: 799.99, discount: 15, img: "/placeholder.png" },
  { id: 'fest-2', name: "Lehenga Choli", price: 899.99, discount: 30, img: "/placeholder.png" },
  { id: 'fest-3', name: "Wedding", price: 1299.99, discount: 25, img: "/placeholder.png" },
  { id: 'fest-4', name: "Reception Dress", price: 999.99, discount: 20, img: "/placeholder.png" },
  { id: 'fest-5', name: "Men's Kurta", price: 399.99, discount: 15, img: "/placeholder.png" },
  { id: 'fest-6', name: "Wedding Suit Groom", price: 899.99, discount: 20, img: "/placeholder.png" },
  { id: 'fest-7', name: "For Kids", price: 299.99, discount: 25, img: "/placeholder.png" },
  { id: 'fest-8', name: "Family", price: 2599.99, discount: 20, img: "/placeholder.png" }
];

export const dailyProducts: Product[] = [
  { id: 'daily-1', name: "Dhooria's Set", price: 299.99, discount: 15, img: "/placeholder.png" },
  { id: 'daily-2', name: "Jeans", price: 149.99, discount: 30, img: "/placeholder.png" },
  { id: 'daily-3', name: "Denim Jeans", price: 199.99, discount: 25, img: "/placeholder.png" },
  { id: 'daily-4', name: "Tops", price: 99.99, discount: 20, img: "/placeholder.png" },
  { id: 'daily-5', name: "Women's Jogger", price: 129.99, discount: 15, img: "/placeholder.png" },
  { id: 'daily-6', name: "H.M.O - HOMME", price: 189.99, discount: 20, img: "/placeholder.png" },
  { id: 'daily-7', name: "Jeans", price: 179.99, discount: 25, img: "/placeholder.png" },
  { id: 'daily-8', name: "Boots", price: 229.99, discount: 20, img: "/placeholder.png" }
];

export const westernProducts: Product[] = [
  { id: 'west-1', name: "T-Shirts", price: 79.99, discount: 0, img: "/placeholder.png" },
  { id: 'west-2', name: "Trousers (S-2XL Sizes)", price: 119.99, discount: 0, img: "/placeholder.png" },
  { id: 'west-3', name: "Dresses", price: 129.99, discount: 0, img: "/placeholder.png" },
  { id: 'west-4', name: "Tops", price: 69.99, discount: 30, img: "/placeholder.png" }
];

export const mensProducts: Product[] = [
  { id: 'men-1', name: "Monsoon Jackets", price: 199.99, discount: 15, img: "/placeholder.png" },
  { id: 'men-2', name: "Cotton Kurta set Ethnic", price: 149.99, discount: 20, img: "/placeholder.png" },
  { id: 'men-3', name: "Full Sleeve", price: 89.99, discount: 25, img: "/placeholder.png" },
  { id: 'men-4', name: "Blazer", price: 249.99, discount: 30, img: "/placeholder.png" }
];

export const kidswearProducts: Product[] = [
  { id: 'kid-1', name: "Baby Boy", price: 49.99, discount: 15, img: "/placeholder.png" },
  { id: 'kid-2', name: "Little Girls", price: 59.99, discount: 10, img: "/placeholder.png" },
  { id: 'kid-3', name: "Kids Ethnic", price: 79.99, discount: 20, img: "/placeholder.png" },
  { id: 'kid-4', name: "Casual", price: 49.99, discount: 15, img: "/placeholder.png" }
];

export const accessoriesProducts: Product[] = [
  { id: 'acc-1', name: "Belts", price: 29.99, discount: 0, img: "/placeholder.png" },
  { id: 'acc-2', name: "Tie Bow Tie", price: 19.99, discount: 15, img: "/placeholder.png" },
  { id: 'acc-3', name: "Hats", price: 34.99, discount: 20, img: "/placeholder.png" },
  { id: 'acc-4', name: "Watches", price: 129.99, discount: 15, img: "/placeholder.png" }
];

export const topPicksTags = [
  { name: "Men" },
  { name: "Best Sellers" },
  { name: "Zero Size" },
  { name: "Saree" },
  { name: "Kids Collection" },
]; 