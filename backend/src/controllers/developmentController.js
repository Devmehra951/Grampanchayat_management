import { DevelopmentProject } from "../models/DevelopmentProject.js";

export const createProject = async (req, res, next) => {
  try {
    const project = await DevelopmentProject.create(req.body);
    return res.status(201).json(project);
  } catch (error) {
    return next(error);
  }
};

export const listProjects = async (req, res, next) => {
  try {
    const projects = await DevelopmentProject.find().sort({ createdAt: -1 });
    return res.json(projects);
  } catch (error) {
    return next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await DevelopmentProject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.json(project);
  } catch (error) {
    return next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await DevelopmentProject.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.json({ message: "Project deleted" });
  } catch (error) {
    return next(error);
  }
};
