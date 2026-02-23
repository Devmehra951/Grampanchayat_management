import Joi from "joi";

export const donationSchema = Joi.object({
  donorName: Joi.string().required(),
  donorPhone: Joi.string().required(),
  amount: Joi.number().min(1).required(),
  method: Joi.string().valid("ONLINE", "CASH"),
  festivalOrEvent: Joi.string().allow(""),
  templeName: Joi.string().required(),
  citizen: Joi.string().hex().length(24).allow(null)
});
