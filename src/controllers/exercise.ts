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

export const findOneExercise = async (
	req: ReqWithUser,
	res: Response
): Promise<void> => {
	const { userData } = req;
	const { id } = req.params;

	const oneExercise = await Exercise.findByPk(id);

	if (oneExercise?.ownerId !== userData?.userId) {
		throw new Error("not owner");
	}

	res.json({ msg: "yor wanted exercie", oneExercise });
};

export const findAllExercise = async (
	req: ReqWithUser,
	res: Response
): Promise<Response> => {
	const { userData } = req;
	const allExercises = await Exercise.findAll({
		where: { ownerId: userData?.userId },
	});

	if (allExercises.length < 1) {
		return res.json("current user has no exercises");
	}

	return res.json({
		msg: "all current user exercises",
		allExercises,
	});
};

export const updateExercise = (req: Request, res: Response): void => {
	res.json("update exercise route");
};

export const deleteExercise = (req: Request, res: Response): void => {
	res.json("delet exercise route");
};
