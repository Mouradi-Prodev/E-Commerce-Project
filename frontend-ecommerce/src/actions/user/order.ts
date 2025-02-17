"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


interface OrderProduct {
    productId: string;
    quantity: number;
}

interface OrderDTO {
    orderProducts: OrderProduct[];
}
export async function confirmOrder(orderDTO: OrderDTO) {
    const cookie = (await cookies()).get("session")?.value;

    if (!cookie) return null;




    const response = await fetch("http://localhost:8080/api/order/confirm", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookie,
        },
        body: JSON.stringify(orderDTO),
    });

    if (!response.ok) {
        console.error('Failed to confirm order:', response.statusText);
        return;
    }

    const data = await response.json().catch(() => {
        console.error('Failed to parse JSON response');
        return null;
    });

    if (!data) {
        console.error('No data received from server');
        return;
    }

    

    // Redirect to the success page with the order details
    redirect(`/order/success?orderId=${data.orderId}`);
}

export async function getOrderById(orderId: string) {
    const cookie = (await cookies()).get("session")?.value;

    if (!cookie) return null;
    const response = await fetch(`http://localhost:8080/api/order/${orderId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookie,
        },
    });

    const data = await response.json();

    return data;
}