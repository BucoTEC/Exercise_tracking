import { Request, Response } from "express";
import "express-async-errors";
// import User from "@/models/userModel";
import Exercise from "@/models/exerciseModel";
import ReqWithUser from "@/utils/types/ReqWithUser";

export const createExercise = async (
	req: ReqWithUser,
	res: Response
): Promise<void> => {
	const { userData } = req;

	if (req.body.date) {
		req.body.date = new Date(req.body.date);
	} else {
		req.body.date = new Date();
	}

	const newExercise = await Exercise.create(req.body);
	newExercise.set({ ownerId: userData?.userId });

	await newExercise.save();
	res.json({
		msg: "succesfuli created new exercise",
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
