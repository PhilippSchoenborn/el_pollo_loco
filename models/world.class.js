class World {
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
    soundtrack_sound = new Audio('audio/soundtrack.mp3');
    coin_sound = new Audio('audio/coin.mp3');
    pickup_bottle_sound = new Audio('audio/pickup_bottle.mp3');
    

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.spawnCoins();
        this.spawnBottles();

        this.soundtrack_sound.volume = 0.05; // 5% volume for background music
        this.coin_sound.volume = 0.5; // 50% volume for coin pickup sound
        this.pickup_bottle_sound.volume = 0.5; // 50% volume for bottle pickup sound 

        this.soundtrack_sound.loop = true;  // Loop background music
        this.soundtrack_sound.play();
    }

    setWorld() {
        this.character.world = this;
        this.soundtrack_sound.play();
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();

            // Überprüfe die Proximität nur für den Endboss
            if (this.level.endboss) {
                this.level.endboss.checkCharacterProximity(this.character); // Überprüfe die Proximität nur für den Endboss
            }
        }, 200);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });

        if (this.level.endboss && this.character.isColliding(this.level.endboss)) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
        }

        this.collectableCoins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.collectableCoins.splice(index, 1);
                this.statusBarCoins.increaseCoins();
                this.coin_sound.play();
            }
        });

        this.collectableBottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.collectableBottles.splice(index, 1);
                this.statusBarBottles.increaseBottles();
                this.pickup_bottle_sound.play();
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
        requestAnimationFrame(function () {
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
        this.ctx.translate(mo.x + mo.width / 2, mo.y);
        this.ctx.scale(-1, 1);
        this.ctx.translate(-mo.x - mo.width / 2, -mo.y);
    }

    spawnCoins() {
        let fixedY = 350;
        for (let i = 0; i < 10; i++) {
            let randomX;
            let overlap;
            let attempts = 0;
            do {
                randomX = 350 + Math.random() * 2200;
                overlap = this.checkOverlap(randomX);
                attempts++;
                if (attempts > 100) break;
            } while (overlap);
            if (attempts <= 100) {
                let coin = new CollectableCoins(randomX, fixedY);
                this.collectableCoins.push(coin);
            }
        }
    }

    spawnBottles() {
        let fixedY = 350;
        for (let i = 0; i < 15; i++) {
            let randomX;
            let overlap;
            let attempts = 0;
            do {
                randomX = 250 + Math.random() * 2200;
                overlap = this.checkBottleOverlap(randomX);
                attempts++;
                if (attempts > 100) break;
            } while (overlap);
            if (attempts <= 100) {
                let bottle = new CollectableBottle(randomX, fixedY);
                this.collectableBottles.push(bottle);
            }
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
