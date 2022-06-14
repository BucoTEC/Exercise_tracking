import { Request, Response } from "express";
import "express-async-errors";

import User from "@/models/userModel";

export const login = (req: Request, res: Response) => {
	res.json("login route");
};

export const register = async (req: Request, res: Response) => {
	const test = User.build(req.body);
	await test.save();
	return res.json({ msg: "succes", newUser: test });
};
