import { Request, Response } from "express";
import ReqWithUser from "@/utils/types/ReqWithUser";

export const updateUser = (req: Request, res: Response): void => {
	res.json("update route");
};

export const deleteUser = (req: ReqWithUser, res: Response): void => {
	res.json(req.userData);
};
