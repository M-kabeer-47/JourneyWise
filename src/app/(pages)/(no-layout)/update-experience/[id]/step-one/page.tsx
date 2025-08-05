"use client";
import StepOnePage from "@/components/create_experience/form/step-pages/StepOnePage";

import { useParams } from "next/navigation";

export default function StepOne() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";

  return <StepOnePage nextStepUrl={`/update-experience/${id}/step-two`} />;
}
