import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Calibracion } from "../entity/Calibracion";
import { validate } from "class-validator";

export class CalibracionController {

    public calibracionRepository = getRepository(Calibracion);

    static all = async (req: Request, res: Response, next: NextFunction) => {
        const calibracionRepository = getRepository(Calibracion);
        try {
            const calibracion = await calibracionRepository.find();
            res.send(calibracion);
        } catch (error) {
            res.status(500).send();
        }
    }

    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        const calibracionRepository = getRepository(Calibracion);
        try {
            const calibracion = await calibracionRepository.findOneOrFail(req.params.id);
            return calibracion ? res.send(calibracion) : res.status(404).send();
        } catch (error) {
            res.status(404).send();
            return;
        }
    }

    static saveCalibracion = async (req: Request, res: Response, next: NextFunction) => {
        const calibracionRepository = getRepository(Calibracion);
        //add params to save
        let { idDosificador, } = req.body;
        let calibracion = new Calibracion();
        
        //asign each param 
        calibracion.IDDOSIFICADOR = idDosificador;

        //Validade if the parameters are ok
        const errors = await validate(calibracion);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await calibracionRepository.save(calibracion);
        } catch (e) {
            res.status(409).send("calibracion already existe");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("Calibracion created");
    }

    static deleteCalibracion = async (req: Request, res: Response, next: NextFunction) => {
        const calibracionRepository = getRepository(Calibracion);
        let calibracionToRemove: Calibracion;
        try {
            calibracionToRemove = await calibracionRepository.findOneOrFail(req.params.id);
        } catch (error) {
            res.status(404).send("Calibracion not found");
            return;
        }
        let stat = await calibracionRepository.remove(calibracionToRemove);
        return stat ? res.send("Calibracion Deleted Successfully") : res.json({ message: "error occured" })
        // return status ? status : res.json({message:"error occured, not found"})
    }


    static editCalibracion = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { calibracionname, age } = req.body;

        //Try to find calibracion on database
        const calibracionRepository = getRepository(Calibracion);
        let calibracion;
        try {
            calibracion = await calibracionRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("Calibracion not found");
            return;
        }

        //Validate the new values on model
        calibracion.calibracionname = calibracionname;
        calibracion.age = age;
        const errors = await validate(calibracion);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means calibracionname already in use
        try {
            await calibracionRepository.save(calibracion);
        } catch (e) {
            res.status(409).send("calibracionname already in use");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();

    }
}