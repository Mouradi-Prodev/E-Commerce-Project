import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import '../globals.css';

import { Header } from "@/ui/components/Header";

import Sidebar from "./components/sidebar";

import { Providers } from "../providers";
import { AuthProvider } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";


export const metadata: Metadata = {
  title: "admin",
};




export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

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
    <html lang="en" className='white'>
      <body>
        <AuthProvider>
          <Providers>
            <div className="flex">
              <Sidebar />
              <main className="flex-1 p-6">{children}</main>
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>

  );
}
