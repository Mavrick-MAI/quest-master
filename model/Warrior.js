import Player from './Player.js';


class Warrior extends Player {

    static BASE_HEALTH = 9;
    static BASE_STRENGTH = 9;
    static BASE_DEXTERITY = 1;
    static BASE_INTELLIGENCE = 1;
    skillList = [];

    constructor(pX, pY) {
        super(pX, pY, BASE_HEALTH, BASE_STRENGTH, BASE_DEXTERITY, BASE_INTELLIGENCE, skillList);
    }
}

export default Warrior;