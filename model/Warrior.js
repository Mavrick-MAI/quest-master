import Player from './Player.js';


class Warrior extends Player {

    static BASE_HEALTH = 40;
    static BASE_STRENGTH = 9;
    static BASE_DEXTERITY = 1;
    static BASE_INTELLIGENCE = 1;
    static skillList = [];

    constructor(pX, pY) {
        super(pX, pY, Warrior.BASE_HEALTH, Warrior.BASE_STRENGTH, Warrior.BASE_DEXTERITY, Warrior.BASE_INTELLIGENCE, Warrior.skillList);
    }
}

export default Warrior;