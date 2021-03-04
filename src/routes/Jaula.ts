
import { Router } from "express";
import { JaulaController } from "../controllers/JaulaController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

// Get todas las Jaulas
// router.get("/api/alarmas", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);
router.get("/", JaulaController.all);

// Get one alarma(alarmaId)
router.get(
  "/:id([0-9]+)",
  [checkJwt],
  JaulaController.getOneById
);

//Edit one jaula
router.patch(
  "/tasa/:id([0-9]+)",
  // [checkJwt],
  JaulaController.updateTasa
);

//Edit one jaula
router.patch(
  "/:id([0-9]+)",
  // [checkJwt],
  JaulaController.editJaula
);

//Edit one jaula [HABILITADA]
router.patch(
  "/habilitada/:id([0-9]+)",
  // [checkJwt],
  JaulaController.updateHabilitada
);

//Edit parametros
router.patch(
  "/parametros/:id([0-9]+)",
  // [checkJwt],
  JaulaController.updateParametros
);

router.post("/", JaulaController.saveJaula)

router.delete("/:id([0-9]+)", JaulaController.deleteJaula )


export default router;