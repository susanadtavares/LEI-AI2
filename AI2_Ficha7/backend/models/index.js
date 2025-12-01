'use strict';

// Importa os módulos necessários do Node.js
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename); // Nome do ficheiro atual
const env = process.env.NODE_ENV || 'development'; // Ambiente (development por defeito)
const config = require(__dirname + '/../config/config.json')[env]; // Configuração da base de dados para o ambiente atual
const db = {}; // Objeto onde vão ser guardados os modelos

let sequelize;
// Inicializa a ligação ao Sequelize, usando variáveis de ambiente se existirem
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Lê todos os ficheiros do diretório atual (modelos), exceto este ficheiro e ficheiros de teste
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && // Ignora ficheiros ocultos
      file !== basename && // Ignora este ficheiro
      file.slice(-3) === '.js' && // Apenas ficheiros .js
      file.indexOf('.test.js') === -1 // Ignora ficheiros de teste
    );
  })
  .forEach(file => {
    // Importa cada modelo e adiciona-o ao objeto db
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Se o modelo tiver associações, executa-as
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Adiciona as instâncias do Sequelize ao objeto db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Exporta o objeto db com todos os modelos e a ligação ao Sequelize
module.exports = db;
