import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { TipoUsuario } from "../entity/TipoUsuario";
import { validate } from "class-validator";

export class TipoUsuarioController {

    public tipoUsuarioRepository = getRepository(TipoUsuario);

    static all = async (req: Request, res: Response, next: NextFunction) => {
        const tipoUsuarioRepository = getRepository(TipoUsuario);
        try {
            const tipoUsuario = await tipoUsuarioRepository.find();
            res.send(tipoUsuario);
        } catch (error) {
            res.status(500).send();
        }
    }

    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        const tipoUsuarioRepository = getRepository(TipoUsuario);
        try {
            const tipoUsuario = await tipoUsuarioRepository.findOneOrFail(req.params.id);
            return tipoUsuario ? res.send(tipoUsuario) : res.status(404).send();
        } catch (error) {
            res.status(404).send();
            return;
        }
    }

    static saveTipoUsuario = async (req: Request, res: Response, next: NextFunction) => {
        const tipoUsuarioRepository = getRepository(TipoUsuario);
        //add params to save
        let { idJaula, } = req.body;
        let tipoUsuario = new TipoUsuario();
        
        //asign each param 
        tipoUsuario.TIPOUSUARIO = idJaula;

        //Validade if the parameters are ok
        const errors = await validate(tipoUsuario);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        try {
            await tipoUsuarioRepository.save(tipoUsuario);
        } catch (e) {
            res.status(409).send("tipoUsuario already existe");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("TipoUsuario created");
    }

    static deleteTipoUsuario = async (req: Request, res: Response, next: NextFunction) => {
        const tipoUsuarioRepository = getRepository(TipoUsuario);
        let tipoUsuarioToRemove: TipoUsuario;
        try {
            tipoUsuarioToRemove = await tipoUsuarioRepository.findOneOrFail(req.params.id);
        } catch (error) {
            res.status(404).send("TipoUsuario not found");
            return;
        }
        let stat = await tipoUsuarioRepository.remove(tipoUsuarioToRemove);
        return stat ? res.send("TipoUsuario Deleted Successfully") : res.json({ message: "error occured" })
        // return status ? status : res.json({message:"error occured, not found"})
    }


    static editTipoUsuario = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { tipoUsuarioname, age } = req.body;

        //Try to find tipoUsuario on database
        const tipoUsuarioRepository = getRepository(TipoUsuario);
        let tipoUsuario;
        try {
            tipoUsuario = await tipoUsuarioRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("TipoUsuario not found");
            return;
        }

        //Validate the new values on model
        tipoUsuario.tipoUsuarioname = tipoUsuarioname;
        tipoUsuario.age = age;
        const errors = await validate(tipoUsuario);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means tipoUsuarioname already in use
        try {
            await tipoUsuarioRepository.save(tipoUsuario);
        } catch (e) {
            res.status(409).send("tipoUsuarioname already in use");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();

    }
}