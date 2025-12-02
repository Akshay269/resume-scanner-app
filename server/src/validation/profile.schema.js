import Joi from "joi";
import {
  personalSchema,
  skillSchema,
  experienceSchema,
  educationSchema,
  projectSchema
} from "./shared.schema.js";

export const saveDraftSchema = Joi.object({
  currentStep: Joi.number().min(1).max(10).required(),

  formData: Joi.object({
    personal: personalSchema,
    skills: Joi.array().items(skillSchema),
    experience: Joi.array().items(experienceSchema),
    education: Joi.array().items(educationSchema),
    projects: Joi.array().items(projectSchema)
  }).required()
});
