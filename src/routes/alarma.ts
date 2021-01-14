
  import { Router } from "express";
  import { AlarmaController } from "../controllers/AlarmaController";
  import { checkJwt } from "../middlewares/checkJwt";

  const router = Router();

  // Get todas las Alarmas
  // router.get("/api/alarmas", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);
  router.get("/", AlarmaController.all);

  // Get one alarma(alarmaId)
  router.get(
    "/:id([0-9]+)",
    [checkJwt],
    AlarmaController.getOneById
  );

  export default router;