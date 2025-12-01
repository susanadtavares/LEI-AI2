import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditarFilme() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState('');
  const [generoId, setGeneroId] = useState('');
  const [generos, setGeneros] = useState([]);

  // Buscar os géneros
  useEffect(() => {
    axios.get('/api/generos/list')
      .then(res => setGeneros(res.data))
      .catch(() => alert('Erro ao carregar géneros'));
  }, []);

  // Buscar os dados do filme
  useEffect(() => {
    axios.get(`/api/filmes/get/${id}`)
      .then(res => {
        const filme = res.data;
        setTitulo(filme.titulo);
        setDescricao(filme.descricao);
        setFoto(filme.foto);
        setGeneroId(filme.generoId || '');
      })
      .catch(() => alert('Erro ao carregar filme'));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/filmes/update/${id}`, {
      titulo,
      descricao,
      foto,
      generoId: parseInt(generoId)
    })
      .then(() => {
        alert('Filme atualizado com sucesso!');
        navigate('/');
      })
      .catch(() => alert('Erro ao atualizar filme'));
  };

  return (
    <div>
      <h2>Editar Filme</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <textarea
            className="form-control"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">URL da Foto</label>
          <input
            type="text"
            className="form-control"
            value={foto}
            onChange={e => setFoto(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Género</label>
          <select
            className="form-select"
            value={generoId || ''}
            onChange={e => setGeneroId(e.target.value)}
            required
          >
            <option value="">Selecione...</option>
            {generos.map(g => (
              <option key={g.id} value={g.id}>{g.descricao}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Guardar Alterações</button>
      </form>
    </div>
  );
}

export default EditarFilme;
