import { Op } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import TarefaModel from '../models/Tarefa';
import TipoModel from '../models/Tipo';

class TarefasController {

  index = async (req: Request, res: Response, next: NextFunction) => {
    const params = req.query;
    const where: any = {};

    if (params.TipoId) {
      where.TipoId =
      {
        [Op.eq]: params.TipoId
      };
    }

    const tarefas = await TarefaModel.findAll(
      {
        where: where,
        include: [{
          model: TipoModel,
          required: false,
          attributes: ['descricao']
        }]
      });

    res.json(tarefas);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._validateData(req.body);
      const tarefa = await TarefaModel.create(data);
      res.json(tarefa);
    }
    catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req: Request, res: Response, next: NextFunction) => {
    const tipo = await TarefaModel.findByPk(req.params.tarefaId);
    res.json(tipo);
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.tarefaId;
      const data = await this._validateData(req.body);
      await TarefaModel.update(data,
        {
          where: {
            id: id
          }
        });

      res.json(await TarefaModel.findByPk(id));
    }
    catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await TarefaModel.destroy(
      {
        where: {
          id: req.params.tarefaId
        }
      });
    res.json({});
  }

  _validateData = async (data: any) => {
    const attributes = ['data_criacao', 'data_vencimento', 'TipoId', 'descricao', 'situacao', 'prioridade'];
    const tarefa: any = {};

    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }

      tarefa[attribute] = data[attribute];
    }

    if (await this._checkIfTarefaAndTipoExists(tarefa.data_criacao, tarefa.data_vencimento, tarefa.TipoId, tarefa.descricao, tarefa.situacao, tarefa.prioridade)) {
      throw new Error(` "${tarefa.TipoId}" `);
    }

    return tarefa;
  }

  _checkIfTarefaAndTipoExists = async (data_criacao: Date, data_vencimento: Date, tipo: string, descricao: string, situacao: string, prioridade: number) => {
    const tarefas = await TarefaModel.count(
      {
        where:
        {
          [Op.and]: [
            { TipoId: tipo },
            { data_criacao: data_criacao},
            { data_vencimento: data_vencimento},
            { descricao: descricao},
            { situacao: situacao},
            { prioridade: prioridade}
          ]
        }
      });

    return tarefas > 0;
  }

}

export default new TarefasController();