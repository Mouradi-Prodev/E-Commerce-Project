"use client"

import ProductSection from "@/ui/components/ProductSection";
import WelcomeBanner from "@/ui/components/Welcome";



export default function page() {
  return (
    <>
      <div className="min-h-screen  items-start justify-center">
        <WelcomeBanner />
        <ProductSection />
      </div>
    </>
  );
}