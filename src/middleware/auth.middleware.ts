import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

interface ReqWithUser extends Request {
	userData?: {
		userId: string;
		userEmail: string;
	};
}

const tokenSecret = process.env.JWT_SECRET || "tajna"; // ! ADD TOKEN IN ENV IF MISSING

const authVerificator = async (
	req: ReqWithUser,
	res: Response,
	next: NextFunction
) => {
	if (!req.headers.authorization) {
		throw new Error("No token found");
	}

	const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
	if (!token) {
		throw new Error("Authentication failed!");
	}
	const decodedToken: any = jwt.verify(token, tokenSecret);
	console.log(decodedToken);

	const { userId, userEmail } = decodedToken;

	req.userData = {
		userId,
		userEmail,
	};
	next();
};

export default authVerificator;
