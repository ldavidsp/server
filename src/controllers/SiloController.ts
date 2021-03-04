import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Silo } from "../entity/Silo";
import { validate } from "class-validator";

export class SiloController {

    public siloRepository = getRepository(Silo);

    static all = async (req: Request, res: Response, next: NextFunction) => {
        const siloRepository = getRepository(Silo);
        try {
            const silo = await siloRepository.find();
            res.send(silo);
        } catch (error) {
            res.status(500).send();
        }
    }

    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        const siloRepository = getRepository(Silo);
        try {
            const silo = await siloRepository.findOneOrFail(req.params.id);
            return silo ? res.send(silo) : res.status(404).send();
        } catch (error) {
            res.status(404).send();
            return;
        }
    }

    static saveSilo = async (req: Request, res: Response, next: NextFunction) => {
        const siloRepository = getRepository(Silo);
        //add params to save
        let { nombre, capacidad, medicado, saldo, pelletKilo, alimento } = req.body;
        let newSilo = new Silo();
          

        //asign each param 
        newSilo.NOMBRE = nombre;
        newSilo.CAPACIDAD = capacidad;
        newSilo.MEDICADO = medicado;
        newSilo.SALDO = saldo;
        newSilo.PELLETKILO = pelletKilo;
        newSilo.ALIMENTO = alimento;

        //Validade if the parameters are ok
        const errors = await validate(newSilo);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await siloRepository.save(newSilo);
        } catch (e) {
            res.status(409).send({ msn: "Silo ya existe"});
            return;
        }

        //If all ok, send 201 response
        res.status(201).send({ msn: "Silo created"});
    }

    static deleteSilo = async (req: Request, res: Response, next: NextFunction) => {
        const siloRepository = getRepository(Silo);
        let siloToRemove: Silo;
        try {
            siloToRemove = await siloRepository.findOneOrFail(req.params.id);
        } catch (error) {
            res.status(404).send("Silo not found");
            return;
        }
        let stat = await siloRepository.remove(siloToRemove);
        return stat ? res.send({msn: "Silo Deleted Successfully"}) : res.json({ message: "error occured" })
        // return status ? status : res.json({message:"error occured, not found"})
    }


    static editSilo = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { nombre, capacidad, medicado, saldo, pelletKilo, alimento } = req.body;

        //Try to find silo on database
        const siloRepository = getRepository(Silo);
        let silo : Silo;
        try {
            silo = await siloRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("Silo not found");
            return;
        }

        //Validate the new values on model
        silo.NOMBRE = nombre;
        silo.CAPACIDAD = capacidad;
        silo.MEDICADO = medicado;
        silo.SALDO = saldo;
        silo.PELLETKILO = pelletKilo;
        silo.ALIMENTO = alimento;

        const errors = await validate(silo);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means siloname already in use
        try {
            await siloRepository.update(id, silo);
        } catch (e) {
            res.status(409).send({msn: "No se editó el Silo"});
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();

    }
}