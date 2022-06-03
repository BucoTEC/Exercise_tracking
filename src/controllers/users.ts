import { Request, Response } from "express";

export const updateUser = (req: Request, res: Response): void => {
	res.json("update route");
};

export const deleteUser = (req: Request, res: Response): void => {
	res.json("delet user route");
};
