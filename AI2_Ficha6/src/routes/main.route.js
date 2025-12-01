const express = require('express');
const router = express.Router();
// Rota GET /bemvindo
router.get('/bemvindo', (req, res) => {
    // Obtém o parâmetro 'nome' da query string
    const nome = req.query.nome;
    
    // Valida se o nome foi fornecido
    if (!nome || nome.trim() === '') {
        return res.status(400).send('Por favor, forneça um nome na URL (ex: /bemvindo?nome=Susana)');
    }
    
    // Retorna a mensagem de boas-vindas
    res.send('Bem vindo, ${nome}!');
});

module.exports = router;