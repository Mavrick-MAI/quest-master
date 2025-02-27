import Player from './Player.js';


class Mage extends Player {

    static BASE_HEALTH = 15;
    static BASE_STRENGTH = 2;
    static BASE_DEXTERITY = 3;
    static BASE_INTELLIGENCE = 9;
    static skillList = [];

    constructor(pX, pY) {
        super(pX, pY, Mage.BASE_HEALTH, Mage.BASE_STRENGTH, Mage.BASE_DEXTERITY, Mage.BASE_INTELLIGENCE, Mage.skillList);
    }
}

export default Mage;