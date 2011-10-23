// [[0,0,#,0,0,0],
//  [0,#,#,0,0,0],
//  [0,0,#,0,0,0],
//  [0,0,0,0,0,0]]
var width = 0,
    height = 0;

exports = {
    newWell: function(w,h){
        width = w;
        height = h;

        var well = null;
        for(var y=1; i <= height; i++){
            for(var x=1; y <= width; y++){
               well[y][x] = 0;
            }
        }

        return well;
    }
};
