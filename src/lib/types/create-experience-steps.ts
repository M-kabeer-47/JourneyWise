import { stepOneSchema,stepTwoSchema,stepThreeSchema,stepFourSchema } from "../schemas/experience";
import { z } from "zod";

export type StepOneType = z.infer<typeof stepOneSchema>;
export type StepTwoType = z.infer<typeof stepTwoSchema>;
export type StepThreeType = z.infer<typeof stepThreeSchema>;
export type StepFourType = z.infer<typeof stepFourSchema>;
