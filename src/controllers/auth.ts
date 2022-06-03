import { Request, Response } from "express";

export const login = (req: Request, res: Response): void => {
	res.json("login route");
};

export const register = (req: Request, res: Response): void => {
	res.json("registr route");
};
