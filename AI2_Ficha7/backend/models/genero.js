'use strict';

// Importa a classe Model do sequelize
const {
  Model
} = require('sequelize');

// Exporta uma função que define o modelo Genero
module.exports = (sequelize, DataTypes) => {
  // Define a classe Genero que herda de Model
  class Genero extends Model {
    // Método estático para associar modelos
    static associate(models) {
      // Um género pode ter muitos filmes associados
      Genero.hasMany(models.Filme, {
        foreignKey: 'generoId',
        as: 'filmes'
      });
    }
  }
  // Inicializa o modelo Genero com o atributo descricao
  Genero.init({
    descricao: {
      type: DataTypes.STRING, // O tipo de dados é STRING
      allowNull: false        // O campo não pode ser nulo
    }
  }, {
    sequelize,                // Instância do sequelize
    modelName: 'Genero',      // Nome do modelo
  });
  return Genero;              // Retorna o modelo definido
};
