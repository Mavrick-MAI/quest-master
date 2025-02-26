import Player from './Player.js';


class Mage extends Player {

    static BASE_HEALTH = 5;
    static BASE_STRENGTH = 2;
    static BASE_DEXTERITY = 3;
    static BASE_INTELLIGENCE = 9;
    skillList = [];

    constructor(pX, pY) {
        super(pX, pY, BASE_HEALTH, BASE_STRENGTH, BASE_DEXTERITY, BASE_INTELLIGENCE, skillList);
    }
}

export default Mage;