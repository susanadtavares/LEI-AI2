const express = require('express');
const router = express.Router();
const filmeController = require('../controllers/filmecontroller');

// Rota para listar todos os filmes
router.get('/list', filmeController.filme_list);

// Rota para obter detalhes de um filme específico pelo ID
router.get('/get/:id', filmeController.filme_detail);

// Rota para criar um novo filme
router.post('/create', filmeController.filme_create);

// Rota para atualizar um filme existente pelo ID
router.put('/update/:id', filmeController.filme_update);

// Rota para eliminar um filme pelo ID
router.delete('/delete/:id', filmeController.filme_delete);

module.exports = router;
