class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2800;

    constructor(enemies, clouds, backgroundObjects, endboss){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.endboss = endboss;
    }
}