import { create } from "zustand";

export const useStepStore = create((set) => ({
  currentStep: 1,
  setStep: (step) => set({ currentStep: step }),

  formData: {
    personal: {},
    skills: [],
    experience: [],
    education: [],
    projects: []
  },

  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    }))
}));
