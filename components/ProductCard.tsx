"use client";
import { Product, Size } from "@/lib/store";
import Image from "next/image";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const ProductCard = ({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (product: Product, size: Size) => void;
}) => {
  const [selectedSize, setSelectedSize] = useState<Size | "">("");

  return (
    // <Link href={`product/${id}`}>
    <div className="flex flex-col z-10 items-center w-fit md:w-full transition delay-100 duration-300 ease-in-out border-[0.5px] border-[#c1c1c1]">
      <div className="w-40 md:w-72 h-40 md:h-72 z-10 overflow-hidden relative">
        <Image
          src={product.image}
          alt="Cropped Image"
          width={300}
          height={300}
          className="w-full h-full object-cover z-10"
        />
        {product.comingSoon && (
          <p className="absolute top-2 right-0 bg-blue-500 text-[#fff] font-semibold px-1 py-0.5 text-[14px]">
            Coming soon
          </p>
        )}
      </div>
      <div className="border-y-[0.5px] md:border-b-[none] border-[#c1c1c1] w-full p-3.5">
        <h3 className="text-[14px] font-normal text-[#121212BF] uppercase">
          {product.name}
        </h3>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-[14px] font-normal p-2.5 w-2/3">₦{product.price}</p>
        <div className="border-l-[0.5px] border-[#c1c1c1] p-2.5 justify-center flex items-center space-x-2">
          <label
            htmlFor={`size-${product.id}`}
            className="block text-sm font-medium mb-2"
          >
            Size
          </label>
          <Select
            value={selectedSize}
            onValueChange={(value) => setSelectedSize(value as Size)}
          >
            <SelectTrigger id={`size-${product.id}`} className="w-full">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {product.availableSizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="hidden md:block">
          {/* <button
            className={`uppercase bg-black text-white max-w-1/2 p-3.5 text-center cursor-pointer ${
              hoverState ? "block" : "hidden"
            }`}
            onClick={() => handleAddToCart({ image, name, price, id })}
          >
            Add to Cart
          </button> */}
        </div>
      </div>
      <button
        className={`uppercase bg-black text-white w-full p-3.5 text-center 
        ${product.comingSoon ? "cursor-not-allowed" : "cursor-pointer"}

        block`}
        onClick={() => {
          if (selectedSize) {
            onAddToCart(product, selectedSize as Size);
          } else {
            toast.error("Kindly select a size");
          }
        }}
        disabled={!selectedSize && product.comingSoon}
      >
        Add to Cart
      </button>
    </div>
    // </Link>
  );
};

export default ProductCard;
