import express, { Application, Request, Response } from "express";
const app: Application = express();

import auth from "@/routes/auth";
import users from "@/routes/users";
import exercises from "@/routes/exercises";
import ResError from "@/utils/errors/customError";
import errorHandler from "@/utils/errors/errorHandler";
import "@/utils/googleAuth";

import connectDb from "@/db/connectDB";
import authVerificator from "@/middleware/auth.middleware";

import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";

dotenv.config();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
	res.send("<a href='/google/auth'>Login with google</a>");
});

app.get("/fail", (req: Request, res: Response) => {
	res.send("fail login");
});

app.get("/success", (req: Request, res: Response) => {
	res.send("succes login");
});

app.get(
	"/google/auth",
	passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
	"/google/cal",
	passport.authenticate("google", {
		successRedirect: "/success",
		failureRedirect: "/fail",
	})
);

app.use("/api/auth", auth);
app.use("/api/users", authVerificator, users);
app.use("/api/exercises", authVerificator, exercises);

app.all("*", () => {
	throw new ResError(404, "Route not found");
});

//error handling
app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => {
	connectDb();
	console.log(`Server is operational on port: ${PORT}`);
});
