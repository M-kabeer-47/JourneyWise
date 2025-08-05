"use client";
import StepThreePage from "@/components/create_experience/form/step-pages/StepThreePage";
import { useParams } from "next/navigation";
export default function StepThree(){
    const params = useParams();
    const id = typeof params.id === "string" ? params.id : "";
    
    return (
        <StepThreePage
        nextStepUrl={`/update-experience/${id}/step-four`}
        previousStepUrl={`/update-experience/${id}/step-two`}
        />
    );

}