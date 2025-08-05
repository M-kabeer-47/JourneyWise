import { createSlice } from "@reduxjs/toolkit";
import { ExperienceData } from "@/lib/schemas/experience";

const initialState: ExperienceData = {
  id: "",
  title: "",
  country: "",
  city: "",
  category: "",
  countryCode: "", //@ts-ignore
  duration: undefined, // This might be changing unexpectedly
  tags: [],
  description: "",
  available: true,
  experienceImage: "",
  currency: "USD", // @ts-ignore
  tiers: [{ name: "", members: undefined, price: undefined, description: "" }],
  requirements: [""],
  experienceImages: [],
  includedServices: [""],
  excludedServices: [""],
  destinations: [],
}; // Start with empty array

let experienceData = createSlice({
  name: "experienceData",
  initialState,
  reducers: {
    updateExperienceData: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearExperienceData: () => {
      return initialState;
    },
  },
});

export const { updateExperienceData, clearExperienceData } =
  experienceData.actions;
export default experienceData.reducer;
