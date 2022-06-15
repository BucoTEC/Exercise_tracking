import { Response } from "express";
import ReqWithUser from "@/utils/types/ReqWithUser";
import "express-async-errors";

import User from "@/models/userModel";

export const updateUser = async (req: ReqWithUser, res: Response) => {
	const { id } = req.params;
	const { userData } = req;

	if (parseInt(id) !== userData?.userId) {
		throw new Error("not owner");
	}
	const updatedUser = await User.update(req.body, { where: { id } });

	res.json({ msg: "successfuly updated user", updatedUser });
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
