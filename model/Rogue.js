import Player from './Player.js';


class Rogue extends Player {

    static BASE_HEALTH = 25;
    static BASE_STRENGTH = 4;
    static BASE_DEXTERITY = 8;
    static BASE_INTELLIGENCE = 5;
    static skillList = [];

    constructor(pX, pY) {
        super(pX, pY, Rogue.BASE_HEALTH, Rogue.BASE_STRENGTH, Rogue.BASE_DEXTERITY, Rogue.BASE_INTELLIGENCE, Rogue.skillList);
    }
}

export default Rogue;