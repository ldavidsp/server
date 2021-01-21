import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Programacion } from "../entity/Programacion";
import { validate } from "class-validator";

export class ProgramacionController {

    public programacionRepository = getRepository(Programacion);

    static all = async (req: Request, res: Response, next: NextFunction) => {
        const programacionRepository = getRepository(Programacion);
        try {
            const programacion = await programacionRepository.find();
            res.send(programacion);
        } catch (error) {
            res.status(500).send();
        }
    }

    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        const programacionRepository = getRepository(Programacion);
        try {
            const programacion = await programacionRepository.findOneOrFail(req.params.id);
            return programacion ? res.send(programacion) : res.status(404).send();
        } catch (error) {
            res.status(404).send();
            return;
        }
    }

    static saveProgramacion = async (req: Request, res: Response, next: NextFunction) => {
        const programacionRepository = getRepository(Programacion);
        //add params to save
        let { nombre, } = req.body;
        let programacion = new Programacion();
        
        //asign each param 
        programacion.NOMBRE = nombre;

        //Validade if the parameters are ok
        const errors = await validate(programacion);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await programacionRepository.save(programacion);
        } catch (e) {
            res.status(409).send("programacion already existe");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("Programacion created");
    }

    static deleteProgramacion = async (req: Request, res: Response, next: NextFunction) => {
        const programacionRepository = getRepository(Programacion);
        let programacionToRemove: Programacion;
        try {
            programacionToRemove = await programacionRepository.findOneOrFail(req.params.id);
        } catch (error) {
            res.status(404).send("Programacion not found");
            return;
        }
        let stat = await programacionRepository.remove(programacionToRemove);
        return stat ? res.send("Programacion Deleted Successfully") : res.json({ message: "error occured" })
        // return status ? status : res.json({message:"error occured, not found"})
    }


    static editProgramacion = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { programacionname, age } = req.body;

        //Try to find programacion on database
        const programacionRepository = getRepository(Programacion);
        let programacion;
        try {
            programacion = await programacionRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("Programacion not found");
            return;
        }

        //Validate the new values on model
        programacion.programacionname = programacionname;
        programacion.age = age;
        const errors = await validate(programacion);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means programacionname already in use
        try {
            await programacionRepository.save(programacion);
        } catch (e) {
            res.status(409).send("programacionname already in use");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();

    }
}