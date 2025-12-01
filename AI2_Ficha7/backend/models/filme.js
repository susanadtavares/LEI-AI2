'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Filme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Filme.belongsTo(models.Genero, {
        foreignKey: 'generoId',
        as: 'genero'
      });
  }

  }
  Filme.init({
    titulo: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    foto: DataTypes.STRING,
    generoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Filme',
  });
  return Filme;
};