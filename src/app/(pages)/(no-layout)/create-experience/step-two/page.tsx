import StepTwoPage from "@/components/create_experience/form/step-pages/StepTwoPage";

export default function StepTwo(){
  return (
    <StepTwoPage 
      nextStepUrl="/create-experience/step-three"
      previousStepUrl="/create-experience/step-one"
    />
  )
}