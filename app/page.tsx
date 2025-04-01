import Newsletter from "@/components/Newsletter";
import Products from "@/app/Products";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="bg-[#00000080]  bg-blend-multiply  relative text-white bg-[url(/images/hero.jpg)] h-[704px] bg-cover bg-center flex justify-center items-center flex-col">
        <h2 className="uppercase text-[32px] md:text-[80px] font-medium mb-1">
          GOAT&apos;S SALVATION
        </h2>

        <div className="fixed z-[99]">
          <Newsletter />
        </div>
      </section>

      <Products />
      <section className="bg-[#00000080] mt-8 bg-blend-multiply text-white bg-[url(/images/img4.jpeg)] h-[704px] bg-cover bg-center flex justify-center items-center flex-col">
        <h2 className="uppercase text-[32px] md:text-[80px] font-medium mb-1">
          OMO NAIJA
        </h2>
        <p className="font-normal text-base md:text-[35px] mb-2.5">
          Wear your heritage.
        </p>
      </section>
      <div className="flex items-center justify-center mt-10">
        <Link
          href={"#omoNaija"}
          className="underline font-medium text-base text-[25px] flex items-center space-x-2"
        >
          Shop Collection
          <span>
            <ArrowUpRight />
          </span>
        </Link>
      </div>
      <div className="h-24"></div>
    </div>
  );
}
