"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Form, Input, Button } from "@heroui/react";

import React from "react";
import { createCategory } from "@/actions/category";

export default function NewCategoryPage() {
  const [state, action, pending] = React.useActionState(createCategory, undefined);
 

  return (
    <motion.div
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-4">Create New Category</h2>

      <Form validationBehavior="native" action={action}>
        {/* Name */}
        <Input
          name="name"
          label="Category Name"
          placeholder="Enter category name"
          isInvalid={!!state?.errors?.name}
          errorMessage={state?.errors?.name?.[0]}
        />

        {/* Description */}
        <Input
          name="description"
          label="Description"
          placeholder="Enter description"
          isInvalid={!!state?.errors?.description}
          errorMessage={state?.errors?.description?.[0]}
        />

        {/* Submit Button */}
        <Button type="submit" color="primary" isDisabled={pending}>
          {pending ? "Creating..." : "Create Category"}
        </Button>
      </Form>

      {state?.message && <p className="text-green-600 mt-2">{state.message}</p>}
    </motion.div>
  );
}