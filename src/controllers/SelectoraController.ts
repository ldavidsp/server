import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Selectora } from "../entity/Selectora";
import { validate } from "class-validator";

export class SelectoraController {

    public selectoraRepository = getRepository(Selectora);

    static all = async (req: Request, res: Response, next: NextFunction) => {
        const selectoraRepository = getRepository(Selectora);
        try {
            const selectora = await selectoraRepository.find();
            res.send(selectora);
        } catch (error) {
            res.status(500).send();
        }
    }

    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        const selectoraRepository = getRepository(Selectora);
        try {
            const selectora = await selectoraRepository.findOneOrFail(req.params.id);
            return selectora ? res.send(selectora) : res.status(404).send();
        } catch (error) {
            res.status(404).send();
            return;
        }
    }

    static saveSelectora = async (req: Request, res: Response, next: NextFunction) => {
        const selectoraRepository = getRepository(Selectora);
        //add params to save
        let { idLinea, } = req.body;
        let selectora = new Selectora();
        
        //asign each param 
        selectora.ID = idLinea;

        //Validade if the parameters are ok
        const errors = await validate(selectora);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await selectoraRepository.save(selectora);
        } catch (e) {
            res.status(409).send("selectora already existe");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("Selectora created");
    }

    static deleteSelectora = async (req: Request, res: Response, next: NextFunction) => {
        const selectoraRepository = getRepository(Selectora);
        let selectoraToRemove: Selectora;
        try {
            selectoraToRemove = await selectoraRepository.findOneOrFail(req.params.id);
        } catch (error) {
            res.status(404).send("Selectora not found");
            return;
        }
        let stat = await selectoraRepository.remove(selectoraToRemove);
        return stat ? res.send("Selectora Deleted Successfully") : res.json({ message: "error occured" })
        // return status ? status : res.json({message:"error occured, not found"})
    }


    static editSelectora = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { selectoraname, age } = req.body;

        //Try to find selectora on database
        const selectoraRepository = getRepository(Selectora);
        let selectora;
        try {
            selectora = await selectoraRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("Selectora not found");
            return;
        }

        //Validate the new values on model
        selectora.selectoraname = selectoraname;
        selectora.age = age;
        const errors = await validate(selectora);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means selectoraname already in use
        try {
            await selectoraRepository.save(selectora);
        } catch (e) {
            res.status(409).send("selectoraname already in use");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();

    }
}