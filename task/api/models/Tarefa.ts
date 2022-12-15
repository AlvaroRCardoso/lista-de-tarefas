import { DataTypes, Model } from 'sequelize';
import db from '../db';
import Tipo from './Tipo';

class Tarefa extends Model {
  declare id: number;
  declare data_criacao: number;
  declare data_vencimento: number;
  declare tipoId: number;
  declare descricao: string;
  declare situacao: string;
  declare prioridade: number;
};

Tarefa.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  data_criacao: {
    type: DataTypes.DATE,
    allowNull: false
  },
  data_vencimento: {
    type: DataTypes.DATE,
    allowNull: false
  },
  /*tipo_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },*/
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  situacao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prioridade: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},
  {
    sequelize: db,
    tableName: 'tarefas',
    modelName: 'Tarefa'
  });

// Doc: https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many-relationships
Tipo.hasMany(Tarefa);
Tarefa.belongsTo(Tipo);

export default Tarefa;