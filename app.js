
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

var fs = require('fs'),
    io = require('socket.io').listen(app),
    inspect = require('inspect');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use('/public/javascripts/', express.static(__dirname + '/public/javascripts'));
  app.register('.html', require('jade'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
    fs.readFile(__dirname + '/views/index.html', 'utf8', function(err, text){
        res.send(text);
    });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

// 
// Realtime Stuff
//


var well  = require('well'),
    block = require('block'),
    user  = require('user');

well.newState();

io.sockets.on('connection', function (socket) {
    // Create new user with block
    user.newUser(this.id, block.get(), null, { x: 0, y:0 } );
    
    socket.on('getState', function(){
        socket.emit('setState', well.gameState);
    });

    setTimeout(function(){
        socket.emit('setState' );
    },500);

    // Add a new block attached to user

    /*socket.on('blockLeft',   block.left()     );
    socket.on('blockright',  block.right()    );
    socket.on('blockdown',   block.down()     );
    socket.on('blockrotate', block.rotate()   );*/
});
