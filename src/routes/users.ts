import express, { Router } from "express";

import { updateUser, deleteUser } from "@/controllers/users";
import authVerificator from "@/middleware/auth.middleware";

const router: Router = express.Router();

router.patch("/:id", updateUser);

router.delete("/:id", authVerificator, deleteUser);

export default router;
