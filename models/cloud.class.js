class Cloud extends MovableObject{
    y = 20;
    height = 400;
    width = 200;


    constructor(){
        super().loadImage('./img/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * 500;
    }

}