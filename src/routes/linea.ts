
  import { Router } from "express";
  import { LineaController } from "../controllers/LineaController";
  import { checkJwt } from "../middlewares/checkJwt";

  const router = Router();

  // Get todas las Alarmas
  // router.get("/api/alarmas", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);
  router.get("/", LineaController.all);

  // Get one alarma(alarmaId)
  router.get(
    "/:id([0-9]+)",
    [checkJwt],
    LineaController.getOneById
  );

    //Edit one linea
    router.patch(
      "/:id([0-9]+)",
      // [checkJwt],
      LineaController.editLinea
    );

  export default router;