import React from "react";
import CountrySelector from "./CountrySelector";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      {" "}
      <section className="mt-8 px-4 md:px-16 md:flex md:w-full md:justify- md:items-center md:gap-x-8">
        <div className="md:max-w-1/2 md:bg-[#0A0A0A0D] md:py-[93px] md:pl-8 md:pr-12">
          <h1 className="font-normal text-xl md:text-[42px] uppercase text-center md:text-left">
            Stay ahead of the trends
          </h1>
          <p className="text-center md:text-left font-normal text-sm md:text-2xl tracking-[0.7px]">
            Subscribe to our newsletter and be the first to discover elusive
            drops, style tips, and limited-time offers rafted for the
            trendsetters.
          </p>
        </div>
        <form className="md:w-full">
          <label className="hidden md:block text-[32px]">SUBSCRIBE</label>
          <div className="flex w-full space-x-2 mt-2.5 items-center">
            <input
              type="text"
              placeholder="Enter email address"
              className="px-2 w-[70%] md:w-full py-2 md:py-5 md:px-4 ring ring-black outline-0 border-0 text-black placeholder:text-black"
            />
            <button className="underline text-[#0A0A0A] font-medium text-sm items-center flex">
              <p className="md:text-2xl">Subscribe</p>
              <span>
                <Image
                  className="fill-black"
                  src="/svg/arrow.svg"
                  alt="go to"
                  width={16}
                  height={16}
                  priority
                />
              </span>
            </button>
          </div>
          <p className="font-medium text-[8px] md:text-[16px] text-[#0A0A0A] my-1">
            By subscribing you are agreeing to our privacy policy
          </p>
        </form>
      </section>
      <div className="my-20 px-4 md:px-16 hidden md:block">
        <hr className="" />
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md: items-center w-full">
        <section className="px-4 md:px-16 w-full md:w-fit">
          {/* <h1 className="font-medium text-xl md:text-4xl text-center md:text-left mb-2">
            Currency
          </h1> */}
          <CountrySelector />
        </section>

        <section className="px-4 md:px-16 mt-6">
          <h1 className="font-medium text-xl md:text-4xl text-center mb-2">
            Socials
          </h1>
          <div className="flex items-center justify-center space-x-6">
            <Link href="/">
              <Image
                className=""
                src="/svg/Instagram.svg"
                alt="instagram link"
                width={16}
                height={16}
                priority
              />
            </Link>
            <Link href="/">
              <Image
                className=""
                src="/svg/Tiktok.svg"
                alt="tiktok link"
                width={16}
                height={16}
                priority
              />
            </Link>
            <Link href="/">
              <Image
                className=""
                src="/svg/x.svg"
                alt="x link"
                width={16}
                height={16}
                priority
              />
            </Link>
          </div>
        </section>
      </div>
      <section className="px-4 md:px-16 mt-10">
        <hr />
        <p className="text-[#000000] font-normal text-[12px] md:text-2xl text-center mt-[27px] mb-12">
          GOAT © {new Date().getFullYear()}
        </p>
      </section>
    </>
  );
};

export default Footer;
