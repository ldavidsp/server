import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Alimentacion } from "../entity/Alimentacion";
import { validate } from "class-validator";

export class AlimentacionController {

    public tipoalarmaRepository = getRepository(Alimentacion);

    static all = async (req: Request, res: Response, next: NextFunction) => {
        const tipoalarmaRepository = getRepository(Alimentacion);
        try {
            const tipoalarma = await tipoalarmaRepository.find();
            res.send(tipoalarma);
        } catch (error) {
            res.status(500).send();
        }
    }

    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        const tipoalarmaRepository = getRepository(Alimentacion);
        try {
            const tipoalarma = await tipoalarmaRepository.findOneOrFail(req.params.id);
            return tipoalarma ? res.send(tipoalarma) : res.status(404).send();
        } catch (error) {
            res.status(404).send();
            return;
        }
    }

    static saveAlimentacion = async (req: Request, res: Response, next: NextFunction) => {
        const tipoalarmaRepository = getRepository(Alimentacion);
        //add params to save
        let { idJaula, } = req.body;
        let tipoalarma = new Alimentacion();
        
        //asign each param 
        tipoalarma.idJaula = idJaula;

        //Validade if the parameters are ok
        const errors = await validate(tipoalarma);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await tipoalarmaRepository.save(tipoalarma);
        } catch (e) {
            res.status(409).send("tipoalarma already existe");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("Alimentacion created");
    }

    static deleteAlimentacion = async (req: Request, res: Response, next: NextFunction) => {
        const tipoalarmaRepository = getRepository(Alimentacion);
        let tipoalarmaToRemove: Alimentacion;
        try {
            tipoalarmaToRemove = await tipoalarmaRepository.findOneOrFail(req.params.id);
        } catch (error) {
            res.status(404).send("Alimentacion not found");
            return;
        }
        let stat = await tipoalarmaRepository.remove(tipoalarmaToRemove);
        return stat ? res.send("Alimentacion Deleted Successfully") : res.json({ message: "error occured" })
        // return status ? status : res.json({message:"error occured, not found"})
    }


    static editAlimentacion = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { tipoalarmaname, age } = req.body;

        //Try to find tipoalarma on database
        const tipoalarmaRepository = getRepository(Alimentacion);
        let tipoalarma;
        try {
            tipoalarma = await tipoalarmaRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("Alimentacion not found");
            return;
        }

        //Validate the new values on model
        tipoalarma.tipoalarmaname = tipoalarmaname;
        tipoalarma.age = age;
        const errors = await validate(tipoalarma);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means tipoalarmaname already in use
        try {
            await tipoalarmaRepository.save(tipoalarma);
        } catch (e) {
            res.status(409).send("tipoalarmaname already in use");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();

    }
}