import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import "express-async-errors";

import User from "@/models/userModel";
import ResError from "ustils/errors/customError";

dotenv.config();

const tokenSecret = process.env.JWT_SECRET || "tajna";

export const login = (req: Request, res: Response) => {
	res.json("login route");
};

export const register = async (req: Request, res: Response) => {
	const { username, email, password } = req.body;

	const user = await User.findOne({ where: { email } });

	if (user) {
		throw new ResError(404, "User already exists");
	}
	const hashedPassword = await bcrypt.hash(password, 12);

	const newUser = await User.create({
		username,
		email,
		password: hashedPassword,
	});
	const token = jwt.sign(
		{
			userId: newUser.id,
		},
		tokenSecret
		// { expiresIn: "10m" }
	);
	return res.json({ msg: "succes", newUser: newUser, token });
};
