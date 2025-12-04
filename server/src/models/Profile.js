import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  company: String,
  position: String,
  startDate: String,
  endDate: String,
  description: String
});

const personalSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  summary: String
});

const educationSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  startYear: String,
  endYear: String
});

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  techStack: [String]
});

const profileSchema = new mongoose.Schema({
  userId: String,
  formData: {
    personal: personalSchema,
    skills: [String],
    experience: [experienceSchema],
    education: [educationSchema],
    projects: [projectSchema]
  },
  updatedAt: Date
});

export default mongoose.model("Profile", profileSchema);
