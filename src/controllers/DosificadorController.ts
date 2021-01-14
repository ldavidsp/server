import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Dosificador } from "../entity/Dosificador";
import { validate } from "class-validator";

export class DosificadorController {

    public dosificadorRepository = getRepository(Dosificador);

    static all = async (req: Request, res: Response, next: NextFunction) => {
        const dosificadorRepository = getRepository(Dosificador);
        try {
            const dosificador = await dosificadorRepository.find();
            res.send(dosificador);
        } catch (error) {
            res.status(500).send();
        }
    }

    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        const dosificadorRepository = getRepository(Dosificador);
        try {
            const dosificador = await dosificadorRepository.findOneOrFail(req.params.id);
            return dosificador ? res.send(dosificador) : res.status(404).send();
        } catch (error) {
            res.status(404).send();
            return;
        }
    }

    static saveDosificador = async (req: Request, res: Response, next: NextFunction) => {
        const dosificadorRepository = getRepository(Dosificador);
        //add params to save
        let { idLinea, } = req.body;
        let dosificador = new Dosificador();
        
        //asign each param 
        dosificador.idLinea = idLinea;

        //Validade if the parameters are ok
        const errors = await validate(dosificador);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await dosificadorRepository.save(dosificador);
        } catch (e) {
            res.status(409).send("dosificador already existe");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("Dosificador created");
    }

    static deleteDosificador = async (req: Request, res: Response, next: NextFunction) => {
        const dosificadorRepository = getRepository(Dosificador);
        let dosificadorToRemove: Dosificador;
        try {
            dosificadorToRemove = await dosificadorRepository.findOneOrFail(req.params.id);
        } catch (error) {
            res.status(404).send("Dosificador not found");
            return;
        }
        let stat = await dosificadorRepository.remove(dosificadorToRemove);
        return stat ? res.send("Dosificador Deleted Successfully") : res.json({ message: "error occured" })
        // return status ? status : res.json({message:"error occured, not found"})
    }


    static editDosificador = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { dosificadorname, age } = req.body;

        //Try to find dosificador on database
        const dosificadorRepository = getRepository(Dosificador);
        let dosificador;
        try {
            dosificador = await dosificadorRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("Dosificador not found");
            return;
        }

        //Validate the new values on model
        dosificador.dosificadorname = dosificadorname;
        dosificador.age = age;
        const errors = await validate(dosificador);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means dosificadorname already in use
        try {
            await dosificadorRepository.save(dosificador);
        } catch (e) {
            res.status(409).send("dosificadorname already in use");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();

    }
}