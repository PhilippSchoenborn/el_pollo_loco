class CollectableCoins extends MovableObject {
    constructor(x, y) {
        super().loadImage('./img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.initialY = y;
        this.animate();
    }

    animate() {
        let direction = 1;
        setInterval(() => {
            this.y += direction * 0.5;
            if (this.y >= this.initialY + 10 || this.y <= this.initialY - 10) {
                direction *= -1;
            }
        }, 1000 / 60);
    }
}