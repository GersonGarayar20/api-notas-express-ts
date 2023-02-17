import { Router } from "express";
import auth from "./auth.route.js";
import note from "./note.route.js";

const router = Router();
router.use("/notes", note);
router.use("/auth", auth);

export default router;
