import { FestivalEvent } from "../models/FestivalEvent.js";

export const createFestival = async (req, res, next) => {
  try {
    const festival = await FestivalEvent.create(req.body);
    return res.status(201).json(festival);
  } catch (error) {
    return next(error);
  }
};

export const listFestivals = async (req, res, next) => {
  try {
    const festivals = await FestivalEvent.find().sort({ startDate: 1 });
    return res.json(festivals);
  } catch (error) {
    return next(error);
  }
};

export const updateFestival = async (req, res, next) => {
  try {
    const festival = await FestivalEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!festival) {
      return res.status(404).json({ message: "Festival not found" });
    }
    return res.json(festival);
  } catch (error) {
    return next(error);
  }
};

export const deleteFestival = async (req, res, next) => {
  try {
    const festival = await FestivalEvent.findByIdAndDelete(req.params.id);
    if (!festival) {
      return res.status(404).json({ message: "Festival not found" });
    }
    return res.json({ message: "Festival deleted" });
  } catch (error) {
    return next(error);
  }
};

export const volunteerFestival = async (req, res, next) => {
  try {
    const festival = await FestivalEvent.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { volunteers: req.user.id } },
      { new: true }
    );
    if (!festival) {
      return res.status(404).json({ message: "Festival not found" });
    }
    return res.json({ message: "Volunteer registered", festival });
  } catch (error) {
    return next(error);
  }
};

export const withdrawVolunteerFestival = async (req, res, next) => {
  try {
    const festival = await FestivalEvent.findByIdAndUpdate(
      req.params.id,
      { $pull: { volunteers: req.user.id } },
      { new: true }
    );
    if (!festival) {
      return res.status(404).json({ message: "Festival not found" });
    }
    return res.json({ message: "Volunteer withdrawn", festival });
  } catch (error) {
    return next(error);
  }
};
