const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config.js');

//CONEXÃO COM MONDO DB

const url_mdb = config.bd_string;
const options_mdb = {reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true};

mongoose.connect(url_mdb, options_mdb);
mongoose.set('useCreateIndex', true);


mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com o Banco de Dados' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Aplicação disconectada do Banco de Dados');
});

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao Banco de Dados');
});

// BODY PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//ROTAS
const IndexRoute = require('./Routes/index.js');
const UsersRoute = require('./Routes/users.js');

app.use('/', IndexRoute);
app.use('/users', UsersRoute);

app.listen(3000);

module.exports = app;