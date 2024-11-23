'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Atividade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Atividade.init({
    nome: DataTypes.STRING,
    turmaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Atividade',
  });
  return Atividade;
};

// models/atividade.js
module.exports = (sequelize, DataTypes) => {
  const Atividade = sequelize.define('Atividade', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    turmaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});

  Atividade.associate = function(models) {
    Atividade.belongsTo(models.Turma, {
      foreignKey: 'turmaId',
      as: 'turma',
    });
  };

  return Atividade;
};