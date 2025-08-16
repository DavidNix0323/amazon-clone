import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { store } from "./store";
import { Product } from "../../type";

// Tailwind class merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Cart total calculation
export const calculateCartTotals = () => {
  const isClient = typeof window !== "undefined";
  if (!isClient) return { regular: 0, discounted: 0 };

  const { cartProduct } = store.getState();

  const totals = cartProduct.reduce(
    (sum, product: Product) => {
      const quantity = product.quantity ?? 1;
      const discountRate = product.discountPercentage ?? 0;

      sum.regular += product.price * quantity;
      sum.discounted += product.price * (discountRate / 100) * quantity;

      return sum;
    },
    { regular: 0, discounted: 0 }
  );

  return totals;
};
