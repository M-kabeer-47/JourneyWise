"use client";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/Spinner";
import { MultiStepLoader } from "@/components/ui/MultiStepLoader";
export default function FormulaBreakdownPage() {
  const [count,setCount] = useState(0);
  useEffect(() => {
    alert(
      "Count: "+count
    );
  }, [count]);

  return (
   <MultiStepLoader
     loadingStates={[
       { text: "Step 1: Validate Phone Number" },
       { text: "Step 2: Verify OTP" },
       { text: "Step 3: Complete Registration" },
       { text: "Step 4: Finalize Setup" },
       { text: "Step 5: Success" },
       { text: "Step 6: Complete" }

     ]}
     loop={true}
     loading={true}
     duration={1000}
   />
  );
}


