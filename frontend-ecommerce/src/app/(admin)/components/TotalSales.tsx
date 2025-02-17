"use client"
import { TotalSales } from '@/actions/stats';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const TotalSalesComponent: React.FC = () => {
  const [totalSales, setTotalSales] = useState(0);
  

  useEffect(() => {
    // Fetch total sales from the backend
    async function fetchTotalSales() {
      const data = await TotalSales()
      setTotalSales(data);
    }

    fetchTotalSales();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 rounded-lg shadow-xl shadow-blue-500/50"
    >
      <h2 className="text-xl font-bold">Total Sales</h2>
      <p className="text-2xl">${totalSales.toFixed(2)}</p>
    </motion.div>
  );
};

export default TotalSalesComponent;