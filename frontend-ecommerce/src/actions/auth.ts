"use server"
import { revalidatePath } from 'next/cache';
import { SigninFormSchema, FormState, FormStateSignup, SignupFormSchema } from '../lib/authDefinitions'
import { createSession, deleteSession } from '../lib/session';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';


//user API


export async function getUser() {
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) return null;
  const response = await fetch("http://localhost:8080/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookie,
    },
  });

  const data = await response.json();
  
  return data;
}

export async function updateUserShippingAddress(user: any) {
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) return null;
  const response = await fetch("http://localhost:8080/api/user/shipping/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookie,
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
}
