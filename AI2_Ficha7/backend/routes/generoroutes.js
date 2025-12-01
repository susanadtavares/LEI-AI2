const express = require('express');
const router = express.Router();
const generoController = require('../controllers/generocontroller');

// Rota para listar todos os géneros
router.get('/list', generoController.genero_list);

// Rota para obter os detalhes de um género pelo id
router.get('/:id', generoController.genero_detail);

// Rota para criar um novo género
router.post('/create', generoController.genero_create);

// Rota para atualizar um género existente pelo id
router.put('/:id', generoController.genero_update);

// Rota para eliminar um género pelo id
router.delete('/delete/:id', generoController.genero_delete);

module.exports = router;
