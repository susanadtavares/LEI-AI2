const { Filme, Genero } = require('../models');

module.exports = {
  // Lista todos os filmes, incluindo o género associado
  async filme_list(req, res) {
    const filmes = await Filme.findAll({
      include: {
        model: Genero,
        as: 'genero'
      }
    });
    res.json(filmes);
  },

  // Devolve os detalhes de um filme específico pelo ID, incluindo o género
  async filme_detail(req, res) {
    const filme = await Filme.findByPk(req.params.id, {
      include: {
        model: Genero,
        as: 'genero'
      }
    });
    if (filme) res.json(filme);
    else res.status(404).send("Filme não encontrado");
  },

  // Cria um novo filme com os dados fornecidos no corpo do pedido
  async filme_create(req, res) {
    const { titulo, descricao, foto, generoId } = req.body;
    try {
      const novoFilme = await Filme.create({ titulo, descricao, foto, generoId });
      res.status(201).json(novoFilme);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  // Atualiza um filme existente com base no ID e nos dados fornecidos
  async filme_update(req, res) {
    const { id } = req.params;
    const { titulo, descricao, foto, generoId } = req.body;
    const filme = await Filme.findByPk(id);
    if (!filme) return res.status(404).send("Filme não encontrado");

    try {
      await filme.update({ titulo, descricao, foto, generoId });
      res.json(filme);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  // Remove um filme da base de dados com base no ID fornecido
  async filme_delete(req, res) {
    const { id } = req.params;
    try {
      const filme = await Filme.findByPk(id);
      if (!filme) return res.status(404).send("Filme não encontrado");
      await filme.destroy();
      res.sendStatus(204); // Sucesso, sem conteúdo
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
};
