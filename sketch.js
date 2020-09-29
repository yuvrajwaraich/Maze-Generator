//@ts-check

var cDim = 20;
var gridDim = 30;
var alg;

// 20x20 grid with 30x30 pixel boxes
function setup() {
    createCanvas(600, 600);
    alg = new algorithms(cDim, gridDim, "depthfirst");
    alg.reset();
}

function draw() {
    background(0);
    alg.drawSketch();
}

function keyPressed() {
    if (keyCode == ENTER) {
        alg.reset();
    }
}


//cool purple colour -> rgb(238, 130, 238)
//dark purple colour for maze background -> rgb(75, 0, 130)
//light bright green -> rgb(0,250,154)