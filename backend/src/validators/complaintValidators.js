import Joi from "joi";

export const complaintSchema = Joi.object({
  category: Joi.string().required(),
  description: Joi.string().required(),
  images: Joi.array().items(Joi.object({ url: Joi.string() }))
});
