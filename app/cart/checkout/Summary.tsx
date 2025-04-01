"use client";
import { useCartStore } from "@/lib/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Summary = () => {
  const { items, totalPrice, totalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  console.log(items);
  return (
    <div className=" bg-[#fff] px-8 md:pt-11">
      <div className="flex items-center justify-between">
        <h2 className="font-normal text-[40px] tracking-[0.6px]">Summary</h2>
      </div>
      <div className="grid grid-cols-1 gap-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border border-black rounded-sm p-4"
          >
            <div className="flex items-center space-x-5 ">
              <div className=" relative">
                <div className="w-16 h-16 overflow-hidden">
                  <Image
                    src={item.product.image}
                    alt="Cropped Image"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="bg-[#666666] text-white rounded-full h-5 w-5 flex items-center justify-center absolute -top-2 text-xs font-semibold -right-2">
                  {item.quantity}
                </p>
              </div>
              <div className="">
                <h3 className="text-[15px] font-semibold text-black uppercase tracking-[0.6px]">
                  {item.product.name}
                </h3>

                <p className="text-[14px] font-semibold text-[#121212BF] uppercase tracking-[0.6px]">
                  {item.size}
                </p>
              </div>
            </div>
            <div>
              <p className="text-[16px] font-medium text-[#000] uppercase tracking-[0.6px]">
                ₦{item.product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <div className="flex itemc justify-between">
          <p>Subtotal: {totalItems}</p>
          <p>{totalPrice}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium">Shipping</p>
          {/* Dynamice change depending on the conutry, Free shipping in Nigeria */}
          <p>FREE</p>
        </div>
        <div className="flex itemc justify-between">
          <p className="text-3xl font-semibold">Total</p>
          <p className="text-3xl font-semibold">₦{totalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
