import { Response } from "express";
import "express-async-errors";
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

export const updateExercise = async (
	req: ReqWithUser,
	res: Response
): Promise<void> => {
	const { id } = req.params;
	const { userData } = req;

	const exercise = await Exercise.findByPk(id);

	if (!exercise) {
		throw new Error("no exercise found");
	}

	if (exercise.ownerId !== userData?.userId) {
		throw new Error("not owner");
	}
	if (req.body.date) {
		req.body.date = new Date(req.body.date);
	}

	await Exercise.update(req.body, { where: { id } });

	res.json({ msg: "successfuly updated exercise" });
};

export const deleteExercise = async (
	req: ReqWithUser,
	res: Response
): Promise<void> => {
	const { userData } = req;
	const { id } = req.params;

	const exercise = await Exercise.findByPk(id);

	if (!exercise) {
		throw new Error("no exercise found");
	}

	if (exercise.ownerId !== userData?.userId) {
		throw new Error("not owner");
	}

	await Exercise.destroy({ where: { id } });

	res.json("succesfly delted exercise");
};
