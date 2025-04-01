"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statesOfNigeria } from "@/lib/state";
import { useCartStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import dynamic from "next/dynamic";

const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);
import { PaystackProps } from "react-paystack/dist/types";
import { billingLogic } from "@/app/actions";

type referenceObj = {
  message: string;
  reference: string;
  status: "sucess" | "failure";
  trans: string;
  transaction: string;
  trxref: string;
};

const Billing = () => {
  const router = useRouter();
  const { items, totalItems, totalPrice, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedState, setSelectedState] = useState<string | "">("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    city: "",
    postalCode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const config: PaystackProps = {
    reference: `${Math.floor(Math.random() * 1000000000 + 1)}`,
    email: formData.email,
    amount: totalPrice * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
  };
  const checkCart = (totalItems: number) => {
    if (totalItems === 0) {
      toast.message("Cart is empty");
      return true;
    }
    return false;
  };
  const handleSubmit = async (reference: referenceObj) => {
    // e.preventDefault();
    setIsSubmitting(true);
    if (checkCart(totalItems)) {
      router.push("/cart");
    }

    setTimeout(async () => {
      try {
        await billingLogic(
          {
            ...formData,
            selectedState,
            totalPrice,
          },
          items,
          reference.reference
        );
        toast.success("Order placed successfully!");
        router.push("/cart");
        clearCart();
      } catch (error) {
        console.error("Checkout error:", error);
        toast.error("Checkout failed");
      } finally {
        setIsSubmitting(false);
      }
    }, 1000);
  };

  const onSuccess = async (reference: referenceObj) => {
    handleSubmit(reference);
  };

  const onClose = () => {
    toast.error("Payment cancelled.");
  };

  const componentProps = {
    ...config,
    text: `Proceed to Paystack`,
    onSuccess,
    onClose,
  };

  return (
    <div className="px-6">
      <div className="flex items-center justify-between">
        <h2 className="font-normal text-[40px] tracking-[0.6px] mt-8">
          Billing
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-[25px] tracking-[0.6px]">
            Contact
          </h2>
        </div>
        <div className="space-y-2 flex flex-col">
          <label
            htmlFor="name"
            className="font-medium text-[18px] tracking-[0.6px]"
          >
            Full Name*
          </label>
          <input
            id="name"
            name="name"
            placeholder="Full Name"
            required
            className={cn(
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
            )}
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2 flex flex-col">
          <label
            htmlFor="email"
            className="font-medium text-[18px] tracking-[0.6px]"
          >
            Email*
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className={cn(
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
            )}
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-[25px] tracking-[0.6px]">
            Delivery
          </h2>
        </div>
        <div className="space-y-2 flex flex-col">
          <label
            htmlFor="address"
            className="font-medium text-[18px] tracking-[0.6px]"
          >
            Address*
          </label>
          <input
            id="address"
            name="address"
            placeholder="Shipping Address"
            required
            className={cn(
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
            )}
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className=" flex flex-col md:flex-row  items-center md:space-x-6 space-x-0 w-full">
          <div className="space-y-2 flex flex-col w-full">
            <label
              htmlFor="address"
              className="font-medium text-[18px] tracking-[0.6px]"
            >
              City*
            </label>
            <input
              id="city"
              name="city"
              placeholder="City"
              required
              className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
              )}
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>{" "}
          <div className="space-y-2 flex flex-col w-full">
            <label
              htmlFor="address"
              className="font-medium text-[18px] tracking-[0.6px]"
            >
              State*
            </label>

            <Select
              value={selectedState}
              onValueChange={(value) => setSelectedState(value as string)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                {statesOfNigeria.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 flex flex-col w-full">
            <label
              htmlFor="address"
              className="font-medium text-[18px] tracking-[0.6px]"
            >
              Postal Code
            </label>
            <input
              id="postalCode"
              name="postalCode"
              placeholder="Postal Code"
              className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
              )}
              value={formData.postalCode}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="space-y-2 flex flex-col">
          <label
            htmlFor="phone"
            className="font-medium text-[18px] tracking-[0.6px]"
          >
            Phone Number*
          </label>
          <input
            id="phone"
            name="phone"
            placeholder="Phone Number"
            required
            className={cn(
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
            )}
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-[25px] tracking-[0.6px]">
            Payment
          </h2>
        </div>
        <button
          type="submit"
          className="uppercase bg-black text-white px-7 py-3.5 my-10 text-center cursor-pointer block"
          disabled={isSubmitting || items.length === 0}
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <p>Processing...</p>
            </div>
          ) : (
            <PaystackButton {...componentProps} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Billing;
