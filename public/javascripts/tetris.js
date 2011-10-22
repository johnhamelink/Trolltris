
function TetrisGame()
{
    window.userId = now.getUserId();
    this.listeners = [];
    this.initWell(10,20);
    this.newTetromino();

    var self=this;
    setInterval(function(){self.drop()},500);
}

TetrisGame.prototype = {

    listeners: null,
    well: null,
    tetromino: null,

    newTetromino: function() {
        var t = Tetromino.getTetromino(0, 0, Math.floor(Math.random()*(this.well.width-4)),0);
        if (this.canPlaceInWell(t, t.x, t.y)) {
            this.tetromino = t;
        } else {
            this.tetromino = null;
        }
    },

    rotate: function() {
        var old_t = this.tetromino;
        var new_t = this.tetromino.rotated();
        if (this.tryPlacingRotated(new_t, old_t, 0) ||
            this.tryPlacingRotated(new_t, old_t, 1) ||
            this.tryPlacingRotated(new_t, old_t, -1) ||
            this.tryPlacingRotated(new_t, old_t, -2)) {

            this.notifyWellChanged();
        }
    },

    tryPlacingRotated: function(new_t, old_t, x) {
        if (this.canPlaceInWell(new_t, new_t.x+x, new_t.y) && (!x || this.canPlaceInWell(old_t, old_t.x+x, old_t.y))) {
            new_t.x += x;
            this.tetromino = new_t;
            return true;
        }
        return false;
    },

    move: function(direction) {
        if (this.canPlaceInWell(this.tetromino, this.tetromino.x+direction, this.tetromino.y)) {
            this.tetromino.x+=direction;
            this.notifyWellChanged();
        }
    },

    drop: function() {
        if (this.canPlaceInWell(this.tetromino, this.tetromino.x, this.tetromino.y + 1)) {
            this.tetromino.y+=1;
            this.notifyWellChanged();
        } else {
            this.placeInWell(this.tetromino);
            this.newTetromino()
        }
    },

    addListener: function(callback) {
        this.listeners.push(callback);
    },

    canPlaceInWell: function(tetromino,x,y) {
        var blocks = tetromino.blocks;

        for(var i=0; i < blocks.length; i++) {
            for(var j=0; j < blocks[i].length; j++) {
                if (!blocks[i][j]) continue;

                // out of bounds
                if (y+i < 0 || x+j < 0) return false;
                if (y+i >= this.well.blocks.length) return false;
                if (x+j >= this.well.blocks[y+i].length) return false;

                // collision
                if (this.well.blocks[y+i][x+j]) return false;
            }
        }
        return true;
    },

    placeInWell: function(tetromino) {
        var blocks = tetromino.blocks;
        var x = tetromino.x, y = tetromino.y;

        for(var i=0; i < blocks.length; i++) {
            for(var j=0; j < blocks[i].length; j++) {
                if (blocks[i][j]) this.well.blocks[y+i][x+j] = blocks[i][j];
            }
        }

        this.clearWell();
    },

    clearWell: function() {
        var blocks = this.well.blocks;
        var write_y = blocks.length-1;
        for(var read_y=write_y; read_y >= 0; read_y--) {

            var full_line = true;
            for(var x=0; x < blocks[read_y].length; x++) {
                if (!blocks[read_y][x]) { full_line = false; break; }
            }

            blocks[write_y] = blocks[read_y];

            if (!full_line) write_y--;
        }

        var width = blocks[0].length;
        while(write_y >= 0) {
            blocks[write_y] = [];
            for(var x=0; x < width; x++) blocks[write_y][x]=0;
            write_y--;
        }
    },

    notifyWellChanged: function() {
        this.listeners.forEach(function(listener){
            listener();
        });
    },

    initWell: function(w,h) {
        this.well = {width:w, height:h, blocks:[]};

        for(var i=0; i < h; i++) {
            this.well.blocks[i] = []
            for(var j=0; j < w; j++) {
                this.well.blocks[i][j] = 0;
            }
        }
    },

0:0};
