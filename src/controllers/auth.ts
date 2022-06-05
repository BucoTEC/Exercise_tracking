import { Request, Response } from "express";
import "express-async-errors";

import User from "@/models/userModel";

export const login = async (req: Request, res: Response) => {
	try {
		const test: User = User.build({ username: "Adnan", password: "0401" });
		await test.save();

		res.json({ msg: "succes", newUser: test });
	} catch (error) {
		if (error instanceof Error) res.json(error.message);
	}
};

export const register = (req: Request, res: Response): void => {
	res.json("registr route");
};
