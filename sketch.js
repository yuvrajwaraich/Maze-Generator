//@ts-check

var cDim = 70;
var gridX;
var gridY;
var alg;

// 20x20 grid with 30x30 pixel boxes
function setup() {
    createCanvas(displayWidth, displayHeight - 150);
    gridX = Math.floor(displayWidth/cDim);
    gridY = Math.floor((displayHeight - 150)/cDim);
    alg = new algorithms(cDim, gridX, gridY, "depthfirst");
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