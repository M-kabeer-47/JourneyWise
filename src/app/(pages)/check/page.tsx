"use client";
import { useEffect, useState } from "react";

export default function FormulaBreakdownPage() {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    alert("Yeah buddy");
    // Simulate some logic that determines when to show the div
  },[currentStep]); // This runs when currentStep changes

  return (
    <div>
      <h1>Formula Breakdown</h1>
      <button onClick={() => setCurrentStep((prev) => prev + 1)}>
        Next Step
      </button>
      <button onClick={() => setCurrentStep((prev) => prev - 1)}>
        Previous Step 
      </button>
      {currentStep === 1 && <div>Here are the details for step 1...</div>}
      {currentStep === 2 && <StepTwo />}
      {currentStep === 3 && <div>Here are the details for step 3...</div>}
    </div>
  );


}

function StepTwo() {
  const [data, setData] = useState("Step 2 Data");

  useEffect(() => {
    alert("Step 2 effect ran");
    // Logic to create destinations or other data
  }, [data]); // This runs when data changes

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

