'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Turma extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Turma.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Turma',
  });
  return Turma;
};

// models/turma.js
module.exports = (sequelize, DataTypes) => {
  const Turma = sequelize.define('Turma', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  Turma.associate = function(models) {
    Turma.hasMany(models.Atividade, {
      foreignKey: 'turmaId',
      as: 'atividades',
    });
  };

  return Turma;
};