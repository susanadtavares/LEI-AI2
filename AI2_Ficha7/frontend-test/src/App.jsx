// Importação dos módulos necessários do React e React Router
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Importação dos componentes das diferentes vistas
import ListaFilmes from './view/ListaFilmes';
import InserirFilme from './view/InserirFilme';
import EditarFilme from './view/EditarFilme';
import ListaGeneros from './view/ListaGeneros';

// Importação dos estilos e ícones
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// Função principal do componente App
function App() {
  // Estado para controlar o modo escuro
  const [modoEscuro, setModoEscuro] = useState(false);
  // Estado para controlar a vista dos filmes (cards ou lista)
  const [vistaCards, setVistaCards] = useState(false);

  // Efeito para adicionar ou remover a classe 'dark' ao elemento principal do documento
  useEffect(() => {
    document.documentElement.classList.toggle('dark', modoEscuro);
  }, [modoEscuro]);

  // Renderização do componente
  return (
    <Router>
      {/* Wrapper principal da aplicação, com classe condicional para o modo escuro */}
      <div className={`app-wrapper ${modoEscuro ? 'dark' : ''}`}>
        <div className="container-fluid container-custom mt-4">
          {/* Cabeçalho com título e botões de controlo */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="mb-0">Gestão de Filmes</h1>
            <div className="d-flex gap-2">
              {/* Botão para alternar o modo escuro */}
              <button
                className="btn btn-outline-secondary"
                onClick={() => setModoEscuro(!modoEscuro)}
                title="Alternar modo escuro"
              >
                <i className={`bi ${modoEscuro ? 'bi-sun' : 'bi-moon'}`}></i>
              </button>
              {/* Botão para alternar entre vista em cards e lista */}
              <button
                className="btn btn-outline-secondary"
                onClick={() => setVistaCards(!vistaCards)}
                title="Alternar vista"
              >
                {/* Ícone invertido para indicar a vista alternativa */}
                <i className={`bi ${vistaCards ? 'bi-list' : 'bi-grid'}`}></i>
              </button>
              {/* Link para a gestão de géneros */}
              <Link to="/generos" className="btn btn-secondary" title="Gestão de Géneros">
                Géneros
              </Link>
            </div>
          </div>

          {/* Definição das rotas da aplicação */}
          <Routes>
            {/* Rota principal que mostra a lista de filmes */}
            <Route path="/" element={<ListaFilmes vistaCards={vistaCards} />} />
            {/* Rota para inserir um novo filme */}
            <Route path="/inserir" element={<InserirFilme />} />
            {/* Rota para editar um filme existente */}
            <Route path="/editar/:id" element={<EditarFilme />} />
            {/* Rota para a gestão de géneros */}
            <Route path="/generos" element={<ListaGeneros />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Exportação do componente App para ser utilizado noutros ficheiros
export default App;
