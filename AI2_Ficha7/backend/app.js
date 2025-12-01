const express = require('express');
const app = express();

// Importar rotas
const filmeRoutes = require('./routes/filmeroutes');
const generoRoutes = require('./routes/generoroutes');

// Middleware para interpretar JSON no corpo das requests
app.use(express.json());

// Usar as rotas com prefixo /api
app.use('/api/filmes', filmeRoutes);
app.use('/api/generos', generoRoutes);

// Porta onde o servidor vai correr
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor a correr em: http://localhost:${PORT}`);
});
