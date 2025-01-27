import Player from './model/Player.js';

// Variables
let grid;
let player;

let newGameButton = document.getElementById("newGameButton");
newGameButton.addEventListener("click", () => createGrid(10));

function createGrid(gridSize) {
    
    grid = document.getElementById("grid");
    while (grid.lastElementChild) {
        grid.removeChild(grid.lastElementChild);
    }

    player = new Player(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), 20, 5);

    console.log(player)
    let newCell;
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {

            newCell = document.createElement("div");
            newCell.dataset.x = i;
            newCell.dataset.y = j
            newCell.className = "cell";
            if (i === player.x && j === player.y) {
                newCell.innerHTML = "<i id='playerIcon' class='fa-solid fa-person-walking fa-2xl'></i>";
            }
            grid.append(newCell);
        }
    }
}