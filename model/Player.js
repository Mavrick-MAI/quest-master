import Character from './Character.js';

class Player extends Character {

    constructor(pX, pY, pHealth, pStrength) {
        super(pX, pY, pHealth, pStrength);
    }

    move(direction) {
    
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
}

export default Player;