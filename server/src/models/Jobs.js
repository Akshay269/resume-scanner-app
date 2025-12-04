import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true, 
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    jobProgress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,        // 0% = Not Started
    }
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
