"use client"
import StepFourPage from "@/components/create_experience/form/step-pages/StepFourPage";
import { useParams } from "next/navigation";
export default function StepFour() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  return (
    <StepFourPage
      type="create"
      previousStepUrl={`/create-experience/step-three?id=${id}`}
    />
  );
}
