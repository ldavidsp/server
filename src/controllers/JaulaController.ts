import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Jaula } from '../entity/Jaula';
import { validate } from "class-validator";

export class JaulaController {

	public jaulaRepository = getRepository(Jaula);

	static all = async (req: Request, res: Response, next: NextFunction) => {
		const jaulaRepository = getRepository(Jaula);
		try {
			const jaula = await jaulaRepository.find();
			// jaula =  await  this.jaulaRepository.find({select: ["id","firstName"] }); // use incase you want to select specific values
			res.send(jaula);
		} catch (error) {
			res.status(500).send();
		}
	}

	static getOneById = async (req: Request, res: Response, next: NextFunction) => {
		const jaulaRepository = getRepository(Jaula);
		try {
			const jaula = await jaulaRepository.findOneOrFail(req.params.id);
			return jaula ? res.send(jaula) : res.status(404).send();
		} catch (error) {
			res.status(404).send();
			return;
		}
	}

	static saveJaula = async (req: Request, res: Response, next: NextFunction) => {
		const jaulaRepository = getRepository(Jaula);
		let { jaulaname, password, age } = req.body;
		let jaula = new Jaula();
		// jaula.jaulaname = jaulaname;
		// jaula.password = password;
		// jaula.age = age;

		//Validade if the parameters are ok
		const errors = await validate(jaula);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}

		//If all ok, send 201 response
		res.status(201).send("Jaula created");
	}

	static deleteJaula = async (req: Request, res: Response, next: NextFunction) => {
		const jaulaRepository = getRepository(Jaula);
		let jaulaToRemove: Jaula;
		try {
			jaulaToRemove = await jaulaRepository.findOneOrFail(req.params.id);
		} catch (error) {
			res.status(404).send("Jaula not found");
			return;
		}
		let stat = await jaulaRepository.remove(jaulaToRemove);
		return stat ? res.send("Jaula Deleted Successfully") : res.json({ message: "error occured" })
		// return status ? status : res.json({message:"error occured, not found"})
	}


	static editJaula = async (req: Request, res: Response) => {
		//Get the ID from the url
		const id = req.params.id;

		//Get values from the body
		const { jaulaname, age } = req.body;

		//Try to find jaula on database
		const jaulaRepository = getRepository(Jaula);
		let jaula;
		try {
			jaula = await jaulaRepository.findOneOrFail(id);
		} catch (error) {
			//If not found, send a 404 response
			res.status(404).send("Jaula not found");
			return;
		}

		//Validate the new values on model
		jaula.jaulaname = jaulaname;
		jaula.age = age;
		const errors = await validate(jaula);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}

		//Try to safe, if fails, that means jaulaname already in use
		try {
			await jaulaRepository.save(jaula);
		} catch (e) {
			res.status(409).send("jaulaname already in use");
			return;
		}
		//After all send a 204 (no content, but accepted) response
		res.status(204).send();

	}
}