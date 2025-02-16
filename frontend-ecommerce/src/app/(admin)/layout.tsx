import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import '../globals.css';

import { Header } from "@/ui/components/Header";

import Sidebar from "./components/sidebar";

import { Providers } from "../providers";
import { AuthProvider } from "@/context/AuthContext";


export const metadata: Metadata = {
  title: "admin",
};




export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {




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
