var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var methodOverride = require('method-override');
var jwt = require('jsonwebtoken'); //no use
var ip = require('ip');
var cluster = require('cluster');
var numCPUs= require('os').cpus().length;
var app = express();
var secureRoutes = express.Router();
app.set('port', (process.env.PORT || 8000));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true,limit: '5mb' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT,POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//router 

var conector_router = require('./router/conector-router/conector-router');

app.use('/UzI1NiIsInR5cCI6IkpXVCJ', conector_router.api);


if(cluster.isMaster){
    for(var i=0; i < numCPUs;i++){
        cluster.fork();
        cluster.on('exit', function(worker, code, signal)
        {
          console.log('worker ' + worker.process.pid + ' died');
        });
    }
}else{
    app.listen(app.get('port'), () => {
        console.log('app running port ', app.get('port'), 'IP:', ip.address());
    })
}

/*
app.listen(app.get('port'), () => {
    console.log('app running port', app.get('port'));
})*/