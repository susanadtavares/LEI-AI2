// Importa as dependências necessárias do React, axios para chamadas HTTP e Link para navegação entre páginas
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Componente funcional que recebe a prop vistaCards para alternar entre vista em cartões ou tabela
function ListaFilmes({ vistaCards }) {
  // Estado local para armazenar a lista de filmes
  const [filmes, setFilmes] = useState([]);

  // useEffect para carregar os filmes assim que o componente é montado
  useEffect(() => {
    carregarFilmes();
  }, []);

  // Função para obter a lista de filmes do backend
  const carregarFilmes = () => {
    axios.get('/api/filmes/list')
      .then(response => setFilmes(response.data)) // Actualiza o estado com os filmes recebidos
      .catch(error => console.error('Erro ao buscar filmes:', error)); // Mostra erro no caso de falha
  };

  // Função para eliminar um filme, pede confirmação ao utilizador antes de eliminar
  const eliminarFilme = (id) => {
    if (window.confirm('Tens a certeza que queres eliminar este filme?')) {
      axios.delete(`/api/filmes/delete/${id}`)
        .then(() => {
          alert('Filme eliminado com sucesso!'); // Mostra mensagem de sucesso
          carregarFilmes(); // Recarrega a lista de filmes após eliminação
        })
        .catch(error => console.error('Erro ao eliminar filme:', error)); // Mostra erro no caso de falha
    }
  };

  // Renderização do componente
  return (
    <div>
      {/* Cabeçalho com título e botão para inserir novo filme */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Lista de Filmes</h2>
        <Link to="/inserir" className="btn btn-primary">Inserir Novo Filme</Link>
      </div>

      {/* Verifica se deve mostrar em cartões ou em tabela */}
      {vistaCards ? (
        // Vista em cartões
        <div className="row g-4">
          {filmes.map(filme => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={filme.id}>
              <div className="card h-100 shadow-sm card-hover-wrapper">
                {/* Mostra a imagem do filme se existir, senão mostra texto "Sem imagem" */}
                {filme.foto ? (
                  <img
                    src={filme.foto}
                    alt={filme.titulo}
                    className="card-img-top"
                    style={{ objectFit: 'cover', height: '100%' }}
                  />
                ) : (
                  <div className="bg-secondary text-white d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
                    Sem imagem
                  </div>
                )}
                {/* Overlay com detalhes do filme e botões de acção */}
                <div className="card-hover-overlay">
                  <div>
                    <h5>{filme.titulo}</h5>
                    <p style={{ fontSize: '0.9rem' }}>{filme.descricao}</p>
                    <p><strong>Género:</strong> {filme.genero?.descricao}</p>
                  </div>
                  <div>
                    <Link to={`/editar/${filme.id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
                    <button onClick={() => eliminarFilme(filme.id)} className="btn btn-danger btn-sm">Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Vista em tabela
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Título</th>
              <th>Descrição</th>
              <th>Género</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filmes.map(filme => (
              <tr key={filme.id}>
                <td>
                  {/* Mostra a imagem do filme se existir, senão mostra texto "Sem imagem" */}
                  {filme.foto ? (
                    <img src={filme.foto} alt={filme.titulo} style={{ width: '100px', height: 'auto', objectFit: 'cover', borderRadius: '4px' }} />
                  ) : (
                    <span className="text-muted">Sem imagem</span>
                  )}
                </td>
                <td>{filme.titulo}</td>
                <td>{filme.descricao}</td>
                <td>{filme.genero?.descricao}</td>
                <td>
                  <div className="acao-btns">
                    <Link to={`/editar/${filme.id}`} className="btn btn-sm btn-warning">Editar</Link>
                    <button onClick={() => eliminarFilme(filme.id)} className="btn btn-sm btn-danger">Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Exporta o componente para ser utilizado noutros ficheiros
export default ListaFilmes;
