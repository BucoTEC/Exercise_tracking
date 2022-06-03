import express, { Router } from "express";

import { updateUser, deleteUser } from "@/controllers/users";

const router: Router = express.Router();

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
