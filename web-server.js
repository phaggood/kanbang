/**
 * Server Config and Start
 */

var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api'),
    http = require('http'),
    https = require("https");
    url = require("url"),
    path = require('path'),
    requestify = require('requestify');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.use(express.methodOverride())
app.listen(9090);

app.get('/issues', api.issues);

/* Setup for Angular
// http://stackoverflow.com/questions/15054987/express-and-angularjs-web-page-freezes-when-attempting-to-open-home-page?rq=1
app.configure(function(){
    //app.set('views', __dirname + '/views');
    //app.engine('html', require('ejs').renderFile);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use("/js",express.static(__dirname + '/public/js'));
    app.use("/css",express.static(__dirname + '/public/css'));
//    app.use("/",express.static(__dirname + '/public/index.html'));

    app.use(app.router);
});

/*
 * Routes
 */

// serve index and view partials
//app.get('/', routes.index);
//app.get('/partials/:name', routes.partials);
//app.get('*', routes.index);

// JSON API
/*app.get('/extended', api.extendedissues);
// redirect all others to the index (HTML5 history)

 */

//app.get('/', function(request, response) {
//    response.render('index.html');
//});
