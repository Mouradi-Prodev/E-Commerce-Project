"use client"

import React, { useEffect, useState } from "react";
import ProductSection from "@/ui/components/ProductSection";
import WelcomeBanner from "@/ui/components/Welcome";
import { Loader } from "lucide-react";



export default function page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) {
    return (
      <div className="min-h-screen items-start justify-center">
        <Loader size={64} />
        
      </div>
    );
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