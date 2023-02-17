import { Router } from "express";
import NoteController from "../controllers/note.controller.js";
import { validateCreateNote } from "../dto/note.js";
import { validarSesion } from "../middleware/sesion.js";

const router = Router();

router.get("/", validarSesion, NoteController.findAll);
router.get("/:id", validarSesion, NoteController.findOne);
router.post("/", validarSesion, validateCreateNote, NoteController.create);
router.delete("/:id", validarSesion, NoteController.remove);
router.put("/:id", validarSesion, NoteController.update);

export default router;
