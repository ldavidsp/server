import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Linea } from "../entity/Linea";
import { validate } from "class-validator";

export class LineaController {

    public lineaRepository = getRepository(Linea);

    public async getLineas(): Promise<Linea[]>{
        const lineaRepository = getRepository(Linea);
        try {
            const lineas = await lineaRepository.find();
            return lineas;            
        } catch (error) {
            return [];
        }
    }

    static all = async (req: Request, res: Response, next: NextFunction) => {
        const lineaRepository = getRepository(Linea);
        try {
            const linea = await lineaRepository.find();
            res.send(linea);
        } catch (error) {
            res.status(500).send();
        }
    }

    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        const lineaRepository = getRepository(Linea);
        try {
            const linea = await lineaRepository.findOneOrFail(req.params.id);
            return linea ? res.send(linea) : res.status(404).send();
        } catch (error) {
            res.status(404).send();
            return;
        }
    }

    static saveLinea = async (req: Request, res: Response, next: NextFunction) => {
        const lineaRepository = getRepository(Linea);
        //add params to save
        let { idJaula, } = req.body;
        let linea = new Linea();
        
        //asign each param 
        linea.ALARMA = idJaula;

        //Validade if the parameters are ok
        const errors = await validate(linea);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await lineaRepository.save(linea);
        } catch (e) {
            res.status(409).send("linea already existe");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("Linea created");
    }

    static deleteLinea = async (req: Request, res: Response, next: NextFunction) => {
        const lineaRepository = getRepository(Linea);
        let lineaToRemove: Linea;
        try {
            lineaToRemove = await lineaRepository.findOneOrFail(req.params.id);
        } catch (error) {
            res.status(404).send("Linea not found");
            return;
        }
        let stat = await lineaRepository.remove(lineaToRemove);
        return stat ? res.send("Linea Deleted Successfully") : res.json({ message: "error occured" })
        // return status ? status : res.json({message:"error occured, not found"})
    }


	static editLinea = async (req: Request, res: Response) => {
		//Get the ID from the url
		const id = req.params.id;
		//Get values from the body
		const { estado } = req.body;
		//Try to find jaula on database
		const lineaRepository = getRepository(Linea);
		let lineaToUpdate;
		try {
			lineaToUpdate = await lineaRepository.findOneOrFail(id);
			console.log(lineaToUpdate);
		} catch (error) {
			//If not found, send a 404 response
			res.status(404).send("Linea not found");
			return;
		}
		//Validate the new values on model
		lineaToUpdate.ESTADO = Number(estado);
		const errors = await validate(lineaToUpdate);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}
		//Try to safe, if fails, that means jaulaname already in use
		try {
			await lineaRepository.update(id, lineaToUpdate);
		} catch (e) {
			res.status(409).send(e);
			return;
		}
		//After all send a 204 (no content, but accepted) responselineaToUpdate

		res.status(204).send();

    }
    
    static updateHzPausa = async (req: Request, res: Response) => {
		//Get the ID from the url
		const id = req.params.id;
		//Get values from the body
		const { hzPausa } = req.body;
		//Try to find jaula on database
		const lineaRepository = getRepository(Linea);
		let lineaToUpdate: Linea;
		try {
			lineaToUpdate = await lineaRepository.findOneOrFail(id);
			console.log(lineaToUpdate);
		} catch (error) {
			//If not found, send a 404 response
			res.status(404).send("Linea not found");
			return;
		}
		//Validate the new values on model
		lineaToUpdate.HZPAUSA = Number(hzPausa);
		const errors = await validate(lineaToUpdate);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}
		//Try to safe, if fails, that means jaulaname already in use
		try {
			await lineaRepository.update(id, lineaToUpdate);
		} catch (e) {
			res.status(409).send(e);
			return;
		}
		//After all send a 204 (no content, but accepted) responselineaToUpdate

		res.status(204).send();

	}
}