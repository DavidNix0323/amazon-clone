import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../../type";

interface StoreType {
  // cart
  cartProduct: Product[];
  addToCart: (product: Product) => Promise<void>;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  resetCart: () => void;
  getTotalPrice: () => number;
  getTotalQuantity: () => number;

  // favorite
  favoriteProduct: Product[];
  addToFavorite: (product: Product) => Promise<void>;
  removeFromFavorite: (productId: number) => void;
  resetFavorite: () => void;
}

// SSR-safe localStorage access
const isClient = typeof window !== "undefined";

const customStorage = {
  getItem: (name: string) => {
    if (!isClient) return null;
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: any) => {
    if (!isClient) return;
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    if (!isClient) return;
    localStorage.removeItem(name);
  },
};

export const store = create<StoreType>()(
  persist(
    (set, get) => ({
      cartProduct: [],
      favoriteProduct: [],

      addToCart: async (product: Product) => {
        set((state) => {
          const existing = state.cartProduct.find((p) => p.id === product.id);
          if (existing) {
            return {
              cartProduct: state.cartProduct.map((p) =>
                p.id === product.id
                  ? { ...p, quantity: (p.quantity ?? 0) + 1 }
                  : p
              ),
            };
          } else {
            return {
              cartProduct: [...state.cartProduct, { ...product, quantity: 1 }],
            };
          }
        });
      },

      decreaseQuantity: (productId: number) => {
        set((state) => ({
          cartProduct: state.cartProduct.map((p) =>
            p.id === productId
              ? { ...p, quantity: Math.max((p.quantity ?? 1) - 1, 1) }
              : p
          ),
        }));
      },

      removeFromCart: (productId: number) => {
        set((state) => ({
          cartProduct: state.cartProduct.filter((p) => p.id !== productId),
        }));
      },

      resetCart: () => set({ cartProduct: [] }),

      getTotalPrice: () =>
        get().cartProduct.reduce(
          (acc, p) => acc + p.price * (p.quantity ?? 1),
          0
        ),

      getTotalQuantity: () =>
        get().cartProduct.reduce((acc, p) => acc + (p.quantity ?? 1), 0),

      addToFavorite: async (product: Product) => {
        set((state) => {
          const isFavorite = state.favoriteProduct.some(
            (item) => item.id === product.id
          );
          return {
            favoriteProduct: isFavorite
              ? state.favoriteProduct.filter((item) => item.id !== product.id)
              : [...state.favoriteProduct, { ...product }],
          };
        });
      },

      removeFromFavorite: (productId: number) => {
        set((state) => ({
          favoriteProduct: state.favoriteProduct.filter(
            (item) => item.id !== productId
          ),
        }));
      },

      resetFavorite: () => set({ favoriteProduct: [] }),
    }),
    {
      name: "store-storage",
      storage: customStorage,
      partialize: (state) => ({
        cartProduct: state.cartProduct,
        favoriteProduct: state.favoriteProduct,
      }),
    }
  )
);

