"use client";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/Spinner";
export default function FormulaBreakdownPage() {
  return (
    <div className="h-screen items-center w-full flex  justify-center">
      <Spinner size="small" />
      <h1>Hello there</h1>
    </div>
  );
}

function StepTwo() {
  const [data, setData] = useState("Step 2 Data");

  return (
    <div>
      <h2>Step 2</h2>
      <p>{data}</p>
      <button onClick={() => setData("Updated Step 2 Data")}>
        Update Data
      </button>
    </div>
  );
}
