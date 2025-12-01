const express = require('express');
const app = express();
const mainRoutes = require('./routes/main.route');

//configurações
app.set('port', process.env.port || 3000);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/', mainRoutes);

app.get('/info', (req, res) => {
    console.log('Início da execução da rota info...');
    res.send('Rota info executada com sucesso...');
  }); 

app.listen(app.get('port'), () => {
    console.log('Servidor iniciado na porta: '+ app.get('port'));
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});