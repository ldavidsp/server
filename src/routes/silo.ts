
  import { Router } from "express";
  import { SiloController } from "../controllers/SiloController";
  import { checkJwt } from "../middlewares/checkJwt";

  const router = Router();

  // Get todas las Silos
  // router.get("/api/alarmas", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);
  router.get("/", SiloController.all);

  // Get one alarma(alarmaId)
  router.get(
    "/:id([0-9]+)",
    [checkJwt],
    SiloController.getOneById
  );

  router.post("/", SiloController.saveSilo)

  router.delete("/:id([0-9]+)", SiloController.deleteSilo )

  router.patch("/:id([0-9]+)", SiloController.editSilo )

  export default router;