import { Router } from "express";
import {findAll, findOne, create, remove, update} from "../controllers/note.controller.js";
import { validateCreateNote } from "../dto/note.js";
import { validarSesion } from "../middleware/sesion.js";

const router = Router();

router
.get("/", validarSesion, findAll)
.get("/:id", validarSesion, findOne)
.post("/", validarSesion, validateCreateNote, create)
.delete("/:id", validarSesion, remove)
.put("/:id", validarSesion, update)

export default router;
