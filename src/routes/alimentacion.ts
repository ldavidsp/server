
  import { Router } from "express";
  import { AlimentacionController } from "../controllers/AlimentacionController";
  import { checkJwt } from "../middlewares/checkJwt";

  const router = Router();

  // Get todas las Alimentacions
  // router.get("/api/alarmas", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);
  router.get("/", AlimentacionController.all);

  // Get one alarma(alarmaId)
  router.get(
    "/:id([0-9]+)",
    [checkJwt],
    AlimentacionController.getOneById
  );

  export default router;