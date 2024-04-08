import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name!"],
    minLength: [3, "Name must contain at least 3 characters!"],
    maxLength: [30, "Name cannot exceed 30 characters!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email address"],
    validate: [validator.isEmail, " Please provide a valid email address"],
  },
  coverLetter: {
    type: String,
    required: [true, "Please provide your cover letter"],
  },
  phone: {
    type: Number,
    required: [true, "Please provide your phone numberr"],
  },
  resume: {
    public_id: {
      type: String,
      required: [true, "Please provide your resume"],
    },
    url: {
      type: String,
      required: true,
    },
  },
  applicantID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Job Seeker"],
    },
  },
  employerID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Employer"],
    },
  },
});

export const Application = mongoose.model("Application", applicationSchema);
