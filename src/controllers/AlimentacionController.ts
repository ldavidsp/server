import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Alimentacion } from "../entity/Alimentacion";
import { validate } from "class-validator";

export class AlimentacionController {

	public alimentacionRepository = getRepository(Alimentacion);

	static all = async (req: Request, res: Response, next: NextFunction) => {
		const alimentacionRepository = getRepository(Alimentacion);
		try {
			const alimentacion = await alimentacionRepository.find();
			res.send(alimentacion);
		} catch (error) {
			res.status(500).send();
		}
	}

	static getOneById = async (req: Request, res: Response, next: NextFunction) => {
		const alimentacionRepository = getRepository(Alimentacion);
		try {
			const alimentacion = await alimentacionRepository.findOneOrFail(req.params.id);
			return alimentacion ? res.send(alimentacion) : res.status(404).send();
		} catch (error) {
			res.status(404).send();
			return;
		}
	}

	static saveAlimentacion = async (req: Request, res: Response, next: NextFunction) => {
        const alimentacionRepository = getRepository(Alimentacion);
        //add params to save
		let { idJaula, } = req.body;
        let alimentacion = new Alimentacion();
        
        //asign each param 
		alimentacion.idJaula = idJaula;

		//Validade if the parameters are ok
		const errors = await validate(alimentacion);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}

		try {
			await alimentacionRepository.save(alimentacion);
		} catch (e) {
			res.status(409).send("alimentacion already existe");
			return;
		}

		//If all ok, send 201 response
		res.status(201).send("Alimentacion created");
	}

	static deleteAlimentacion = async (req: Request, res: Response, next: NextFunction) => {
		const alimentacionRepository = getRepository(Alimentacion);
		let alimentacionToRemove: Alimentacion;
		try {
			alimentacionToRemove = await alimentacionRepository.findOneOrFail(req.params.id);
		} catch (error) {
			res.status(404).send("Alimentacion not found");
			return;
		}
		let stat = await alimentacionRepository.remove(alimentacionToRemove);
		return stat ? res.send("Alimentacion Deleted Successfully") : res.json({ message: "error occured" })
		// return status ? status : res.json({message:"error occured, not found"})
	}


	static editAlimentacion = async (req: Request, res: Response) => {
		//Get the ID from the url
		const id = req.params.id;

		//Get values from the body
		const { alimentacionname, age } = req.body;

		//Try to find alimentacion on database
		const alimentacionRepository = getRepository(Alimentacion);
		let alimentacion;
		try {
			alimentacion = await alimentacionRepository.findOneOrFail(id);
		} catch (error) {
			//If not found, send a 404 response
			res.status(404).send("Alimentacion not found");
			return;
		}

		//Validate the new values on model
		alimentacion.alimentacionname = alimentacionname;
		alimentacion.age = age;
		const errors = await validate(alimentacion);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}

		//Try to safe, if fails, that means alimentacionname already in use
		try {
			await alimentacionRepository.save(alimentacion);
		} catch (e) {
			res.status(409).send("alimentacionname already in use");
			return;
		}
		//After all send a 204 (no content, but accepted) response
		res.status(204).send();

	}
}