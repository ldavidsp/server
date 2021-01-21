import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Sensor } from "../entity/Sensor";
import { validate } from "class-validator";

export class SensorController {

    public sensorRepository = getRepository(Sensor);

    static all = async (req: Request, res: Response, next: NextFunction) => {
        const sensorRepository = getRepository(Sensor);
        try {
            const sensor = await sensorRepository.find();
            res.send(sensor);
        } catch (error) {
            res.status(500).send();
        }
    }

    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        const sensorRepository = getRepository(Sensor);
        try {
            const sensor = await sensorRepository.findOneOrFail(req.params.id);
            return sensor ? res.send(sensor) : res.status(404).send();
        } catch (error) {
            res.status(404).send();
            return;
        }
    }

    static saveSensor = async (req: Request, res: Response, next: NextFunction) => {
        const sensorRepository = getRepository(Sensor);
        //add params to save
        let { nombre, } = req.body;
        let sensor = new Sensor();
        
        //asign each param 
        sensor.NOMBRE = nombre;

        //Validade if the parameters are ok
        const errors = await validate(sensor);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await sensorRepository.save(sensor);
        } catch (e) {
            res.status(409).send("sensor already existe");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("Sensor created");
    }

    static deleteSensor = async (req: Request, res: Response, next: NextFunction) => {
        const sensorRepository = getRepository(Sensor);
        let sensorToRemove: Sensor;
        try {
            sensorToRemove = await sensorRepository.findOneOrFail(req.params.id);
        } catch (error) {
            res.status(404).send("Sensor not found");
            return;
        }
        let stat = await sensorRepository.remove(sensorToRemove);
        return stat ? res.send("Sensor Deleted Successfully") : res.json({ message: "error occured" })
        // return status ? status : res.json({message:"error occured, not found"})
    }


    static editSensor = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { sensorname, age } = req.body;

        //Try to find sensor on database
        const sensorRepository = getRepository(Sensor);
        let sensor;
        try {
            sensor = await sensorRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("Sensor not found");
            return;
        }

        //Validate the new values on model
        sensor.sensorname = sensorname;
        sensor.age = age;
        const errors = await validate(sensor);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means sensorname already in use
        try {
            await sensorRepository.save(sensor);
        } catch (e) {
            res.status(409).send("sensorname already in use");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();

    }
}