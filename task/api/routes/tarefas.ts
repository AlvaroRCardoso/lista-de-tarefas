import express, { Request, Response } from 'express';
import TarefaModel from '../models/Tarefa';
import tarefasController from '../controllers/TarefasController';
const routerTarefas = express.Router();

const validateTarefaId = async (req: Request, res: Response, next: any) => {
    const tarefa = await TarefaModel.findByPk(req.params.tarefaId);

    if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa not found' });
    }

    next();
}

routerTarefas.post('/tarefas', tarefasController.create);
routerTarefas.get('/tarefas', tarefasController.index);
routerTarefas.get('/tarefas/:tarefaId', validateTarefaId, tarefasController.show);
routerTarefas.put('/tarefas/:tarefaId', validateTarefaId, tarefasController.update);
routerTarefas.delete('/tarefas/:tarefaId', validateTarefaId, tarefasController.delete);

export default routerTarefas;
