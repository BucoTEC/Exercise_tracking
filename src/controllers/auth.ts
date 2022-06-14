import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import "express-async-errors";

import User from "@/models/userModel";
import ResError from "@/utils/errors/customError";

dotenv.config();

const tokenSecret = process.env.JWT_SECRET || "tajna";

// 	LOGIN CONTROLLER

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const existingUser = await User.findOne({ where: { email } });

	if (!existingUser) {
		throw new Error("Wrong credentials, user not found");
	}

	let validPassword = false;
	validPassword = await bcrypt.compare(password, existingUser.password);

	if (!validPassword) {
		throw new Error("Wrong credentials, user not found test");
	}

	const token = jwt.sign(
		{
			userId: existingUser.id,
			userEmail: existingUser.email,
		},
		tokenSecret
		// { expiresIn: "1h" }
	);
	return res.json({
		token,
		userId: existingUser.id,
		userEmail: existingUser.email,
	});
};

// 	REGISTER CONTROLLER

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
			userEmail: newUser.email,
		},
		tokenSecret
		// { expiresIn: "10m" }
	);
	return res.json({ msg: "succes", newUser: newUser, token });
};
