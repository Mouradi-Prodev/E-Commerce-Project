"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, LayoutGrid, LogOut, Menu, Package, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const sidebarItems = [
  {
    name: "Dashboard",
    icon: <Home size={20} />,
    href: "/admin"
  },
  {
    name: "Products",
    icon: <Package size={20} />,
    href: "/admin/products"
  },
  {
    name: "Categories",
    icon: <LayoutGrid size={20} />,
    href: "/admin/categories"
  },
  // { 
  //   name: "Orders", 
  //   icon: <ShoppingCart size={20} />, 
  //   href: "/admin/orders" 
  // },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const { user, logout } = useAuth();

  const sidebarVariants = {
    expanded: { width: "16rem" },
    collapsed: { width: "4rem" }
  };

  const itemVariants = {
    expanded: { x: 0, opacity: 1 },
    collapsed: { x: -10, opacity: 0 }
  };

  if (user?.role.name === "ROLE_ADMIN")
    return (
      <motion.div
        animate={expanded ? "expanded" : "collapsed"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="h-screen sticky top-0 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 flex flex-col p-4 shadow-xl"
      >
        {/* Sidebar Toggle */}
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            variants={itemVariants}
            className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Admin Panel
          </motion.h1>
          <motion.button
            onClick={() => setExpanded(!expanded)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu className="text-gray-400" size={24} />
          </motion.button>
        </div>

        {/* Sidebar Links */}
        <nav className="mt-6 space-y-2">
          {sidebarItems.map(({ name, icon, href }) => (
            <Link href={href} key={name}>
              <motion.div
                className="flex items-center gap-4 p-3 rounded-lg transition-all hover:bg-gray-800/50 hover:scale-105"
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-gray-400">{icon}</span>
                <motion.span
                  variants={itemVariants}
                  className="text-gray-300 font-medium"
                >
                  {expanded && name}
                </motion.span>
              </motion.div>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <motion.div
          className="mt-auto"
          variants={itemVariants}
        >
          <motion.button
            onClick={logout}
            className="flex items-center gap-4 p-3 w-full rounded-lg transition-all hover:bg-red-500/20 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={20} className="text-red-400 group-hover:text-red-300" />
            {expanded && <span className="group-hover:text-red-300">Logout</span>}
          </motion.button>
        </motion.div>
      </motion.div>
    );
}
