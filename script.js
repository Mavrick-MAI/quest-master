import Player from "./model/Player.js";
import Rogue from "./model/Rogue.js";
import Mage from "./model/Mage.js";
import Warrior from "./model/Warrior.js";

// Variables
let grid;
let player;
let treasurePosition;
let gridSize = 10;
let entityNumber;
let listEntityPosition;
let gameFinished = false;

let gameBoard = document.getElementById("gameBoard");
let arrows = document.getElementById("arrows");

let classChoices = document.getElementsByClassName("playerClassChoice");

// Création d'une partie au chargement de la page
let body = document.getElementById("body");
body.onload = showClassChoice();

// Création d'une partie en cliquant sur le bouton "Nouvelle partie"
let newGameButton = document.getElementById("newGameButton");
newGameButton.addEventListener("click", () => showClassChoice());

// Affecte les actions de déplacement au boutons
let topButton = document.getElementById("topButton");
topButton.addEventListener("click", () => moveCharacter("TOP"));
let leftButton = document.getElementById("leftButton");
leftButton.addEventListener("click", () => moveCharacter("LEFT"));
let downButton = document.getElementById("downButton");
downButton.addEventListener("click", () => moveCharacter("DOWN"));
let rightButton = document.getElementById("rightButton");
rightButton.addEventListener("click", () => moveCharacter("RIGHT"));

function showClassChoice() {
  gameBoard.style.display = "none";
  arrows.style.display = "none";

  let classModal = document.getElementById("classModal");
  classModal.style.display = "block";
  
  let statModal = document.getElementById("statModal");
  statModal.classList.remove("modalSlide");

  // attribuer un onclick event à chaque ligne de classe pour pouvoir faire une sélection
  for (let i = 0; i < classChoices.length; i++) {
    classChoices[i].addEventListener("click", () =>
      selectClass(classChoices[i])
    );
  }

  let validClassButton = document.getElementById("validClassButton");
  validClassButton.addEventListener("click", () => pickClass());
}

function selectClass(pClassChoice) {
  if (!pClassChoice.classList.contains("selected")) {
    for (let i = 0; i < classChoices.length; i++) {
      classChoices[i].classList.remove("selected");
    }

    pClassChoice.classList.add("selected");

    let statModal = document.getElementById("statModal");
    if (!statModal.classList.contains("modalSlide")) {
      statModal.classList.add("modalSlide");
      statModal.style.display = "block";
    }

    let health;
    let strength;
    let dexterity;
    let intelligence;

    switch (pClassChoice.dataset.class) {
      case "Rogue":
        health = Rogue.BASE_HEALTH;
        strength = Rogue.BASE_STRENGTH;
        dexterity = Rogue.BASE_DEXTERITY;
        intelligence = Rogue.BASE_INTELLIGENCE;
        break;
      case "Mage":
        health = Mage.BASE_HEALTH;
        strength = Mage.BASE_STRENGTH;
        dexterity = Mage.BASE_DEXTERITY;
        intelligence = Mage.BASE_INTELLIGENCE;
        break;
      case "Warrior":
        health = Warrior.BASE_HEALTH;
        strength = Warrior.BASE_STRENGTH;
        dexterity = Warrior.BASE_DEXTERITY;
        intelligence = Warrior.BASE_INTELLIGENCE;
        break;
    }

    let healthBar = document.getElementById("healthStat");
    healthBar.style.width = parseInt(health) * 2 + "%";
    healthBar.title = health + " / 10";

    let strengthBar = document.getElementById("strengthStat");
    strengthBar.style.width = strength + "0%";
    strengthBar.title = strength + " / 10";

    let dexterityBar = document.getElementById("dexterityStat");
    dexterityBar.style.width = dexterity + "0%";
    dexterityBar.title = dexterity + " / 10";

    let intelligenceBar = document.getElementById("intelligenceStat");
    intelligenceBar.style.width = intelligence + "0%";
    intelligenceBar.title = intelligence + " / 10";
  }
}

function pickClass() {
  let playerClassChoice = "";
  for (let i = 0; i < classChoices.length; i++) {
    if (classChoices[i].classList.contains("selected")) {
      playerClassChoice = classChoices[i].dataset.class;
    }
  }

  if (playerClassChoice != "") {

    let classModal = document.getElementById("classModal");
    classModal.style.display = "none";

    let statModal = document.getElementById("statModal");
    statModal.style.display = "none";
  
    createGrid(gridSize, playerClassChoice);

  }
}

// Fonction de création de la grille du jeu
function createGrid(pGridSize, pPlayerClassChoice) {
  gameFinished = false;

  // Vide la grille si elle existe déjà
  grid = document.getElementById("grid");
  while (grid.lastElementChild) {
    grid.removeChild(grid.lastElementChild);
  }

  // Génére les entités de la partie
  entityNumber = Math.floor(Math.random() * (50 - 10) + 10);
  generateCharacter(pPlayerClassChoice, entityNumber);

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
      if (
        listEntityPosition.find((item) => item.curX === i && item.curY === j)
      ) {
        newCell.innerHTML =
          "<i class='fa-solid fa-exclamation fa-2xl interestIcon'></i>";
      }
      grid.append(newCell);
    }
  }

  gameBoard.style.display = "block";
  arrows.style.display = "block";
}

// Génération des entités du jeu
function generateCharacter(pPlayerClassChoice, pEntityNumber) {

  switch (pPlayerClassChoice) {
    case "Rogue":
      player = new Rogue(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));
      break;
    case "Mage":
      player = new Mage(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));
      break;
    case "Warrior":
      player = new Warrior(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));
      break;
  }

  do {
    treasurePosition = {
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 10),
    };
  } while (treasurePosition.x === player.x && treasurePosition.y === player.y);

  let curX;
  let curY;
  listEntityPosition = [];
  for (let i = 0; i < pEntityNumber; i++) {
    do {
      curX = Math.floor(Math.random() * 10);
      curY = Math.floor(Math.random() * 10);
    } while (
      (curX === player.x && curY === player.y) ||
      (curX === treasurePosition.x && curY === treasurePosition.y) ||
      listEntityPosition.find(
        (item) => item.curX === curX && item.curY === curY
      )
    );

    listEntityPosition.push({ curX, curY });
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

  if (
    listEntityPosition.find(
      (item) => item.curX === player.x && item.curY === player.y
    )
  ) {
    let isTreasurePosition = Math.floor(Math.random() * entityNumber + 1);

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

var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});
