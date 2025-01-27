import Player from './model/Player.js';

function createGrid(gridSize) {
    
    let grid = document.getElementById("grid");
    while (grid.lastElementChild) {
        grid.removeChild(grid.lastElementChild);
    }

    let player = new Player(Math.random() * 9, Math.random() * 9, 20, 5);

    console.log(player)
    let newCell;
    for (i = 0; i < gridSize; i++) {
        for (j = 0; j < gridSize; j++) {

            newCell = document.createElement("div");
            newCell.dataset.x = i;
            newCell.dataset.y = j
            newCell.className = "cell";
            grid.appendChild(newCell);
        }
    }
}