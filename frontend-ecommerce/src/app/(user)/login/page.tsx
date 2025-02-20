"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import ParticlesBackground from "@/ui/components/shared/ParticlesBackground";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const formVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
    },
  },
};

export default function LoginForm() {
  const { signin } = useAuth();
  const [submitted, setSubmitted] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [state, action, pending] = React.useActionState<{
    errors?: { email?: string; password?: string[] };
  }>(signin, undefined);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading skeleton
  }

  return (
    <>
      <ParticlesBackground />
      <motion.div
        className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="w-full max-w-md p-8 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] 
                    bg-white/90 backdrop-blur-xl border border-white/20"
          variants={formVariants}
        >
          <motion.div className="text-center space-y-6 mb-8">
            <motion.h2
              className="text-4xl font-extrabold bg-gradient-to-r from-sky-600 via-blue-600 to-blue-700 
                        bg-clip-text text-transparent drop-shadow-sm"
              variants={itemVariants}
            >
              Welcome Back
            </motion.h2>
            <motion.p
              className="text-sky-600/80"
              variants={itemVariants}
            >
              Sign in to your account to continue
            </motion.p>
          </motion.div>

          <Form
            validationBehavior="native"
            action={action}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <Input
                isRequired
                label="Email"
                labelPlacement="outside"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="group transition-all duration-300"
                variant="bordered"
                radius="lg"
                classNames={{
                  input: "bg-white/50 backdrop-blur-sm",
                  inputWrapper: "shadow-sm hover:shadow-md transition-shadow duration-300",
                  label: "text-sky-800 font-medium"
                }}
              />
              {state?.errors?.email && (
                <motion.p
                  className="mt-2 text-red-500 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {state.errors.email}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Input
                isRequired
                label="Password"
                labelPlacement="outside"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                minLength={4}
                className="group transition-all duration-300"
                variant="bordered"
                radius="lg"
                classNames={{
                  input: "bg-white/50 backdrop-blur-sm",
                  inputWrapper: "shadow-sm hover:shadow-md transition-shadow duration-300",
                  label: "text-sky-800 font-medium"
                }}
              />
              {state?.errors?.password && (
                <motion.div
                  className="mt-2 text-red-500 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p>Password requirements:</p>
                  <ul className="list-disc list-inside">
                    {state.errors.password.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between"
            >
              <Link
                href="#"
                className="text-sm text-sky-600 hover:text-sky-500"
              >
                Forgot password?
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                disabled={pending}
                type="submit"
                className="relative w-full py-3 px-6 bg-gradient-to-r from-sky-500 to-blue-600 
                        text-white font-medium rounded-xl overflow-hidden transition-all
                        hover:from-sky-600 hover:to-blue-700
                        focus:ring-2 focus:ring-sky-400 focus:ring-offset-2
                        disabled:opacity-70 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {pending ? (
                  <motion.div
                    className="flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Signing in...</span>
                  </motion.div>
                ) : (
                  <motion.div className="flex items-center justify-center gap-2">
                    <span>Sign In</span>
                    <ArrowRight size={18} />
                  </motion.div>
                )}
              </motion.button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-center mt-6"
            >
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link
                  href="/register"
                  className="font-medium text-sky-600 hover:text-sky-500"
                >
                  Sign up now
                </Link>
              </p>
            </motion.div>
          </Form>

          {error && (
            <motion.div
              className="mt-6 p-4 text-center text-red-600 bg-red-50 rounded-lg border border-red-100"
              variants={itemVariants}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="font-medium">Error: {error}</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}