import express, { Application, Request, Response } from "express";
const app: Application = express();

import auth from "@/routes/auth";
import users from "@/routes/users";
import exercises from "@/routes/exercises";
import ResError from "@/utils/errors/customError";
import errorHandler from "@/utils/errors/errorHandler";

import connectDb from "@/db/connectDB";
import authVerificator from "@/middleware/auth.middleware";

import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
	res.send("welcome to server");
});

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
