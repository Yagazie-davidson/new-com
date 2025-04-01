import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "GOAT'S SALVATION",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <div className="fixed w-full z-[99]">
          <NavBar />
        </div>
        <div className="afacad-local">
          {children}
          <Toaster position="top-right" richColors />
        </div>
        <Footer />
      </body>
    </html>
  );
}
