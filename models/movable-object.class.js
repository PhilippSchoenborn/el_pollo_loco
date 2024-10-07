class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accerleration = 2.5;
    energy = 100;
    lastHit = 0;

    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.accerleration;
            }
        }, 1000 / 25);
    }

    isAboveGround(){
        if(this instanceof ThrowableObject){
            return true;
        } else{
            return this.y < 193;
        }
    }

    moveRight(){
        this.x += this.speed;
    }

    moveLeft(){
        this.x -= this.speed;
    }

    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i]; 
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump(){
        this.speedY = 30;
    }

    isColliding(movableObject) {
        return this.x < movableObject.x + movableObject.width &&
               this.x + this.width > movableObject.x &&
               this.y < movableObject.y + movableObject.height &&
               this.y + this.height > movableObject.y;
    }
    

    hit(){
        this.energy -= 5;
        if(this.energy < 0){
            this.energy = 0;
        } else {
            this.lastHit =  new Date().getTime();
        }
    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    isDead(){
        return this.energy == 0;
    }
}