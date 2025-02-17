"use server";
import { cookies } from "next/headers";


export async function TotalSales() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const cookie = (await cookies()).get("session")?.value;
    const response = await fetch(backendUrl + 'admin/api/stats/total-sales',
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${cookie}`
            },
        }
    );

    const data = await response.json();

    return data
}

export async function TotalCustomers() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const cookie = (await cookies()).get("session")?.value;
    const response = await fetch(backendUrl + 'admin/api/stats/total-customers',
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${cookie}`
            },
        }
    );

    const data = await response.json();

    return data
}

export async function TotalOrders() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const cookie = (await cookies()).get("session")?.value;
    const response = await fetch(backendUrl + 'admin/api/stats/total-orders',
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${cookie}`
            },
        }
    );

    const data = await response.json();

    return data
}
