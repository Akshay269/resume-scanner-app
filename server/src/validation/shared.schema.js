import Joi from "joi";

export const personalSchema = Joi.object({
  name: Joi.string().allow("", null),
  email: Joi.string().email().allow("", null),
  phone: Joi.string().allow("", null),
  summary: Joi.string().allow("", null)
});

export const skillSchema = Joi.string().max(100);

export const experienceSchema = Joi.object({
  company: Joi.string().allow(""),
  role: Joi.string().allow(""),
  startDate: Joi.string().allow(""),
  endDate: Joi.string().allow(""),
  description: Joi.string().allow("")
});

export const educationSchema = Joi.object({
  school: Joi.string().allow(""),
  degree: Joi.string().allow(""),
  startYear: Joi.string().allow(""),
  endYear: Joi.string().allow("")
});

export const projectSchema = Joi.object({
  title: Joi.string().allow(""),
  link: Joi.string().uri().allow("", null),
  description: Joi.string().allow("")
});
