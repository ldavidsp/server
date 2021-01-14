
import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import cat from "./cats";
import alarma from "./alarma";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/alarma", alarma);
routes.use("/cat", cat);

export default routes;