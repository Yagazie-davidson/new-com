"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const currencies = [
  {
    value: "usd",
    label: "United States Dollar",
    symbol: "$",
    flag: "🇺🇸",
  },
  {
    value: "eur",
    label: "Euro",
    symbol: "€",
    flag: "🇪🇺",
  },
  {
    value: "gbp",
    label: "British Pound",
    symbol: "£",
    flag: "🇬🇧",
  },
  {
    value: "jpy",
    label: "Japanese Yen",
    symbol: "¥",
    flag: "🇯🇵",
  },
  {
    value: "cad",
    label: "Canadian Dollar",
    symbol: "$",
    flag: "🇨🇦",
  },
];

export default function CountrySelector() {
  const [open, setOpen] = React.useState(false);
  const [selectedCurrency, setSelectedCurrency] = React.useState(currencies[0]);

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className="w-full flex items-center justify-between  bg-background px-3 py-2 text-sm ring ring-[#D9D9D9] outline-0 border-0 text-black placeholder:text-black"
            aria-label={`Selected currency: ${selectedCurrency.label}`}
          >
            <div className="flex items-center">
              <span className="text-lg mr-2">{selectedCurrency.flag}</span>
              <ChevronDown className="h-4 w-4 opacity-50 " />
              <span className="text-lg mr-2">({selectedCurrency.symbol})</span>
              <span className="text-lg mr-2">{selectedCurrency.label}</span>
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <div className="max-h-[300px] overflow-auto p-1">
            {currencies.map((currency) => (
              <button
                key={currency.value}
                className="flex w-full items-center px-2 py-1.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
                onClick={() => {
                  setSelectedCurrency(currency);
                  setOpen(false);
                }}
              >
                <span className="text-lg mr-2">{currency.flag}</span>
                <span className="text-muted-foreground mr-1">
                  ({currency.symbol})
                </span>
                <span>{currency.label}</span>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
