
import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import cat from "./cats";
import alarma from "./alarma";
import linea from "./linea";
import programacion from "./programacion";
import jaula from "./jaula";
import alimentacion from "./alimentacion";
import dosificador from "./dosificador";
import silo from "./silo";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/alarma", alarma);
routes.use("/cat", cat);
routes.use("/linea", linea);
routes.use("/programacion", programacion);
routes.use("/jaula", jaula);
routes.use("/alimentacion", alimentacion);
routes.use("/dosificador", dosificador);
routes.use("/silo", silo);

export default routes;