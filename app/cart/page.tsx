import React from "react";
import Link from "next/link";
import CartItems from "@/components/CartItems";
const page = () => {
  return (
    <div className="mb-20">
      <div className="h-14"></div>

      <div className="flex items-center justify-between px-4">
        <h2 className="font-normal text-[28px] sm:text-[40px] tracking-[0.6px]">
          Your Cart
        </h2>
        <Link
          href={"/collection"}
          className="text-[16px] font-normal hover:font-semibold tracking-[0.6px] text-black underline"
        >
          Continue Shopping
        </Link>
      </div>
      <CartItems />
    </div>
  );
};
export default page;
