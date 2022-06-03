import { Request, Response } from "express";

export const createExercise = (req: Request, res: Response): void => {
	res.json("create exercise route");
};

export const findOneExercise = (req: Request, res: Response): void => {
	res.json("find one exercise route");
};

export const findAllExercise = (req: Request, res: Response): void => {
	res.json("find all exercise route");
};

export const updateExercise = (req: Request, res: Response): void => {
	res.json("update exercise route");
};

export const deleteExercise = (req: Request, res: Response): void => {
	res.json("delet exercise route");
};
