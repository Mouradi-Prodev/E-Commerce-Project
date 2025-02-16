"use server";

import { cookies } from "next/headers";


export async function getProducts() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
      const res = await fetch(`${backendUrl}api/products/all`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

