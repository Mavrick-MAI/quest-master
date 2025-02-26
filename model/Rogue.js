import Player from './Player.js';


class Rogue extends Player {

    static BASE_HEALTH = 10;
    static BASE_STRENGTH = 4;
    static BASE_DEXTERITY = 8;
    static BASE_INTELLIGENCE = 5;
    skillList = [];

    constructor(pX, pY) {
        super(pX, pY, BASE_HEALTH, BASE_STRENGTH, BASE_DEXTERITY, BASE_INTELLIGENCE, skillList);
    }
}

export default Rogue;