"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Skeleton } from "@heroui/react";
import TotalSalesComponent from "../../components/TotalSales";

import TotalOrdersComponent from "../../components/TotalOrders";
import TotalCustomersComponent from "../../components/TotalCustomers";
import { Loader } from "lucide-react";

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) {
    return (
      <div className="min-h-screen items-start justify-center">
        <Loader size={64}/>

      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <TotalSalesComponent />
          <TotalOrdersComponent />
          <TotalCustomersComponent />
        </div>
      </div>
    </>
  );
}
