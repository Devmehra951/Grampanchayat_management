import Joi from "joi";

export const clubSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  description: Joi.string().allow(""),
  head: Joi.string().hex().length(24).allow(null),
  members: Joi.array().items(Joi.string().hex().length(24))
});
