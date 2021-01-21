import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Blower } from "../entity/Blower";
import { validate } from "class-validator";

export class BlowerController {

    public blowerRepository = getRepository(Blower);

    static all = async (req: Request, res: Response, next: NextFunction) => {
        const blowerRepository = getRepository(Blower);
        try {
            const blower = await blowerRepository.find();
            res.send(blower);
        } catch (error) {
            res.status(500).send();
        }
    }

    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        const blowerRepository = getRepository(Blower);
        try {
            const blower = await blowerRepository.findOneOrFail(req.params.id);
            return blower ? res.send(blower) : res.status(404).send();
        } catch (error) {
            res.status(404).send();
            return;
        }
    }

    static saveBlower = async (req: Request, res: Response, next: NextFunction) => {
        const blowerRepository = getRepository(Blower);
        //add params to save
        let { idLinea, } = req.body;
        let blower = new Blower();
        
        //asign each param 
        blower.IDALARMA = idLinea;

        //Validade if the parameters are ok
        const errors = await validate(blower);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await blowerRepository.save(blower);
        } catch (e) {
            res.status(409).send("blower already existe");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("Blower created");
    }

    static deleteBlower = async (req: Request, res: Response, next: NextFunction) => {
        const blowerRepository = getRepository(Blower);
        let blowerToRemove: Blower;
        try {
            blowerToRemove = await blowerRepository.findOneOrFail(req.params.id);
        } catch (error) {
            res.status(404).send("Blower not found");
            return;
        }
        let stat = await blowerRepository.remove(blowerToRemove);
        return stat ? res.send("Blower Deleted Successfully") : res.json({ message: "error occured" })
        // return status ? status : res.json({message:"error occured, not found"})
    }


    static editBlower = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { blowername, age } = req.body;

        //Try to find blower on database
        const blowerRepository = getRepository(Blower);
        let blower;
        try {
            blower = await blowerRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("Blower not found");
            return;
        }

        //Validate the new values on model
        blower.blowername = blowername;
        blower.age = age;
        const errors = await validate(blower);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means blowername already in use
        try {
            await blowerRepository.save(blower);
        } catch (e) {
            res.status(409).send("blowername already in use");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();

    }
}