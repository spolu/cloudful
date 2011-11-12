#!/usr/bin/env node
    
var express = require('express');
var routes = require('./routes');
var redis = ;

// Redis Setup
var redis = require('redis').createClient('tetra.redistogo.com',9317);
redis.auth('nodejitsu:78deb2e2200a492a5e3888f6f017cd06');

// App Setup
var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);	
	app.use(express.static(__dirname + '/public'));
    });

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
    });

app.configure('production', function(){
	app.use(express.errorHandler()); 
    });

// Routes
app.get('/app/:app/init', function() {});               // distribute device id if needed / extract cookie
app.get('/app/:app/signup', function() {});             // distributed user id [transitive device -> user]
app.get('/app/:app/login', function() {});              // retrieve user id    [transitive device -> user]
app.get('/app/:app/logout', function() {});             // logout user id
app.get('/app/:app/connect', function() {});            // identity connection [redirection?]

app.get('/app/:app/api/:api/setup', function() {});     // code distribution + 3-way setup
                                                        // 3-way setup: cfd sends [api_secret(app)](userid, expiry) 
                                                        // to client which uses it to request protected resources
                                                        // { url, port, expiry, token } is then available client side

app.get('/api/:api/create', function() {});             
app.get('/api/:api/publish', function() {});  
app.get('/api/:api/unpublish', function() {});

// Start
app.listen(8080);

console.log("Express server listening on port %d in %s mode", 
	    app.address().port, 
	    app.settings.env);
