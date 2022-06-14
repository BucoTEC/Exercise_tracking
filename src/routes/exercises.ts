import express, { Router } from "express";
const router: Router = express.Router();

import {
	findOneExercise,
	findAllExercise,
	createExercise,
	updateExercise,
	deleteExercise,
} from "@/controllers/exercise";

import authVerificator from "@/middleware/auth.middleware";

router.post("/", createExercise);

router.get("/", authVerificator, findAllExercise);

router.get("/:id", findOneExercise);

router.patch("/:id", updateExercise);

router.delete("/:id", deleteExercise);

export default router;
