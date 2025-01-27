import Player from './model/Player.js';

// Variables
let grid;
let player;

let body = document.getElementById("body");
body.onload = createGrid(10);


let newGameButton = document.getElementById("newGameButton");
newGameButton.addEventListener("click", () => createGrid(10));

let topButton = document.getElementById("topButton");
topButton.addEventListener("click", () => movePlayer("TOP"));
let leftButton = document.getElementById("leftButton");
leftButton.addEventListener("click", () => movePlayer("LEFT"));
let downButton = document.getElementById("downButton");
downButton.addEventListener("click", () => movePlayer("DOWN"));
let rightButton = document.getElementById("rightButton");
rightButton.addEventListener("click", () => movePlayer("RIGHT"));

function createGrid(gridSize) {
    
    grid = document.getElementById("grid");
    while (grid.lastElementChild) {
        grid.removeChild(grid.lastElementChild);
    }

    generateCharacter();

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

function generateCharacter() {

    player = new Player(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), 20, 5);
}

function movePlayer(direction) {

    let oldCell = document.getElementById("playerIcon").parentElement;
    let oldX = oldCell.dataset.x;
    let oldY = oldCell.dataset.y;

    let newCell;
    let newX;
    let newY;

    switch (direction) {
        case "TOP":
            newX = parseInt(oldX) - 1;
            newY = parseInt(oldY);
            break;
        case "LEFT":
            newX = parseInt(oldX);
            newY = parseInt(oldY) - 1;
            break;
        case "DOWN":
            newX = parseInt(oldX) + 1;
            newY = parseInt(oldY);
            break;
        case "RIGHT":
            newX = parseInt(oldX);
            newY = parseInt(oldY) + 1;
            break;
    }

    newCell = document.querySelector('div[data-x="' + newX + '"][data-y="' + newY + '"]');
    newCell.append(oldCell.firstChild);
}