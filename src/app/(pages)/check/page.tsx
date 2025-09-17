"use client";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/Spinner";
import { MultiStepLoader } from "@/components/ui/MultiStepLoader";
import { toast} from "@/components/ui/Toast";
export default function FormulaBreakdownPage() {


  return (
   <MultiStepLoader 
   loadingStates={[
    { text: "Analyzing your data..." },
    { text: "Breaking down complex formulas..." },
    { text: "Generating step-by-step explanations..." },
    { text: "Finalizing the breakdown..." },
    { text: "Almost done! Preparing your results..." },
    // Add more steps as needed
    { text: "Complete!" },

   ]}
   duration={1000}
   loading={true}
    />
  );
}


