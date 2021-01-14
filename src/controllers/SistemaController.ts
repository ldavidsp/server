import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Sistema } from "../entity/Sistema";
import { validate } from "class-validator";

export class SistemaController {

    public sistemaRepository = getRepository(Sistema);

    static all = async (req: Request, res: Response, next: NextFunction) => {
        const sistemaRepository = getRepository(Sistema);
        try {
            const sistema = await sistemaRepository.find();
            res.send(sistema);
        } catch (error) {
            res.status(500).send();
        }
    }

    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        const sistemaRepository = getRepository(Sistema);
        try {
            const sistema = await sistemaRepository.findOneOrFail(req.params.id);
            return sistema ? res.send(sistema) : res.status(404).send();
        } catch (error) {
            res.status(404).send();
            return;
        }
    }

    static saveSistema = async (req: Request, res: Response, next: NextFunction) => {
        const sistemaRepository = getRepository(Sistema);
        //add params to save
        let { centro, } = req.body;
        let sistema = new Sistema();
        
        //asign each param 
        sistema.centro = centro;

        //Validade if the parameters are ok
        const errors = await validate(sistema);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await sistemaRepository.save(sistema);
        } catch (e) {
            res.status(409).send("sistema already existe");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("Sistema created");
    }

    static deleteSistema = async (req: Request, res: Response, next: NextFunction) => {
        const sistemaRepository = getRepository(Sistema);
        let sistemaToRemove: Sistema;
        try {
            sistemaToRemove = await sistemaRepository.findOneOrFail(req.params.id);
        } catch (error) {
            res.status(404).send("Sistema not found");
            return;
        }
        let stat = await sistemaRepository.remove(sistemaToRemove);
        return stat ? res.send("Sistema Deleted Successfully") : res.json({ message: "error occured" })
        // return status ? status : res.json({message:"error occured, not found"})
    }


    static editSistema = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { sistemaname, age } = req.body;

        //Try to find sistema on database
        const sistemaRepository = getRepository(Sistema);
        let sistema;
        try {
            sistema = await sistemaRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("Sistema not found");
            return;
        }

        //Validate the new values on model
        sistema.sistemaname = sistemaname;
        sistema.age = age;
        const errors = await validate(sistema);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means sistemaname already in use
        try {
            await sistemaRepository.save(sistema);
        } catch (e) {
            res.status(409).send("sistemaname already in use");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();

    }
}