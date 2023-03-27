import { Router } from "express";
import { signin, login } from "../controllers/auth.controller.js";
import { validateUserSignin, validateUserLogin } from "../dto/user.js";

const router = Router();

router
.post("/signin", validateUserSignin, signin)
.post("/login", validateUserLogin, login);

export default router;
