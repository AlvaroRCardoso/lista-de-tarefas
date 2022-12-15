import express, { Request, Response } from 'express';
import TipoModel from '../models/Tipo';
import tiposController from '../controllers/TiposController';
const routerTipos = express.Router();

const validateTipoId = async (req: Request, res: Response, next: any) => {
    const tipo = await TipoModel.findByPk(req.params.tipoId);

    if (!tipo) {
        return res.status(404).json({ error: 'Tipo not found' });
    }

    next();
}

routerTipos.post('/tipos', tiposController.create);
routerTipos.get('/tipos', tiposController.index);
routerTipos.get('/tipos/:tipoId', validateTipoId, tiposController.show);
routerTipos.put('/tipos/:tipoId', validateTipoId, tiposController.update);
routerTipos.delete('/tipos/:tipoId', validateTipoId, tiposController.delete);

export default routerTipos;