"use client";
import { subscribeToNewsletter } from "@/app/actions";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Newsletter = () => {
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const refresh = false;
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 3000);
  }, [refresh]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // Modularize this- abstarct the logic and reuse on the pop up version

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      try {
        subscribeToNewsletter(formData);
        toast.success("Subscribed Successfully");
      } catch (error) {
        console.error("Subscription", error);
        toast.error("Subscription failed");
      } finally {
        setIsSubmitting(false);
        setShow(false);
      }
    }, 2000);
  };
  return (
    <div className={`relative ${show ? "block" : "hidden"}`}>
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-x-4 bg-white p-10 border border-black">
        <div>
          <div className="bg-white items-center  flex  border border-black px-4">
            <h2 className="text-2xl text-black font-semibold">GOAT</h2>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
          <label className="text-base text-center w-full text-black font-semibold md:text-xl">
            NEWSLETTER
          </label>
          <div className="flex flex-col mt-2.5 md:items-center">
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
              className="px-2 w-full md:w-full py-1 md:py-5 md:px-4 outline-0 border-black border-[2px] appearance-none text-black placeholder:text-black"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="duration-100 delay-75 font-medium text-sm justify-center items-center py-2.5 mt-3 flex cursor-pointer hover:underline md:text-xl text-white bg-black w-full border-0 rounded-none"
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>
                  Subscribe
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
                </>
              )}
            </button>
          </div>
          <p className="font-medium text-[8px] md:text-[16px] text-[#0A0A0A] my-1">
            By subscribing you are agreeing to our privacy policy
          </p>
        </form>
      </div>
      <div className="absolute top-2 right-2">
        <button className="cursor-pointer" onClick={() => setShow(false)}>
          <X size={16} color="#000" />
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
