class MovableObject {
    x = 120;
    y = 250;
    height = 90;
    width = 175;
    img;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    moveRight(params) {
        console.log('Moving right');
    }

    moveLeft(){
        console.log('Moving left')
    }


}