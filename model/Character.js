class Character {

    constructor(pX, pY, pHealth, pStrength, pDexterity, pIntelligence, pSkillList) {

        if(this.constructor == Character) {
           throw new Error("Class is of abstract type and can't be instantiated");
        };

        this.x = pX;
        this.y = pY;
        this.health = pHealth;
        this.strength = pStrength;
        this.dexterity = pDexterity;
        this.intelligence = pIntelligence;
        this.skillList = pSkillList;
    }
}

export default Character;