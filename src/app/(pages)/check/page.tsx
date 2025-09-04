"use client";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/Spinner";
import { MultiStepLoader } from "@/components/ui/MultiStepLoader";
import {toasts as toast} from "@/components/ui/Toast";
export default function FormulaBreakdownPage() {

  useEffect(() => {
   
    const interval = setInterval(() => {
       toast.error("Welcome to the Formula Breakdown Page!");
   
    }, 5000); // Show toast every 10 seconds
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-midnight-blue">
        Formula Breakdown Page
      </h1>
      <p className="mb-6 text-gray-700">
        This is a placeholder for the formula breakdown content.
      </p>
      </div>
  );
}


