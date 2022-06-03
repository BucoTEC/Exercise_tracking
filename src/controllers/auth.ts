import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
	res.json("login route");
};

export const register = (req: Request, res: Response) => {
	res.json("registr route");
};
