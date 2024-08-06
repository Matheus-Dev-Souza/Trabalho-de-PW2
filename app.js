const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const placaRoutes = require('./routes/placaRoutes');
const userRoutes = require('./routes/userRoutes'); // Incluindo as rotas de usuário
const errorHandler = require('./middlewares/errorHandler');
const path = require('path');

const app = express();
const port = 3000;

// Conectando ao MongoDB
connectDB();

// Middlewares
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Rotas
app.use('/api/placa', placaRoutes); // Prefixo para as rotas de placa
app.use('/api/users', userRoutes); // Prefixo para as rotas de usuário

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '..', 'public')));

// Tratamento de erros
app.use(errorHandler);

// Inicializar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
