"use client";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/Spinner";
import { MultiStepLoader } from "@/components/ui/MultiStepLoader";
import { toast} from "@/components/ui/Toast";
export default function FormulaBreakdownPage() {


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <video
        src="/car.mp4"
        autoPlay
        loop
        muted
        className="w-full max-w-3xl rounded-lg shadow-lg"
      />
      <h1 className="text-3xl font-bold text-gray-800 mt-6">Page Under Construction</h1>
      <p className="text-gray-600 mt-2">We're working hard to bring you this feature. Stay tuned!</p>
    </div>
  );
}


