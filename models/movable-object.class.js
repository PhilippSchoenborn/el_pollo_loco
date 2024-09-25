class MovableObject {
    x = 120;
    y = 210;
    height = 90;
    width = 175;
    img;
    imageCache = {};
    currentImage = 0;

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
        console.log('Moving left')
    }


}