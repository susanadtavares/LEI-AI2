import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Componente funcional para a gestão de géneros
function ListaGeneros() {
  // Estado para armazenar a lista de géneros
  const [generos, setGeneros] = useState([]);
  // Estado para armazenar o valor do novo género a adicionar
  const [novoGenero, setNovoGenero] = useState('');

  // useEffect para carregar os géneros quando o componente é montado
  useEffect(() => {
    carregarGeneros();
  }, []);

  // Função para obter a lista de géneros da API
  const carregarGeneros = () => {
    axios.get('/api/generos/list')
      .then(response => setGeneros(response.data)) // Atualiza o estado com os géneros recebidos
      .catch(err => console.error('Erro ao carregar géneros:', err)); // Mostra erro no caso de falha
  };

  // Função para adicionar um novo género
  const adicionarGenero = () => {
    // Verifica se o campo não está vazio
    if (novoGenero.trim() === '') return alert('Insira um nome para o género');
    // Envia pedido POST para criar novo género
    axios.post('/api/generos/create', { descricao: novoGenero })
      .then(() => {
        setNovoGenero(''); // Limpa o campo de input
        carregarGeneros(); // Atualiza a lista de géneros
      })
      .catch(err => console.error('Erro ao adicionar género:', err)); // Mostra erro no caso de falha
  };

  // Função para eliminar um género
  const eliminarGenero = (id) => {
    // Confirmação antes de eliminar
    if (window.confirm('Tem certeza que deseja eliminar este género?')) {
      axios.delete(`/api/generos/delete/${id}`)
        .then(() => carregarGeneros()) // Atualiza a lista após eliminar
        .catch(err => console.error('Erro ao eliminar género:', err)); // Mostra erro no caso de falha
    }
  };

  // Renderização do componente
  return (
    <div>
      <h2>Gestão de Géneros</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapeia cada género para uma linha da tabela */}
          {generos.map(g => (
            <tr key={g.id}>
              <td>{g.descricao}</td>
              <td>
                {/* Botão para eliminar o género */}
                <button className="btn btn-danger btn-sm" onClick={() => eliminarGenero(g.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Input e botão para adicionar novo género */}
      <div className="input-group mt-3" style={{ maxWidth: '400px' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Novo género"
          value={novoGenero}
          onChange={e => setNovoGenero(e.target.value)} // Atualiza o estado ao escrever
        />
        <button className="btn btn-primary" onClick={adicionarGenero}>Adicionar</button>
      </div>
    </div>
  );
}

// Exporta o componente para ser utilizado noutros ficheiros
export default ListaGeneros;
