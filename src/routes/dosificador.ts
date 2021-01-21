
  import { Router } from "express";
  import { DosificadorController } from "../controllers/DosificadorController";
  import { checkJwt } from "../middlewares/checkJwt";

  const router = Router();

  // Get todas las Dosificadors
  // router.get("/api/alarmas", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);
  router.get("/", DosificadorController.all);

  // Get one alarma(alarmaId)
  router.get(
    "/:id([0-9]+)",
    [checkJwt],
    DosificadorController.getOneById
  );

  export default router;