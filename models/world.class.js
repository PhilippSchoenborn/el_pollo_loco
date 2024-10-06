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
    collectableCoins = [];
    collectableBottles = [];
    

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.spawnCoins();
        this.spawnBottles();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
        
        // Überprüfe die Kollision mit dem Endboss
        if (this.level.endboss && this.character.isColliding(this.level.endboss)) {
            this.character.hit(); // Verarbeite die Kollision mit dem Endboss
            this.statusBar.setPercentage(this.character.energy);
        }
    
        this.collectableCoins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.collectableCoins.splice(index, 1);
                this.statusBarCoins.increaseCoins();
            }
        });
        this.collectableBottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.collectableBottles.splice(index, 1);
                this.statusBarBottles.increaseBottles();
            }
        });
        if (this.level.endboss) {
            this.level.endboss.checkCharacterProximity(this.character);
        }
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.statusBarBottles.percentage > 0) {
            let bottle = new ThrowableObject(this.character.x + 65, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.statusBarBottles.decreaseBottles();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.collectableCoins);
        this.addObjectsToMap(this.collectableBottles);
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

    addObjectsToMap(objects) {
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
        this.ctx.translate(mo.x + mo.width / 2, mo.y); // Mittelpunktsübersetzung für die Spiegelung
        this.ctx.scale(-1, 1); // Spiegeln entlang der X-Achse
        this.ctx.translate(-mo.x - mo.width / 2, -mo.y); // Rückübersetzung zur ursprünglichen Position
    }

    spawnCoins() {
        let fixedY = 350;
        for (let i = 0; i < 10; i++) {
            let randomX;
            let overlap;
            do {
                randomX = 350 + Math.random() * 2200;
                overlap = this.checkOverlap(randomX);
            } while (overlap);
            let coin = new CollectableCoins(randomX, fixedY);
            this.collectableCoins.push(coin);
        }
    }

    spawnBottles() {
        let fixedY = 350;
        for (let i = 0; i < 15; i++) {
            let randomX;
            let overlap;
            do {
                randomX = 250 + Math.random() * 2200;
                overlap = this.checkBottleOverlap(randomX);
            } while (overlap);
            let bottle = new CollectableBottle(randomX, fixedY);
            this.collectableBottles.push(bottle);
        }
    }

    checkOverlap(newX) {
        for (let coin of this.collectableCoins) {
            if (Math.abs(newX - coin.x) < 120) {
                return true;
            }
        }
        return false;
    }

    checkBottleOverlap(newX) {
        for (let bottle of this.collectableBottles) {
            if (Math.abs(newX - bottle.x) < 120) {
                return true;
            }
        }
        return false;
    }

}