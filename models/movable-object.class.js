class MovableObject {
    x = 120;
    y = 210;
    height = 90;
    width = 175;
    img;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accerleration = 2.5;

    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround()){
                this.y -= this.speedY;
                this.speedY -= this.accerleration;
            }
        }, 1000 / 25);
    }

    isAboveGround(){
        return this.y < 193;
    }

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img; 
        });
    }

    moveRight(params){
        console.log('Moving right');
    }

    moveLeft(){
        setInterval( () => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    playAnimation(images){
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

}