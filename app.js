
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer(),
    nowjs = require('now'),
    everyone = nowjs.initialize(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
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

app.get('/', function(req, res){
  res.render('index');
});

function buildWellMap(x, y){
    var well = [];
    for( horizontal = 0; horizontal <= x; horizontal++ ){
        for ( vertical = 0; vertical <= y; vertical++ ){
            well.push({
                x: horizontal,
                y: vertical,
                occupied: 0
            });
        }
    }

    return well;
}

// For each user, userID we have coords and current block ID
var users = [];
var well = buildWellMap(10,20);


console.log(well);

// Broadcast new map to all clients
everyone.now.updatemap = function(){
    
}

// Move one block to the left
everyone.now.moveleft = function(userID, blockID){
    
}

// Move one block to the right
everyone.now.moveright = function(userID, blockID){
    
}

// Rotate one block 90 degrees to the left
everyone.now.rotateleft = function(userID, blockID){
    
}

// Rotate one block 90 degrees to the right
everyone.now.rotateright = function(userID, blockID){
    
}

// Move down a block
everyone.now.moveDown = function(userID, blockID){
    
}



// Check to see if a line has been filled.
function checkLineFilled(){
    
}

// Check if the bricks have hit the top
// of the well - game over.
function checkWellFilled(){
    
}



app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
