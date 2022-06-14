import { Request, Response } from "express";
import ReqWithUser from "@/utils/types/ReqWithUser";

export const updateUser = (req: Request, res: Response): void => {
	res.json("update route");
};

export const deleteUser = (req: ReqWithUser, res: Response): void => {
	const { userData } = req;
	const { id } = req.params;

	if (parseInt(id) !== userData?.userId) {
		throw new Error("not owner");
	}
	res.json({ data: req.userData?.userId, param: parseInt(req.params.id) });
};
