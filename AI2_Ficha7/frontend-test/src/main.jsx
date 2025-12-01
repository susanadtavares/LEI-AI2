// Importa a biblioteca React para criar componentes e gerir o ciclo de vida da aplicação
import React from 'react';
// Importa o ReactDOM para interagir com o DOM da página
import ReactDOM from 'react-dom/client';
// Importa o componente principal da aplicação
import App from './App';
// Importa o ficheiro CSS do Bootstrap para estilos pré-definidos
import 'bootstrap/dist/css/bootstrap.min.css';

// Cria a raiz da aplicação React e renderiza o componente App dentro do elemento com o id 'root'
// O React.StrictMode é utilizado para ajudar a identificar potenciais problemas na aplicação
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
