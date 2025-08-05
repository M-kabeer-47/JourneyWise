"use client"
import StepTwoPage from "@/components/create_experience/form/step-pages/StepTwoPage";
import { useParams } from "next/navigation";

export default function StepTwo() {
    const params = useParams();
    const id = typeof params.id === "string" ? params.id : "";
    return (
        <StepTwoPage nextStepUrl={`/update-experience/${id}/step-three`} previousStepUrl={`/update-experience/${id}/step-one`} />
    )
}