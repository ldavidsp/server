import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Guillotina } from "../entity/Guillotina";
import { validate } from "class-validator";

export class GuillotinaController {

    public guillotinaRepository = getRepository(Guillotina);

    static all = async (req: Request, res: Response, next: NextFunction) => {
        const guillotinaRepository = getRepository(Guillotina);
        try {
            const guillotina = await guillotinaRepository.find();
            res.send(guillotina);
        } catch (error) {
            res.status(500).send();
        }
    }

    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        const guillotinaRepository = getRepository(Guillotina);
        try {
            const guillotina = await guillotinaRepository.findOneOrFail(req.params.id);
            return guillotina ? res.send(guillotina) : res.status(404).send();
        } catch (error) {
            res.status(404).send();
            return;
        }
    }

    static saveGuillotina = async (req: Request, res: Response, next: NextFunction) => {
        const guillotinaRepository = getRepository(Guillotina);
        //add params to save
        let { idSilo, } = req.body;
        let guillotina = new Guillotina();
        
        //asign each param 
        guillotina.IDSILO = idSilo;

        //Validade if the parameters are ok
        const errors = await validate(guillotina);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await guillotinaRepository.save(guillotina);
        } catch (e) {
            res.status(409).send("guillotina already existe");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("Guillotina created");
    }

    static deleteGuillotina = async (req: Request, res: Response, next: NextFunction) => {
        const guillotinaRepository = getRepository(Guillotina);
        let guillotinaToRemove: Guillotina;
        try {
            guillotinaToRemove = await guillotinaRepository.findOneOrFail(req.params.id);
        } catch (error) {
            res.status(404).send("Guillotina not found");
            return;
        }
        let stat = await guillotinaRepository.remove(guillotinaToRemove);
        return stat ? res.send("Guillotina Deleted Successfully") : res.json({ message: "error occured" })
        // return status ? status : res.json({message:"error occured, not found"})
    }


    static editGuillotina = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { guillotinaname, age } = req.body;

        //Try to find guillotina on database
        const guillotinaRepository = getRepository(Guillotina);
        let guillotina;
        try {
            guillotina = await guillotinaRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("Guillotina not found");
            return;
        }

        //Validate the new values on model
        guillotina.guillotinaname = guillotinaname;
        guillotina.age = age;
        const errors = await validate(guillotina);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means guillotinaname already in use
        try {
            await guillotinaRepository.save(guillotina);
        } catch (e) {
            res.status(409).send("guillotinaname already in use");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();

    }
}