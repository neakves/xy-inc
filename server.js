/**
 * Created by Evandro Lira de Souza on 21/02/17.
 */
// ------------------------------------------------------------------------- //
/**
 * Module dependencies
 */
var express = require('express')
    ,app = express()
    ,http = require('http')
    ,server = http.createServer(app)
    ,mongoose = require('mongoose')
    ,bodyParser = require('body-parser')
    ,Promise = require('bluebird')
    ,uuid = require('node-uuid')
    ,session = require('express-session')
    ,expressCookieParser = require('cookie-parser');

const PATH = require('path');

var EXPRESS_SID_KEY = 'connect.sid';
var COOKIE_SECRET = 'zAc2Y6Y7g3+7M28fJ573f_5Ku~.%4G2f%897w4tH~T~9DZAz7+.54G_|=.-kX3NE';

/**
 * Configuration
 */
app.use(express.static(PATH.join(__dirname, '/app')));

var cookieParser = expressCookieParser(COOKIE_SECRET);

var sessionStore = new session.MemoryStore();

var config = require('./app/env.js');

//Session Configuration
app.use(cookieParser);
app.use(session({
    genid: function(req) {
        return uuid.v4();
    },
    resave: false,
    saveUninitialized: false,
    secret: COOKIE_SECRET,
    name: EXPRESS_SID_KEY,
    cookie: {maxAge: 24*60*60*1000}, // 1 dia
    store: sessionStore
}));

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// Habilita CORS no Express
app.use(function(req, res, next) {
    var origin = req.headers.origin ? req.headers.origin : '*';
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

//Configura a conexão com a Base de Dados
mongoose.Promise = Promise;
mongoose.connect(config.__env.db);
/**
 * Routes
 */
require('./routes/entry-route.js')(app, mongoose);

/**
 * Start Server
 */
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
//Inicia o servidor apenas se a conexão com a base de dados for estabelecida.
db.once('open', function() {
    console.log('Conexão estabelecida com a Base de Dados da Aplicação');
    server.listen(config.__env.expressPort, function () {
        console.log('Servidor iniciado na porta: ' + server.address().port + ' (http)');
    });
});

exports = module.exports = app;
