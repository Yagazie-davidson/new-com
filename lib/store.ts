import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Size = "M" | "L" | "XL" | "XXL";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  availableSizes: Size[];
  comingSoon?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: Size;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, size: Size) => void;
  removeFromCart: (productId: number, size: Size) => void;
  updateQuantity: (productId: number, size: Size, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      totalItems: 0,
      totalPrice: 0,

      addToCart: (product: Product, size: Size) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.product.id === product.id && item.size === size
        );

        if (existingItem) {
          const updatedItems = currentItems.map((item) =>
            item.product.id === product.id && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );

          set((state) => ({
            items: updatedItems,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price,
          }));
        } else {
          set((state) => ({
            items: [...state.items, { product, quantity: 1, size }],
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price,
          }));
        }
      },

      removeFromCart: (productId: number, size: Size) => {
        const currentItems = get().items;
        const itemToRemove = currentItems.find(
          (item) => item.product.id === productId && item.size === size
        );

        if (!itemToRemove) return;

        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product.id === productId && item.size === size)
          ),
          totalItems: state.totalItems - itemToRemove.quantity,
          totalPrice:
            state.totalPrice -
            itemToRemove.product.price * itemToRemove.quantity,
        }));
      },

      updateQuantity: (productId: number, size: Size, quantity: number) => {
        const currentItems = get().items;
        const itemToUpdate = currentItems.find(
          (item) => item.product.id === productId && item.size === size
        );

        if (!itemToUpdate) return;

        const quantityDifference = quantity - itemToUpdate.quantity;

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId && item.size === size
              ? { ...item, quantity }
              : item
          ),
          totalItems: state.totalItems + quantityDifference,
          totalPrice:
            state.totalPrice + itemToUpdate.product.price * quantityDifference,
        }));
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
