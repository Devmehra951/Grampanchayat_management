import Joi from "joi";

export const projectSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().allow(""),
  budget: Joi.number().min(0).required(),
  spent: Joi.number().min(0),
  startDate: Joi.date().required(),
  endDate: Joi.date().allow(null),
  status: Joi.string().valid("PENDING", "ACTIVE", "COMPLETED"),
  officers: Joi.array().items(Joi.string().hex().length(24)),
  contractor: Joi.object({
    name: Joi.string().allow(""),
    phone: Joi.string().allow(""),
    firm: Joi.string().allow("")
  }),
  materials: Joi.array().items(Joi.object({
    name: Joi.string(),
    quantity: Joi.number(),
    unitCost: Joi.number()
  })),
  laborRecords: Joi.array().items(Joi.object({
    name: Joi.string(),
    role: Joi.string(),
    wage: Joi.number(),
    days: Joi.number()
  }))
});
