import Player from "./model/Player.js";

// Variables
let grid;
let player;
let treasurePosition;
let gridSize = 10;
let entityNumber;
let listEntityPosition;
let gameFinished = false;

// Création d'une partie au chargement de la page
let body = document.getElementById("body");
body.onload = createGrid(gridSize);

// Création d'une partie en cliquant sur le bouton "Nouvelle partie"
let newGameButton = document.getElementById("newGameButton");
newGameButton.addEventListener("click", () => createGrid(gridSize));

// Affecte les actions de déplacement au boutons
let topButton = document.getElementById("topButton");
topButton.addEventListener("click", () => moveCharacter("TOP"));
let leftButton = document.getElementById("leftButton");
leftButton.addEventListener("click", () => moveCharacter("LEFT"));
let downButton = document.getElementById("downButton");
downButton.addEventListener("click", () => moveCharacter("DOWN"));
let rightButton = document.getElementById("rightButton");
rightButton.addEventListener("click", () => moveCharacter("RIGHT"));

// Fonction de création de la grille du jeu
function createGrid(pGridSize) {
  gameFinished = false;

  // Vide la grille si elle existe déjà
  grid = document.getElementById("grid");
  while (grid.lastElementChild) {
    grid.removeChild(grid.lastElementChild);
  }

  // Génére les entités de la partie
  entityNumber = Math.floor(Math.random() * (50 - 11) + 10);
  generateCharacter(entityNumber);

  // Création de la grille
  let newCell;
  for (let i = 0; i < pGridSize; i++) {
    for (let j = 0; j < pGridSize; j++) {
      newCell = document.createElement("div");
      newCell.dataset.x = i;
      newCell.dataset.y = j;
      newCell.className = "cell";
      // Insertion du joueur dans la grille
      if (i === player.x && j === player.y) {
        newCell.innerHTML =
          "<i id='playerIcon' class='fa-solid fa-person-walking fa-2xl'></i>";
      }

      // Insertion d'une entité dans la grille
      if (listEntityPosition.find((item) => item.curX === i && item.curY === j)) {
        newCell.innerHTML =
          "<i class='fa-solid fa-exclamation fa-2xl interestIcon'></i>";
      }
      grid.append(newCell);
    }
  }
}

// Génération des entités du jeu
function generateCharacter(pEntityNumber) {
  player = new Player(
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
    20,
    5
  );

  let curX;
  let curY;
  listEntityPosition = [];
  for (let i = 0; i < pEntityNumber; i++) {

    do {
      curX = Math.floor(Math.random() * 10);
      curY = Math.floor(Math.random() * 10);
    } while ((curX === player.x && curY === player.y) || listEntityPosition.find((item) => item.curX === curX && item.curY === curY))

    listEntityPosition.push({curX, curY});

  } 
}

// Déplacement des entités
function moveCharacter(direction) {
  if (!gameFinished) {
    let newX;
    let newY;

    switch (direction) {
      case "TOP":
        newX = parseInt(player.x) - 1;
        newY = parseInt(player.y);
        break;
      case "LEFT":
        newX = parseInt(player.x);
        newY = parseInt(player.y) - 1;
        break;
      case "DOWN":
        newX = parseInt(player.x) + 1;
        newY = parseInt(player.y);
        break;
      case "RIGHT":
        newX = parseInt(player.x);
        newY = parseInt(player.y) + 1;
        break;
    }

    // vérifie les limites de la grille
    if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
      player.move(direction);
      checkPlayerCell();
    }
  }
}

// déplacement avec les flèches du clavier
document.addEventListener("keyup", (event) => {
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
});

// vérifie la cellule du joueur (présence du trésor ou d'un monstre)
function checkPlayerCell() {
  let actionHistory = document.getElementById("actionHistory");

  if (listEntityPosition.find((item) => item.curX === player.x && item.curY === player.y)) {

    let isTreasurePosition = Math.floor(Math.random() * (entityNumber) + 1);

    if (isTreasurePosition === 1) {

      let victoryMessage = document.createElement("p");
      victoryMessage.textContent = "VICTORY";
      actionHistory.append(victoryMessage);
      gameFinished = true;
    }

    // supprime la position de l'entité dans la liste
    const index = listEntityPosition.findIndex(
      (item) => item.curX === player.x && item.curY === player.y
    );
    
    if (index !== -1) {
      listEntityPosition.splice(index, 1);
    }

    entityNumber--;
  }
}
