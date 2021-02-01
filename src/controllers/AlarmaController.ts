import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Alarma } from '../entity/Alarma';

export class AlarmaController {
	public alarmaRepository = getRepository(Alarma);

	public async getAlarmas(): Promise<Alarma[]>{
        const alarmaRepository = getRepository(Alarma);
        try {
            const alarmas = await alarmaRepository.find();
            return alarmas;            
        } catch (error) {
            return [];
        }
    }


	static all = async (req: Request, res: Response, next: NextFunction) => {
		const alarmaRepository = getRepository(Alarma);
		try {
			const alarma = await alarmaRepository.find();
			// user =  await  this.userRepository.find({select: ["id","firstName"] }); // use incase you want to select specific values
			res.send(alarma);
		} catch (error) {
			res.status(500).send();
		}
	}

	static getOneById = async (req: Request, res: Response, next: NextFunction) => {
		const alarmaRepository = getRepository(Alarma);
		try {
			const alarma = await alarmaRepository.findOneOrFail(req.params.id);
			return alarma ? res.send(alarma) : res.status(404).send();
		} catch (error) {
			res.status(404).send();
			return;
		}
	}
	
}