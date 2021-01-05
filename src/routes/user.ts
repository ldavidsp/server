
  import { Router } from "express";
  import {UserController} from "../controllers/UserController";
  import { checkJwt } from "../middlewares/checkJwt";

  const router = Router();

  //Get all users
  // router.get("/api/users", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);
  router.get("/", UserController.all);

  // Get one user(userId)
  router.get(
    "/:id([0-9]+)",
    [checkJwt],
    UserController.getOneById
  );

  // Get one user(username)
  router.get(
    "/:username",
    UserController.getOneByUsername
  );

  // Create a new user
  router.post("/",  UserController.saveUser);

  //Edit one user
  router.patch(
    "/:id([0-9]+)",
    [checkJwt],
    UserController.editUser
  );

  //Delete one user
  router.delete(
    "/:id([0-9]+)",
    [checkJwt],
    UserController.deleteUser
  );

  export default router;