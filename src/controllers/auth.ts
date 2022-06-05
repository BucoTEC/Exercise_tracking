import { Request, Response } from "express";
import "express-async-errors";

import User from "@/models/userModel";

export const login = async (req: Request, res: Response) => {
	const test: User = User.build({
		username: "Adnan",
		password: "0401",
		email: "adnan@mail.com",
	});
	await test.save();
	res.json({ msg: "succes", newUser: test });
};

export const register = (req: Request, res: Response): void => {
	res.json("registr route");
};
