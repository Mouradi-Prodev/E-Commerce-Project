"use client";
import React from "react";
import { Form, Input, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";



const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
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
      damping: 12
    }
  },
};

export default function LoginForm() {
  const {signin} = useAuth();
  const [submitted, setSubmitted] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [state, action, pending] = React.useActionState<{ errors?: { email?: string; password?: string[] } }>(signin, undefined)



  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100">
      <motion.div
        className="w-full max-w-md p-8 rounded-xl shadow-2xl bg-white/90 backdrop-blur-lg border border-white/20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-sky-600 to-blue-800 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          Welcome Back
        </motion.h2>

        <Form validationBehavior="native" action={action}>
          <motion.div variants={itemVariants}>
            <Input
              isRequired
              label="Email"
              labelPlacement="outside"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="mb-6  [&_input]:focus:ring-2 [&_input]:focus:ring-sky-500/50"
              variant="bordered"
              radius="lg"
              classNames={{
                inputWrapper: "group w-[350px] hover:border-sky-400 transition-colors",
                label: "text-sky-800 font-medium"
              }}
            />
            {state?.errors?.email && <p>{state.errors.email}</p>}
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
              className="mb-6 [&_input]:focus:ring-2 [&_input]:focus:ring-sky-500/50"
              variant="bordered"
              radius="lg"
              classNames={{
                inputWrapper: "group w-[350px] hover:border-sky-400 transition-colors",
                label: "text-sky-800 font-medium"
              }}
            />
            {state?.errors?.password && (
              <div>
                <p>Password must:</p>
                <ul>
                  {state.errors.password.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.button
              disabled={pending}
              type="submit"
              className="w-full bg-gradient-to-br from-sky-600 to-blue-700 text-white font-semibold py-3 rounded-xl 
                  hover:from-sky-700 hover:to-blue-800 transition-all duration-300 shadow-lg shadow-sky-100"
              whileHover={{
                scale: 1.02,
                boxShadow: "0px 5px 15px rgba(14, 165, 233, 0.3)",
                width: "calc(100% + 2rem)",
              }}
              whileTap={{
                scale: 0.98,
                boxShadow: "0px 2px 5px rgba(14, 165, 233, 0.2)"
              }}
              style={{ width: "calc(100% + 2rem)" }}
            >
              Sign In
            </motion.button>
          </motion.div>
        </Form>

        {submitted && (
          <motion.div
            className="mt-6 p-4 text-center text-sky-800 bg-sky-50 rounded-lg border border-sky-100"
            variants={itemVariants}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="font-medium">Form Submitted:</p>
            <code className="text-sm">{JSON.stringify(submitted)}</code>
          </motion.div>
        )}

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
    </div>
  );
}