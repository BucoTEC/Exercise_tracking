import express, { Router } from "express";

import { login, register, googleProvider } from "@/controllers/auth";

const router: Router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.get("/google", googleProvider);

export default router;
