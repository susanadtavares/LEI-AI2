const { Genero } = require('../models');

module.exports = {
  // Lista todos os géneros existentes na base de dados
  async genero_list(req, res) {
    try {
      const generos = await Genero.findAll();
      res.json(generos);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Devolve o detalhe de um género específico, dado o seu ID
  async genero_detail(req, res) {
    try {
      const genero = await Genero.findByPk(req.params.id);
      if (genero) res.json(genero);
      else res.status(404).send("Género não encontrado");
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  // Cria um novo género com a descrição fornecida no corpo do pedido
  async genero_create(req, res) {
    const { descricao } = req.body;
    // Valida se a descrição foi fornecida
    if (!descricao || descricao.trim() === '') {
      return res.status(400).json({ erro: "Descrição é obrigatória" });
    }
    try {
      const novoGenero = await Genero.create({ descricao: descricao.trim() });
      res.status(201).json(novoGenero);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  // Atualiza a descrição de um género existente, identificado pelo ID
  async genero_update(req, res) {
    const { id } = req.params;
    const { descricao } = req.body;
    // Valida se a nova descrição foi fornecida
    if (!descricao || descricao.trim() === '') {
      return res.status(400).json({ erro: "Descrição é obrigatória" });
    }
    try {
      const genero = await Genero.findByPk(id);
      if (!genero) return res.status(404).send("Género não encontrado");

      await genero.update({ descricao: descricao.trim() });
      res.json(genero);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  // Elimina um género existente, identificado pelo ID
  async genero_delete(req, res) {
    const { id } = req.params;
    try {
      const eliminado = await Genero.destroy({ where: { id } });
      if (eliminado) {
        res.json({ message: "Género eliminado com sucesso" });
      } else {
        res.status(404).send("Género não encontrado");
      }
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
};
