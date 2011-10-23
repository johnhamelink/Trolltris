var well  = null;

// [[0,0,#,0,0,0],
//  [0,#,#,0,0,0],
//  [0,0,#,0,0,0],
//  [0,0,0,0,0,0]]

exports = {
    init: function(w){
        well = w;
    },
    add: function(){
        socket.get('userGrid',function(err,grid){
            grid = well.newWell();
            var newBrick = brickTypes[ Math.round( Math.random() * (brickTypes.length-1) ) ][0];
            var startPoint = Math.round( Math.random() * (grid[0].length-1) ) - newBrick[0].length;
            for(var x = (startPoint); x <= (grid[0].length-1); x++){
                grid[0][x] = newbrick[ (x - startPoint) ];
            }
            socket.set('userGrid',grid,function(){});
        });
    },
    left: function(){
        socket.get('block',function(err,block){
            socket.get('userGrid',function(err,grid){
                //Shift everything left and add an extra
                //array to the end.
                grid.foreach(function(val,index,array){
                    grid[index].shift();
                    grid[ grid[index.length] ] = 0;
                });
            });
        });
    },
    right: function(){
        socket.get('block',function(err,block){
            socket.get('userGrid',function(err,grid){

                grid.foreach(function(val,index,array){
                    // Shift everything left one
                    for( var i=1; i <= (grid[index].length-1); i++ ){
                        grid[index][i-1] = grid[index][i];
                    }

                    // delete extra row
                    grid[index].pop();

                });

            });
        });
    },
    down: function(){
        socket.get('block',function(err,block){
            socket.get('userGrid',function(err,grid){
                for( var i=(grid.length-1); i >= 1; i-- ){
                    grid[i+1] = grid[i];
                }
                grid.pop();
            });
        });
    },
    rotate: function(){
        socket.get('block',function(err,block){

            //TODO: Buggy with shapes that start with 0s
            socket.get('userGrid',function(err,grid){
                var coords = [];
                grid.foreach(function(yval, y, array){
                    grid[y].foreach(function(xval,x,array){
                        if (xval !== 0){
                            coords = {x : x, y : y};
                            return;
                        }
                    });

                    if(coords.length > 0){
                        return;
                    }
                });
                
                block.rotation++;
                if (block.rotation > 3){
                     block.rotation = 0;
                }

                var newbrick = brickTypes[block.type][rot];
                grid = well.newWell();
                
                // Do the rotate!
                for(var y=coords.y; y <= (coords.y+(newbrick.length-1)); y++){
                    for( var x=coords.x; x <= (coords.x+(newbrick[y].length-1)); x++ ){
                        grid[y][x] = newbrick[y][x];
                    }
                }

                socket.set('userGrid',grid,function(){});
                socket.set('block',block,function(){});
            });
        });
    }
};

var brickTypes = {
    
    1: {
        0: [[1,1,1,1]],

        1: [[1],
             [1],
             [1],
             [1]],

        2: [[1,1,1,1]],

        3: [[1],
              [1],
              [1],
              [1]]
    },

    2: {
        0:   [[1,1,0],
              [0,1,1],
              [0,0,0]],

        1:  [[0,1]
              [1,1],
              [1,0]],

        2: [[1,1,0],
              [0,1,1]],

        3: [[0,1],
              [1,1],
              [1,0]]
            
    },


    3: {
        0: [[1,1],
            [1,1]],

        1: [[1,1],
            [1,1]],

        2: [[1,1],
              [1,1]],

        3: [[1,1],
              [1,1]],
    },
    

    4: {
        0: [[1,1,1],
            [0,1,0]],

        1: [[0,1],
             [1,1],
             [0,1]],

        2: [[0,1,0],
              [1,1,1]],

        3: [[1,0],
              [1,1],
              [1,0]]
    },
};
