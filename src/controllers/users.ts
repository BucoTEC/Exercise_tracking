import { Request, Response } from "express";
import ReqWithUser from "@/utils/types/ReqWithUser";
import "express-async-errors";

import User from "@/models/userModel";

export const updateUser = (req: Request, res: Response): void => {
	res.json("update route");
};

export const deleteUser = async (req: ReqWithUser, res: Response) => {
	const { userData } = req;
	const { id } = req.params;

	const user = await User.findByPk(userData?.userId);

	if (!user) {
		throw new Error("no user found");
	}

	if (parseInt(id) !== userData?.userId) {
		throw new Error("not owner");
	}

	await User.destroy({ where: { id: userData.userId } });

	res.json("succesfly delted user");
};
