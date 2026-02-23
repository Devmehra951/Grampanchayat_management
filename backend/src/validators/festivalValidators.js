import Joi from "joi";

export const festivalSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(""),
  festivalType: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  budgetAllocated: Joi.number().min(0),
  expenses: Joi.array().items(Joi.object({ label: Joi.string(), amount: Joi.number() })),
  volunteers: Joi.array().items(Joi.string().hex().length(24)),
  announcements: Joi.array().items(Joi.object({ message: Joi.string() }))
});
