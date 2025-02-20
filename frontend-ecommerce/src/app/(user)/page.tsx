"use client"

import React, { useEffect, useState } from "react";
import ProductSection from "@/ui/components/ProductSection";
import WelcomeBanner from "@/ui/components/Welcome";
import Footer from "@/ui/components/Footer";
import { Loader } from "lucide-react";
import CategorySection from "@/ui/components/CategorySection";

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size={64} className="animate-spin text-sky-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <WelcomeBanner />
        <div className="bg-gradient-to-b from-white to-sky-50">
          <CategorySection />
          <ProductSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}