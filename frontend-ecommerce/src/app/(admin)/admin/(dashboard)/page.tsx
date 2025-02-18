"use client";
import React, { useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import TotalSalesComponent from "../../components/TotalSales";

import TotalOrdersComponent from "../../components/TotalOrders";
import TotalCustomersComponent from "../../components/TotalCustomers";

export default function App() {
    const [isClient, setIsClient] = useState(false);
      React.useEffect(() => {
        setIsClient(true);}
      , []);
    
      if (!isClient) {
        return null;
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
