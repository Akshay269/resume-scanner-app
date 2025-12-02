
import Joi from "joi";
import {
  personalSchema,
  skillSchema,
  experienceSchema,
  educationSchema,
  projectSchema
} from "./shared.schema.js";
export const finalSubmitSchema = Joi.object({
  formData: Joi.object({
    personal: personalSchema.keys({
      name: Joi.string().required(),
      email: Joi.string().email().required()
    }),
    skills: Joi.array().items(skillSchema).min(1).required(),
    experience: Joi.array().items(experienceSchema),
    education: Joi.array().items(educationSchema),
    projects: Joi.array().items(projectSchema)
  }).required()
});
