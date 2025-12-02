import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Clerk Id (string)
  currentStep: { type: Number, default: 1 },
  formData: {
    personal: Object,
    skills: Array,
    experience: Array,
    education: Array,
    projects: Array
  },
  prefilledData: Object,
  completed: { type: Boolean, default: false },
  updatedAt: Date
});

export default mongoose.model("Profile", profileSchema);
