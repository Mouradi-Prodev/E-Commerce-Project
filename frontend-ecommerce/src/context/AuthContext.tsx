"use client";

import { getUser } from "@/actions/auth";
import { FormState, FormStateSignup, SigninFormSchema, SignupFormSchema } from "@/lib/authDefinitions";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";


interface User {
  id: string;
  name: string;
  email: string;
  local_address: string;
  phone_number: string;
  city: string;
  role: { name: string };
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  signin: (state: FormState, formData: FormData) => void;
  signup: (state: FormStateSignup, formData: FormData) => void;
  logout: () => Promise<void>;
  logoutUser: () => Promise<void>;
  addToCart: (productId: string, price: number, quantity: number) => void;
  itemsCount: number;
  setItemsCount: (count: number) => void;
}

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [itemsCount, setItemsCount] = useState(0);

  useEffect(() => {
    async function fetchUser() {

      const data = await getUser();
      if (data) {
        setUser(data.user);
      }
      else setUser(null);

    }
    fetchUser();
  }, []);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0);
    setItemsCount(count);
  }, []);

  async function signin(state: FormState, formData: FormData) {

    const validatedFields = SigninFormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password')
    })

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { email, password } = validatedFields.data

    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json()

    const user = data.user

    if (!user) {
      return {
        message: 'An error occurred while creating your account.',
      }
    }


    await createSession(data.token)

    if (user?.role?.name === "ROLE_ADMIN") 
    {
      setUser(user)
      redirect("/admin")
      
    }
    else {
      setUser(user)
      redirect("/")
      
    }



  }



  async function signup(state: FormStateSignup, formData: FormData) {

    const validatedFields = SignupFormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
      name: formData.get('name'),
      confirmPassword: formData.get('confirmPassword'),
      address: formData.get('address'),
      city: formData.get('city'),
      phone: formData.get('phone'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { email, password, name, confirmPassword, address, city, phone } = validatedFields.data;

    const response = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name, confirmPassword, address, city, phone }),
    });

    const data = await response.json();

    const user = data.user;

    if (!user) {
      return {
        message: 'An error occurred while creating your account.',
      };
    }
    setUser(user)

    await createSession(data.token);

    redirect("/");
  }

  async function logout() {
    deleteSession()
    setUser(null);
    redirect('/admin/login')
  }

  async function logoutUser() {
    deleteSession()
    setUser(null);
    redirect('/')
  }


  const addToCart = (productId: string, price: number, quantity: number) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProduct = cart.find((item: { id: string }) => item.id === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({ id: productId, price: price,quantity: quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    const count = cart.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0);
    setItemsCount(count);
  };



  return (
    <AuthContext.Provider value={{ user, setUser, signin, logoutUser, logout, signup, addToCart, itemsCount, setItemsCount }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
