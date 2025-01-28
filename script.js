import Player from './model/Player.js';

// Variables
let grid;
let player;
let treasurePosition;
let gridSize = 10;

// Création d'une partie au chargement de la page 
let body = document.getElementById("body");
body.onload = createGrid(gridSize);

// Création d'une partie en cliquant sur le bouton "Nouvelle partie"
let newGameButton = document.getElementById("newGameButton");
newGameButton.addEventListener("click", () => createGrid(gridSize));

// Fonction de création de la grille du jeu
function createGrid(pGridSize) {
    
    // Vide la grille si elle existe déjà
    grid = document.getElementById("grid");
    while (grid.lastElementChild) {
        grid.removeChild(grid.lastElementChild);
    }

    // Génére les entités de la partie
    generateCharacter();

    // Affecte les actions de déplacement au boutons
    let topButton = document.getElementById("topButton");
    topButton.addEventListener("click", () => moveCharacter("TOP"));
    let leftButton = document.getElementById("leftButton");
    leftButton.addEventListener("click", () => moveCharacter("LEFT"));
    let downButton = document.getElementById("downButton");
    downButton.addEventListener("click", () => moveCharacter("DOWN"));
    let rightButton = document.getElementById("rightButton");
    rightButton.addEventListener("click", () => moveCharacter("RIGHT"));

    // Création de la grille
    let newCell;
    for (let i = 0; i < pGridSize; i++) {
        for (let j = 0; j < pGridSize; j++) {

            newCell = document.createElement("div");
            newCell.dataset.x = i;
            newCell.dataset.y = j
            newCell.className = "cell";
            // Insertion du joueur dans la grille
            if (i === player.x && j === player.y) {
                newCell.innerHTML = "<i id='playerIcon' class='fa-solid fa-person-walking fa-2xl'></i>";
            }
            // Insertion du trésor dans la grille
            if (i === treasurePosition.x && j === treasurePosition.y) {
                newCell.innerHTML = "<i class='fa-solid fa-exclamation fa-2xl interestIcon'></i>";
            }
            grid.append(newCell);
        }
    }
}

// Génération des entités du jeu
function generateCharacter() {

    player = new Player(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), 20, 5);
    do {
        treasurePosition = { x : Math.floor(Math.random() * 10), y :  Math.floor(Math.random() * 10) };
    } while (treasurePosition.x === player.x && treasurePosition.y === player.y);
}

// Déplacement des entités
function moveCharacter(direction) {

    player.move(direction);
}


document.addEventListener(
    "keyup",
    (event) => {

      switch (event.key) {
        case "ArrowLeft":
            moveCharacter("LEFT");
            break;
        case "ArrowRight":
            moveCharacter("RIGHT");
            break;
        case "ArrowUp":
            moveCharacter("TOP");
            break;
        case "ArrowDown":
            moveCharacter("DOWN");
            break;
    }
    }
  );