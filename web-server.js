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
app.listen(8080);

/* API here */
app.get('/issues', api.issues);

console.log("Web server started on port 8080");
