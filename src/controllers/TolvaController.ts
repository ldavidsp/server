import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Tolva } from "../entity/Tolva";
import { validate } from "class-validator";

export class TolvaController {

    public tolvaRepository = getRepository(Tolva);

    static all = async (req: Request, res: Response, next: NextFunction) => {
        const tolvaRepository = getRepository(Tolva);
        try {
            const tolva = await tolvaRepository.find();
            res.send(tolva);
        } catch (error) {
            res.status(500).send();
        }
    }

    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        const tolvaRepository = getRepository(Tolva);
        try {
            const tolva = await tolvaRepository.findOneOrFail(req.params.id);
            return tolva ? res.send(tolva) : res.status(404).send();
        } catch (error) {
            res.status(404).send();
            return;
        }
    }

    static saveTolva = async (req: Request, res: Response, next: NextFunction) => {
        const tolvaRepository = getRepository(Tolva);
        //add params to save
        let { idJaula, } = req.body;
        let tolva = new Tolva();
        
        //asign each param 
        tolva.IDLINEA = idJaula;

        //Validade if the parameters are ok
        const errors = await validate(tolva);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await tolvaRepository.save(tolva);
        } catch (e) {
            res.status(409).send("tolva already existe");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("Tolva created");
    }

    static deleteTolva = async (req: Request, res: Response, next: NextFunction) => {
        const tolvaRepository = getRepository(Tolva);
        let tolvaToRemove: Tolva;
        try {
            tolvaToRemove = await tolvaRepository.findOneOrFail(req.params.id);
        } catch (error) {
            res.status(404).send("Tolva not found");
            return;
        }
        let stat = await tolvaRepository.remove(tolvaToRemove);
        return stat ? res.send("Tolva Deleted Successfully") : res.json({ message: "error occured" })
        // return status ? status : res.json({message:"error occured, not found"})
    }


    static editTolva = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { tolvaname, age } = req.body;

        //Try to find tolva on database
        const tolvaRepository = getRepository(Tolva);
        let tolva;
        try {
            tolva = await tolvaRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("Tolva not found");
            return;
        }

        //Validate the new values on model
        tolva.tolvaname = tolvaname;
        tolva.age = age;
        const errors = await validate(tolva);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means tolvaname already in use
        try {
            await tolvaRepository.save(tolva);
        } catch (e) {
            res.status(409).send("tolvaname already in use");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();

    }
}