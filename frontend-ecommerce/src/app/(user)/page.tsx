"use client"

import React, { useState } from "react";
import ProductSection from "@/ui/components/ProductSection";
import WelcomeBanner from "@/ui/components/Welcome";



export default function page() {
  const [isClient, setIsClient] = useState(false);
  React.useEffect(() => {
    setIsClient(true);}
  , []);

  if (!isClient) {
    return null;
  }
  
  return (
    <>
      <div className="min-h-screen  items-start justify-center">
        <WelcomeBanner />
        <ProductSection />
      </div>
    </>
  );
}