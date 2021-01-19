
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

  export default router;