
  import { Router } from "express";
  import { SelectoraController } from "../controllers/SelectoraController";
  import { checkJwt } from "../middlewares/checkJwt";

  const router = Router();

  // Get todas las Selectoras
  // router.get("/api/alarmas", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);
  router.get("/", SelectoraController.all);

  // Get one alarma(alarmaId)
  router.get(
    "/:id([0-9]+)",
    [checkJwt],
    SelectoraController.getOneById
  );

  export default router;