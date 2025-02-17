import { TotalOrders } from '@/actions/stats';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const TotalOrdersComponent: React.FC = () => {
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    // Fetch total orders from the backend
    async function fetchTotalOrders() {
      const data = await TotalOrders()
      setTotalOrders(data);
    }

    fetchTotalOrders();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 rounded-lg shadow-xl shadow-blue-500/50"
    >
      <h2 className="text-xl font-bold">Total Orders</h2>
      <p className="text-2xl">{totalOrders}</p>
    </motion.div>
  );
};

export default TotalOrdersComponent;