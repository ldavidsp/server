import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Esclusa } from "../entity/Esclusa";
import { validate } from "class-validator";

export class EsclusaController {

    public esclusaRepository = getRepository(Esclusa);

    static all = async (req: Request, res: Response, next: NextFunction) => {
        const esclusaRepository = getRepository(Esclusa);
        try {
            const esclusa = await esclusaRepository.find();
            res.send(esclusa);
        } catch (error) {
            res.status(500).send();
        }
    }

    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        const esclusaRepository = getRepository(Esclusa);
        try {
            const esclusa = await esclusaRepository.findOneOrFail(req.params.id);
            return esclusa ? res.send(esclusa) : res.status(404).send();
        } catch (error) {
            res.status(404).send();
            return;
        }
    }

    static saveEsclusa = async (req: Request, res: Response, next: NextFunction) => {
        const esclusaRepository = getRepository(Esclusa);
        //add params to save
        let { idLinea, } = req.body;
        let esclusa = new Esclusa();
        
        //asign each param 
        esclusa.IDLINEA = idLinea;

        //Validade if the parameters are ok
        const errors = await validate(esclusa);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await esclusaRepository.save(esclusa);
        } catch (e) {
            res.status(409).send("esclusa already existe");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("Esclusa created");
    }

    static deleteEsclusa = async (req: Request, res: Response, next: NextFunction) => {
        const esclusaRepository = getRepository(Esclusa);
        let esclusaToRemove: Esclusa;
        try {
            esclusaToRemove = await esclusaRepository.findOneOrFail(req.params.id);
        } catch (error) {
            res.status(404).send("Esclusa not found");
            return;
        }
        let stat = await esclusaRepository.remove(esclusaToRemove);
        return stat ? res.send("Esclusa Deleted Successfully") : res.json({ message: "error occured" })
        // return status ? status : res.json({message:"error occured, not found"})
    }


    static editEsclusa = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { esclusaname, age } = req.body;

        //Try to find esclusa on database
        const esclusaRepository = getRepository(Esclusa);
        let esclusa;
        try {
            esclusa = await esclusaRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("Esclusa not found");
            return;
        }

        //Validate the new values on model
        esclusa.esclusaname = esclusaname;
        esclusa.age = age;
        const errors = await validate(esclusa);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means esclusaname already in use
        try {
            await esclusaRepository.save(esclusa);
        } catch (e) {
            res.status(409).send("esclusaname already in use");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();

    }
}