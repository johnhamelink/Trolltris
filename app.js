
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
                occupied: 0,
                active: 0,
                type: 0
            });
        }
    }

    return well;
}

// For each user, userID we have coords and current block ID
var users = [],
    height = 20,
    width  = 10,
var well = buildWellMap(height,width);

winston.info('-- Building well'.red);

// Broadcast new map to all clients
everyone.now.updatemap = function(){
   return well; 
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

var blocks = [
    [[0,0,0,0],
     [1,1,1,1],
     [0,0,0,0]],

    [[0,0,0],
     [2,2,2],
     [0,0,2]],

    [[0,0,0],
     [3,3,3],
     [3,0,0]],

    [[4,4],
     [4,4]],

    [[0,5,5],
     [5,5,0]],

    [[0,0,0],
     [6,6,6],
     [0,6,0]],

    [[7,7,0],
     [0,7,7]],
];

function insertNewBlock(userId){
    var type       = Math.floor(Math.random() * blocks.length),
        block      = blocks[ type ],
        startpoint = Math.floor(Math.random() * (width - block.length) ),
        topRow     = (blocks.length - width);

        for (var z = 0; z < block[0].length; z++){
            if ( block[z] !== 0 ){
                blocks[topRow + startpoint].occupied = userId;
                for ( var o = 0; o < blocks.length; o++ ){
                   if (blocks[o].occupied === userId){
                        blocks[i].active = 0;
                        blocks[i].type   = 0;
                   } 
                }
                blocks[topRow + startpoint].active = 1;
                blocks[topRow + startpoint].type = type;
            }
        }
            
}

// 
function rotateBlockLeft(userId){
        var type       = 0,
            startpoint = 0;

        for( var z = 0; z < blocks.length; z++ ){
            if ( blocks[z].userId === userId ){
                
            }
        }

        for( var z = 0; z < blocks.length; z++ ){
            if ( blocks[z].type !== 0 ){
                type = blocks[z].type;
                startpoint = z;
                break;
            }
        }

        var w = blocks[type][0].length,
            h = blocks[type].length;

        var rotated = new Array(w);
        for(var i=0; i < h; i++) {
            for(var j=0; j < w; j++) {
                if (!rotated[w-1-j]) rotated[w-1-j] = []
                rotated[w-1-j][i] = this.blocks[i][j];
            }
        }
        
}

// Check to see if a line has been filled.
function checkLineFilled(userId){
   var fill     = 0,
       occupied = 0;

   // For every row
   for( y = 0; y <= height; y++ ){
       fill = 0;
       occupied = 0;

       // For every width 
       for( x = 0; x <= width; x++ ){

           // For each item in our Well map
           for( z = 0; z < well.length; z++ ){

               // If the block is occupied, then increment the occupied number
               if (well[z].x === x && well[z].y === y && well[z].occupied === 1){
                    occupied++;
               }
           }
       }

       if (occupied === width){
            fill++;
       }

       well = removeRow(y);
   }


   addPoints(userId,fill);
   insertNewBlock(userId);

}

function removeRow(height){
    for( var z = 0; z < well.length; z++ ){
        if( well[z].y === height ){
            delete well[z];
        } else if( well[z].y > height ){
            well[z].y = (well[z].y - 1);
        }
    }
}

function addPoints(userId, fill){
    return user[userId].points = fill * 20;
}


// Check if the bricks have hit the top
// of the well - game over.
function checkWellFilled(){
   var occupied = 0;
   for( var z = 0; z <= well.length; z++ ){
        if( well[z].occupied === 1 ){
            occupied++;
        }
   }

   if (occupied === well.length){
       return true;
   } else {
       return false;
   }
}



app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
