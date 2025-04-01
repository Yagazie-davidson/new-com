"use client";
import React from "react";
import ProductCard from "../components/ProductCard";
import { Product, useCartStore } from "@/lib/store";
import { toast } from "sonner";
const Products = () => {
  const products: Product[] = [
    {
      id: 1001,
      name: "Goat: Hoodie",
      image: "https://llygant.com/cdn/shop/files/HoodieFront.png",
      price: 80000,
      availableSizes: ["M", "L", "XL", "XXL"],
    },
    {
      id: 1002,
      name: "Goat: White T-shirt",
      image: "https://llygant.com/cdn/shop/files/Front.png",
      price: 76000,
      availableSizes: ["M", "L", "XL", "XXL"],
    },
    {
      id: 1003,
      name: "Goat: Fire White T-shirt",
      image: "https://llygant.com/cdn/shop/files/SHIRTFRONT.png",
      price: 80000,
      availableSizes: ["M", "L", "XL", "XXL"],
      comingSoon: false,
    },
    {
      id: 1004,
      name: "Goat: Black T-shirt",
      image:
        "https://llygant.com/cdn/shop/files/Front_51044fb1-3bca-4939-a07e-ad2d0cac55b7.png",
      price: 85000,
      availableSizes: ["M", "L", "XL", "XXL"],
      comingSoon: false,
    },
    {
      id: 1005,
      name: "Goat: Black Edition",
      image:
        "https://llygant.com/cdn/shop/files/Front_4b67bb74-2418-4bcb-9d10-743af5613643.png",
      price: 67000,
      availableSizes: ["M", "L", "XL", "XXL"],
      comingSoon: false,
    },
  ];
  const { addToCart } = useCartStore();
  return (
    <div>
      <div className="h-14"></div>

      <div className="flex items-center justify-between px-6">
        <h2 className="font-normal text-[40px] tracking-[0.6px] my-8">
          Goat&apos;s Collection
        </h2>
      </div>
      <section className="px-6 justify-center md:justify-stretch items-center grid grid-cols-2 md:flex-nowrap md:grid md:grid-cols-3 lg:grid-cols-4 place-content-center place-items-center gap-x-3 md:gap-x-5 lg:gap-x-10 gap-y-4   w-full">
        {products.map((product, index) => (
          <div key={index} className="md:w-full">
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(product, size) => {
                addToCart(product, size);
                toast.message(`${product.name} added to cart!`);
              }}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Products;
