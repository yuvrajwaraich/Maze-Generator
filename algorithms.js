var cells;
var stack = [];
var current;
var weight = 2;

class algorithms {
    constructor(cellDimension, gridDimension, alg) {
        this.cellDim = cellDimension;
        this.gridDim = gridDimension;

        if (alg == "depthfirst") {
            this.alg = new depthfirst(this.cellDim, this.gridDim);
        }
    }

    reset() {
        this.alg.reset();
    }

    drawSketch() {
        this.alg.drawSketch();
    }

}

function depthfirst(cellDimension, gridDimension) {
    this.cellDim = cellDimension;
    this.gridDim = gridDimension;

    this.reset = function () {
        cells = new Array(gridDim);
        stack = [];

        for (let i = 0; i < gridDim; i++) {
            cells[i] = new Array(gridDim);
        }

        for (let x = 0; x < this.gridDim; x++) {
            for (let y = 0; y < this.gridDim; y++) {
                cells[x][y] = new cell(x, y);
            }
        }
        cells[0][0].visited = true;
        stack.push(cells[0][0]);
    }

    this.drawSketch = function () {


        for (let i = 0; i < this.gridDim; i++) {
            for (let j = 0; j < this.gridDim; j++) {
                cells[i][j].show();
            }
        }
        if (stack.length > 0) {
            current = stack.pop();
            let neigbours = current.getNeighbours();
            current.visited = true;

            if (neigbours.length > 0) {
                stack.push(current);
                let rand = floor(random(neigbours.length));
                neigbours[rand].visited = true;

                if (neigbours[rand].x > current.x) {
                    current.walls[1] = 1;
                    neigbours[rand].walls[3] = 1;
                }
                else if (neigbours[rand].y > current.y) {
                    current.walls[2] = 1;
                    neigbours[rand].walls[0] = 1;
                }
                else if (neigbours[rand].x < current.x) {
                    current.walls[3] = 1;
                    neigbours[rand].walls[1] = 1;
                }
                else if (neigbours[rand].y < current.y) {
                    current.walls[0] = 1;
                    neigbours[rand].walls[2] = 1;
                }
                stack.push(neigbours[rand]);
            }
        }

    }


}

function cell(x, y) {
    this.x = x;
    this.y = y;
    this.walls = [0, 0, 0, 0]; // up, right, down, left
    this.visited = false;

    this.show = function () {
        var x = this.x * cDim;
        var y = this.y * cDim;

        if (this.visited) {
            let lineColor = color(0, 250, 154);
            let blockColor = color(75, 0, 130);

            noStroke();
            fill(blockColor);
            rect(x, y, cDim, cDim);

            if (this.walls[0] == 0) { // up
                stroke(lineColor);
                strokeWeight(weight);
                line(x, y, x + cDim, y);
            }
            if (this.walls[1] == 0) { // right
                stroke(lineColor);
                strokeWeight(weight);
                line(x + cDim, y, x + cDim, y + cDim);
            }
            if (this.walls[2] == 0) { // down
                stroke(lineColor);
                strokeWeight(weight);
                line(x, y + cDim, x + cDim, y + cDim);
            }
            if (this.walls[3] == 0) { // left
                stroke(lineColor);
                strokeWeight(weight);
                line(x, y, x, y + cDim);
            }
        }
        else {
            stroke(255);
            strokeWeight(1);
            noFill();
            rect(x, y, cDim, cDim);
        }
    }

    this.getNeighbours = function () {
        var neighbours = [];
        if (this.x + 1 < gridDim && !cells[this.x + 1][this.y].visited) {
            neighbours.push(cells[this.x + 1][this.y]);
        }
        if (this.x - 1 > -1 && !cells[this.x - 1][this.y].visited) {
            neighbours.push(cells[this.x - 1][this.y])
        }
        if (this.y + 1 < gridDim && !cells[this.x][this.y + 1].visited) {
            neighbours.push(cells[this.x][this.y + 1]);
        }
        if (this.y - 1 > -1 && !cells[this.x][this.y - 1].visited) {
            neighbours.push(cells[this.x][this.y - 1])
        }
        return neighbours;
    }
}
