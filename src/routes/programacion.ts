
  import { Router } from "express";
  import { ProgramacionController } from "../controllers/ProgramacionController";
  import { checkJwt } from "../middlewares/checkJwt";

  const router = Router();

  // Get todas las Programacions
  // router.get("/api/alarmas", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);
  router.get("/", ProgramacionController.all);

  // Get one alarma(alarmaId)
  router.get(
    "/:id([0-9]+)",
    [checkJwt],
    ProgramacionController.getOneById
  );

  router.delete("/:id([0-9]+)", ProgramacionController.deleteProgramacion )

  router.post("/", ProgramacionController.saveProgramacion)

  router.patch("/:id([0-9]+)", ProgramacionController.editProgramacion )

  export default router;