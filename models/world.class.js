class World{
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusBarBottles();
    throwableObjects = [new ThrowableObject()];
    collectableItems = [];
    

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.spawnCoins();
    }

    setWorld(){
        this.character.world = this;
    }

    run(){
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkCollisions() {
        // Check collision with enemies
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    
        // Check collision with coins
        this.collectableItems.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.collectableItems.splice(index, 1);  // Remove the coin upon collision
                this.statusBarCoins.increaseCoins();     // Update the coin status bar
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            console.log('Throwing bottle');
            let bottle = new ThrowableObject(this.character.x + 65, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    draw(){
 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.collectableItems);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        this.ctx.save();
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        this.ctx.restore();
    }
    
    flipImage(mo) {
        this.ctx.translate(mo.x + mo.width / 2, mo.y);
        this.ctx.scale(-1, 1);
        this.ctx.translate(-mo.x - mo.width / 2, -mo.y);
    }

    spawnCoins() {
        let fixedY = 350;  // Fixed Y position for all coins

        for (let i = 0; i < 10; i++) {
            let randomX;
            let overlap;

            do {
                randomX = 350 + Math.random() * 2200;  // Random X within the canvas width
                overlap = this.checkOverlap(randomX);  // Check if the position overlaps
            } while (overlap);  // If it overlaps, generate a new random X

            let coin = new CollectableItems(randomX, fixedY);
            this.collectableItems.push(coin);
        }
    }

    checkOverlap(newX) {
        for (let coin of this.collectableItems) {
            if (Math.abs(newX - coin.x) < 120) {  // Ensure distance of 20px
                return true;  // Overlap detected
            }
        }
        return false;  // No overlap
    }

}