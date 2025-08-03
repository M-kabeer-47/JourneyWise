import { createSlice } from "@reduxjs/toolkit";
import { ExperienceData } from "@/lib/schemas/experience";

const initialState: ExperienceData = {
  title: "",
  country: "",
  city: "",
  category: "",
  countryCode: "",
  duration: 0, // This might be changing unexpectedly
  tags: [],
  description: "",
  available: true,
  experienceImage: "",
  currency: "USD",
  tiers: [{ name: "", members: 0, price: 0, description: "" }],
  requirements: [""],
  experienceImages: [],
  includedServices: [""],
  excludedServices: [""],
  destinations: [
    {
      name: "",
      activities: [
        {
          id: Math.random().toString(36).substr(2, 9),
          name: "",
          time: "12:00 AM",
          spot: "",
        },
      ],
      day: 1,
      id: Math.random().toString(36).substr(2, 9),
    },
  ],
}; // Start with empty array

let experienceData = createSlice({
  name: "experienceData",
  initialState,
  reducers: {
    setExperienceData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setExperienceData } = experienceData.actions;
export default experienceData.reducer;
