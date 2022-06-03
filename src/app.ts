import express, { Application, Request, Response } from "express";
const app: Application = express();

import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
	res.send("welcome to server");
});

const PORT: Number = 5000;
app.listen(PORT, () => {
	console.log(`Server is operational on port: ${PORT}`);
});
