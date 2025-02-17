import { TotalCustomers } from '@/actions/stats';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const TotalCustomersComponent: React.FC = () => {
    const [totalCustomers, setTotalCustomers] = useState(0);

    useEffect(() => {
        // Fetch total customers from the backend
        async function fetchTotalCustomers() {
            const data = await TotalCustomers()

            setTotalCustomers(data);
        }

        fetchTotalCustomers();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-4 rounded-lg shadow-xl shadow-blue-500/50"
        >
            <h2 className="text-xl font-bold">Total Customers</h2>
            <p className="text-2xl">{totalCustomers}</p>
        </motion.div>
    );
};

export default TotalCustomersComponent;