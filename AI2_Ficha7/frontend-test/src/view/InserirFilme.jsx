import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Componente funcional para inserir um novo filme
function InserirFilme() {
  // Estado para o título do filme
  const [titulo, setTitulo] = useState('');
  // Estado para a descrição do filme
  const [descricao, setDescricao] = useState('');
  // Estado para a URL da foto do filme
  const [foto, setFoto] = useState('');
  // Estado para o ID do género selecionado
  const [generoId, setGeneroId] = useState('');
  // Estado para a lista de géneros disponíveis
  const [generos, setGeneros] = useState([]);

  // Efeito para buscar os géneros ao carregar o componente
  useEffect(() => {
    axios.get('/api/generos/list')
      .then(response => setGeneros(response.data)) // Atualiza o estado com os géneros recebidos
      .catch(error => console.error('Erro ao buscar géneros:', error)); // Mostra erro no caso de falha
  }, []);

  // Função para submeter o formulário e inserir um novo filme
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    axios.post('/api/filmes/create', {
      titulo,
      descricao,
      foto,
      generoId: parseInt(generoId) // Converte o géneroId para inteiro
    })
      .then(() => {
        alert('Filme inserido com sucesso!'); // Mostra mensagem de sucesso
        // Limpa os campos do formulário
        setTitulo('');
        setDescricao('');
        setFoto('');
        setGeneroId('');
      })
      .catch(error => console.error('Erro ao inserir filme:', error)); // Mostra erro no caso de falha
  };

  return (
    <div>
      {/* Título da página */}
      <h2>Inserir Novo Filme</h2>
      {/* Formulário para inserir filme */}
      <form onSubmit={handleSubmit}>
        {/* Campo para o título */}
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            value={titulo}
            onChange={e => setTitulo(e.target.value)} // Atualiza o estado ao alterar o campo
            required
          />
        </div>

        {/* Campo para a descrição */}
        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <textarea
            className="form-control"
            value={descricao}
            onChange={e => setDescricao(e.target.value)} // Atualiza o estado ao alterar o campo
            required
          />
        </div>

        {/* Campo para a URL da foto */}
        <div className="mb-3">
          <label className="form-label">URL da Foto</label>
          <input
            type="text"
            className="form-control"
            value={foto}
            onChange={e => setFoto(e.target.value)} // Atualiza o estado ao alterar o campo
          />
        </div>

        {/* Campo para selecionar o género */}
        <div className="mb-3">
          <label className="form-label">Género</label>
          <select
            className="form-select"
            value={generoId}
            onChange={e => setGeneroId(e.target.value)} // Atualiza o estado ao alterar o campo
            required
          >
            <option value="">Selecione...</option>
            {/* Lista de opções de géneros */}
            {generos.map(g => (
              <option key={g.id} value={g.id}>{g.descricao}</option>
            ))}
          </select>
        </div>

        {/* Botão para submeter o formulário */}
        <button type="submit" className="btn btn-primary">Inserir</button>
      </form>
    </div>
  );
}

// Exporta o componente para ser utilizado noutras partes da aplicação
export default InserirFilme;
