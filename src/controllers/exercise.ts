import { Request, Response } from "express";
import "express-async-errors";
import User from "@/models/userModel";
import Exercise from "@/models/exerciseModel";

export const createExercise = async (
	req: Request,
	res: Response
): Promise<void> => {
	const testUser = await User.findByPk("1");
	const newExercise = Exercise.build({
		date: new Date(),
		description: "test exercise",
		duration: "10min",
		difficulty: "1/5",
		exaustion: "2/5",
		type: "swimming",
	});
	newExercise.set({ ownerId: testUser });

	await newExercise.save();
	res.json({
		testUser,
		newExercise,
	});
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
