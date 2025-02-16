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
 if(user?.role.name === "ROLE_ADMIN")
  return (
    <motion.div
      animate={{ width: expanded ? "16rem" : "4rem" }}
      className="h-screen sticky top-0   bg-gray-900 text-gray-300 flex flex-col p-4 shadow-lg"
    >
      {/* Sidebar Toggle */}
      <div className="flex items-center justify-between">
        {expanded && <h1 className="text-lg font-semibold">Admin Panel</h1>}
        <button onClick={() => setExpanded(!expanded)} className="p-2">
          <Menu className="text-gray-400" size={24} />
        </button>
      </div>

      {/* Sidebar Links */}
      <nav className="mt-6 space-y-4 ">
        {sidebarItems.map(({ name, icon, href }) => (
          <Link href={href} key={name} className="group flex items-center gap-4 p-3 rounded-md transition hover:bg-gray-800">
            <span className="text-gray-400">{icon}</span>
            {expanded && <span className="group-hover:text-white">{name}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto">
        <button 
        onClick={logout}
        className="flex items-center gap-4 p-3 w-full rounded-md transition hover:bg-red-600">
          <LogOut size={20} className="text-gray-400" />
          {expanded && <span>Logout</span>}
        </button>
      </div>
    </motion.div>
  );
}
