"use server"

import { CategoryFormSchema, FormState } from "@/lib/categoryDefinition";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:8080/api/categories");

    if (!response.ok) {
      throw new Error("Failed to fetch categories.");
    }

    return await response.json(); // Assuming the API returns an array of categories
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}


export async function getCategoryById(categoryId: string) {
  try {
    const res = await fetch(`http://localhost:8080/api/categories/${categoryId}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch category");
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}


export async function createCategory(state: FormState, formData: FormData) {
  const validatedFields = CategoryFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const categoryData = validatedFields.data;
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) return null;


  const formDataToSend = new FormData();
  formDataToSend.append("name", categoryData.name);
  if (categoryData.description) {
    formDataToSend.append("description", categoryData.description);
  }

  const response = await fetch("http://localhost:8080/admin/api/categories/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cookie}`
    },
    body: formDataToSend,
  });

  if (!response.ok) {
    return { message: "Failed to create category." };
  }
  redirect("/admin/categories");

  return { message: "Category created successfully!" };
}


export async function updateCategory(state: FormState, formData: FormData, categoryId: string) {
  const validatedFields = CategoryFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const categoryData = validatedFields.data;
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) return null;

  const formDataToSend = new FormData();
  formDataToSend.append("name", categoryData.name);
  if (categoryData.description) {
    formDataToSend.append("description", categoryData.description);
  }

  const response = await fetch(`http://localhost:8080/admin/api/categories/update/${categoryId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${cookie}`
    },
    body: formDataToSend,
  });

  if (!response.ok) {
    return { message: "Failed to update category." };
  }
  redirect("/admin/categories");

  return { message: "Category updated successfully!" };
}



export async function deleteCategory(productId: string) {
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) return null;
  try {
    const res = await fetch(`http://localhost:8080/admin/api/categories/delete/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookie}`
      },
    });
    if (!res.ok) throw new Error("Failed to delete category");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}




