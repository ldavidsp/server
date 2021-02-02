
import { Router } from "express";
import { TipoAlarmaController } from '../controllers/TipoAlarmaController';
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

// Get todas las Alarmas
// router.get("/api/alarmas", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);
router.get("/", TipoAlarmaController.all);

// Get one alarma(alarmaId)
router.get(
    "/:id([0-9]+)",
    [checkJwt],
    TipoAlarmaController.getOneById
);

export default router;