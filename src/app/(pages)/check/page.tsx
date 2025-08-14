"use client";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/Spinner";
export default function FormulaBreakdownPage() {
  const [count,setCount] = useState(0);
  useEffect(() => {
    alert(
      "Count: "+count
    );
  }, [count]);

  return (
    <div className="h-screen items-center w-full flex  justify-center">
      <Spinner size="small" />
      <h1>Hello there</h1>
      <button onClick={() => setCount(count + 1)}>Reload</button>
    </div>
  );
}


