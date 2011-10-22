
/**
 * Module dependencies.
 */

var express = require('express');

require('colors');

var app = module.exports = express.createServer(),
    nowjs = require('now'),
    everyone = nowjs.initialize(app),
    winston = require('winston');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  //app.set('view engine', 'ejs');
  
  // disable layout
  app.set("view options", {layout: false});

  // make a custom html template
  app.register('.html', {
    compile: function(str, options){
      return function(locals){
        return str;
      };
    }
  });

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use('/public', express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index.html');
});


var types = [1,2,3,4,5,6],
    height = 30,
    width  = 20;

/*
 * [{
 *  1: {
 *      userId: 1,
 *      coords: { x: 5, y: 9 },
 *      rotation: 0,
 *      type: 1
 *  },
 *  2: {
 *      userId: 1,
 *      coords : { x: 0, y: 4 },
 *      rotation: 3,
 *      type: 2
 *  }
 * }]
 */

function mapGen(width,height){
    var map = [];
    for( var i = 0; i < height; i++ ){
        map[i] = [];
        for ( var k = 0; k < width; k++ ){
            map[i][k] = 0;
        }
    }
    return map;
}

var blockmap = mapGen(width,height);

// For each user, userID we have coords and current block ID
var users = [],
    height = 20,
    width  = 10,
    height = height-1,
    width  = width-1;


function generateID(){
    var ID = parseInt( Math.round(Math.random().toString()) + Math.round(Math.random().toString()) + Math.round(Math.random().toString()) + Math.round(Math.random().toString()) );
    users.forEach(function(val, index, array){
        if ( ID === val ){
            generateID();
        }
    });

    return ID;
}

everyone.now.getUserId = function(){
    var ID = generateID();
    this.now.userId = ID;
    return ID;
}

// Move one block to the left
everyone.now.moveLeft = function(){
    if (this.now.userId !== null || typeof(this.now.userId) !== undefined){
        winston.info(' - ' + userID + ' moved left');
        blockLeft(this.now.userId);
        SendCoords(); 
    } else {
        winston.info(' - WARN: No UserID');
    }
}

// Move one block to the right
everyone.now.moveRight = function(){
    console.log(this.now.cyan);
    if (this.now.userId !== null || typeof(this.now.userId) !== undefined){
        winston.info(' - ' + this.now.userId + ' moved right');
        blockRight(this.now.userId);
        SendCoords();   
    } else {
        winston.info(' - WARN: No UserID');
    }
}

// Move down a block
everyone.now.moveDown = function(){
    if (this.now.userId !== null || typeof(this.now.userId) !== undefined){
        winston.info(' - ' + this.now.userId + ' moved down');
        blockDown(this.now.userId);
        SendCoords();
    } else {
        winston.info(' - WARN: No UserID');
    }
}


function SendCoords(){
    winston.info(' - Sending Coords');
    winston.info(blockmap);
    console.log(now);
    this.now.coords = blockmap;
}

/*
// Rotate one block 90 degrees to the left
everyone.now.rotateleft = function(userID){
    blockLeft(userID);
    SendCoords();
}


// Rotate one block 90 degrees to the right
everyone.now.rotateright = function(userID){
    blockLeft(userID);
    SendCoords();
}
*/



function blockLeft( userId ){
    for( var i = 0; i < height; i++ ){
        for ( var k = 0; k < width; k++ ){
            if ( blockmap[i][k] === userId ){
                
                // Check there is no collision 
                if (blockmap[i][k-1] > 0){
                    // Move down
                    blockmap[i][k-1] = userId;
                    // Delete old block
                    delete blockmap[i][k];
                }

            }
        }
    }
}

function blockRight( userId ){
    for( var i = 0; i < height; i++ ){
        for ( var k = width; k > 0; k = (k-1) ){
            if ( blockmap[i][k] === userId ){
                
                // Check there is no collision 
                if (blockmap[i][k+1] > 0){
                    // Move down
                    blockmap[i][k+1] = userId;
                    // Delete old block
                    delete blockmap[i][k];
                }
            }
        }
    }
}

function blockDown( userId ){
    for( var i = 0; i < height; i++ ){
        for ( var k = 0; k < width; k++ ){
            if ( blockmap[i][k] === userId ){
                
                // Check there is no collision 
                if (blockmap[i-1][k] > 0){
                    // Move down
                    blockmap[i-1][k] = userId;
                    // Delete old block
                    delete blockmap[i][k];
                }
            }
        }
    }
}

function blockAdd( userId ){
    var startpoint = (Math.floor( Math.round() * width ));
    blockmap[height][startpoint] = userId;
}

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
