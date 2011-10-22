
function TetrisView(canvas, game)
{
    this.blockSize = Math.min(canvas.width/game.well.width, canvas.height/game.well.height);
    this.game = game;
    this.ctx = canvas.getContext('2d');

    var self = this;
    canvas.addEventListener('keydown', function(e) {self.keyHandler(e);}, false);
    canvas.addEventListener('focus', function(e) {self.focused = true; self.draw();}, false);
    canvas.addEventListener('blur', function(e) {self.focused = false; self.draw();}, false);

    this.game.addListener(function(){self.draw()});

    canvas.tabIndex=0;
    canvas.focus();

    this.draw();
}

TetrisView.prototype = {
    ctx: null,
    game: null,
    focused: false,

    key: {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39
    },

    keyHandler: function(e) {
        switch(e.keyCode) {
            case this.key.UP:
                //this.game.rotate();
                break;
            case this.key.LEFT:
                now.moveleft(window.userId);
                break;
            case this.key.RIGHT:
                now.moveleft(window.userId);
                break;
            case this.key.DOWN:
                now.moveDown(window.userId);
                break;
            default:
                return; // leave other keys alone
        }

        e.preventDefault();
    },

    wellColors: ['black', '#0000ff' ],

    draw: function() {
        this.drawBlocks(this.game.well.blocks,0,0, false);
        this.drawBlocks(this.game.tetromino.blocks, this.game.tetromino.x, this.game.tetromino.y, true);
    },

    drawBlocks: function(blocks, x,y, skipzero) {
        var blockSize=this.blockSize;

        for(var i=0; i < blocks.length; i++) {
            for(var j=0; j < blocks[i].length; j++) {
                if (skipzero && !blocks[i][j]) continue;
                
                this.ctx.fillStyle = this.wellColors[blocks[i][j]];
                this.ctx.fillRect(blockSize*(x+j), blockSize*(y+i), blockSize-1, blockSize-1);
            }
        }
    },

0:0};
