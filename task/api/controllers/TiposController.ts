import { Request, Response, NextFunction } from 'express';
import TipoModel from '../models/Tipo';

class TiposController {

  index = async (req: Request, res: Response, next: NextFunction) => {
    const tipos = await TipoModel.findAll({});
    res.json(tipos);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._validateData(req.body);
      const tipo = await TipoModel.create(data);
      res.json(tipo);
    }
    catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req: Request, res: Response, next: NextFunction) => {
    const tipo = await TipoModel.findByPk(req.params.tipoId);
    res.json(tipo);
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: any = req.params.tipoId;
      const data = await this._validateData(req.body);
      await TipoModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await TipoModel.findByPk(id));
    }
    catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await TipoModel.destroy({
      where: {
        id: req.params.tipoId
      }
    });
    res.json({});
  }

  _validateData = async (data: any) => {
    const attributes = ['descricao'];
    const tipo: any = {};

    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }

      tipo[attribute] = data[attribute];
    }

    return tipo;
  }

}

export default new TiposController();