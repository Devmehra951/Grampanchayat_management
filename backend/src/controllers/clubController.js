import { Club } from "../models/Club.js";

export const createClub = async (req, res, next) => {
  try {
    const club = await Club.create(req.body);
    return res.status(201).json(club);
  } catch (error) {
    return next(error);
  }
};

export const listClubs = async (req, res, next) => {
  try {
    const clubs = await Club.find().sort({ createdAt: -1 });
    return res.json(clubs);
  } catch (error) {
    return next(error);
  }
};

export const updateClub = async (req, res, next) => {
  try {
    const club = await Club.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }
    return res.json(club);
  } catch (error) {
    return next(error);
  }
};

export const deleteClub = async (req, res, next) => {
  try {
    const club = await Club.findByIdAndDelete(req.params.id);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }
    return res.json({ message: "Club deleted" });
  } catch (error) {
    return next(error);
  }
};

export const joinClub = async (req, res, next) => {
  try {
    const club = await Club.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { members: req.user.id } },
      { new: true }
    );
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }
    return res.json({ message: "Joined club", club });
  } catch (error) {
    return next(error);
  }
};

export const leaveClub = async (req, res, next) => {
  try {
    const club = await Club.findByIdAndUpdate(
      req.params.id,
      { $pull: { members: req.user.id } },
      { new: true }
    );
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }
    return res.json({ message: "Left club", club });
  } catch (error) {
    return next(error);
  }
};
