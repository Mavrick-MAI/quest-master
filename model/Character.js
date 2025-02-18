class Character {

    constructor(pX, pY, pHealth, pStrength) {

        if(this.constructor == Character) {
           throw new Error("Class is of abstract type and can't be instantiated");
        };

        this.x = pX;
        this.y = pY;
        this.health = pHealth;
        this.strength = pStrength;
    }
}

export default Character;