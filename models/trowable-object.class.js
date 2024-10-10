class ThrowableObject extends MovableObject {

    throwing_sound = new Audio('audio/throwing.mp3');

    constructor(x, y) {
        super().loadImage('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 70;
        this.throw();

        this.throwing_sound.volume = 0.5; // 50% volume for throw sound
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 35);
        this.throwing_sound.play();
    }
}