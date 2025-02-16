"use server"
import { FormState, ProductFormSchema } from "@/lib/productDefinition";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function getProducts() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) return null;
  try {
    const res = await fetch(`${backendUrl}admin/api/products/all`, {
      cache: "no-store",
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`
      },
    });
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProductById(productId: string) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  try {
    const res = await fetch(`${backendUrl}api/products/${productId}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createProduct(state: FormState, formData: FormData) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const validatedFields = ProductFormSchema.safeParse({
    name: formData.get("name"),
    price: Number(formData.get("price")),
    description: formData.get("description"),
    quantity: Number(formData.get("quantity")),
    active: formData.get("active") === "true",
    category: formData.get("category"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const productData = validatedFields.data;
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) return null;

  // Create a FormData object for multipart requests
  const formDataToSend = new FormData();
  formDataToSend.append("name", productData.name);
  formDataToSend.append("price", productData.price.toString());
  if (productData.description) {
    formDataToSend.append("description", productData.description);
  }
  formDataToSend.append("quantity", productData.quantity.toString());
  formDataToSend.append("active", productData.active.toString());
  if (productData.category) {
    formDataToSend.append("category", productData.category);
  }

  // Append the image if it exists
  const imageFile = formData.get("imageUrl");
  if (imageFile instanceof File) {
    formDataToSend.append("image", imageFile);
  }

  const response = await fetch(`${backendUrl}admin/api/products/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cookie}`
    },
    body: formDataToSend,
  });

  if (!response.ok) {
    return { message: "Failed to create product." };
  }
  redirect("/admin/products");

  return { message: "Product created successfully!" };
}

export async function updateProduct(state: FormState, formData: FormData, productId: string, originalImageUrl: string | null) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const validatedFields = ProductFormSchema.safeParse({
    name: formData.get("name"),
    price: Number(formData.get("price")),
    description: formData.get("description"),
    quantity: Number(formData.get("quantity")),
    active: formData.get("active") === "true",
    category: formData.get("category"),
  });
  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const productData = validatedFields.data;
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) return null;

  const formDataToSend = new FormData();
  formDataToSend.append("name", productData.name);
  formDataToSend.append("price", productData.price.toString());
  if (productData.description) {
    formDataToSend.append("description", productData.description);
  }
  formDataToSend.append("quantity", productData.quantity.toString());
  formDataToSend.append("active", productData.active.toString());
  if (productData.category) {
    formDataToSend.append("category", productData.category);
  }
  const imageFile = formData.get("imageUrl");

  if (originalImageUrl) {
    formDataToSend.append("existingImage", originalImageUrl);

  } else if (imageFile) {
    formDataToSend.append("image", imageFile);
  }



  const response = await fetch(`${backendUrl}admin/api/products/update/${productId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${cookie}`
    },
    body: formDataToSend,
  });

  if (!response.ok) {
    return { message: "Failed to update product." };
  }
  redirect("/admin/products");

  return { message: "Product updated successfully!" };
}

export async function deleteProduct(productId: string) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) return null;
  try {
    const res = await fetch(`${backendUrl}admin/api/products/delete/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookie}`
      },
    });
    if (!res.ok) throw new Error("Failed to delete product");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}