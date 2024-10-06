class CollectableItems extends MovableObject {
    constructor(x, y) {
        super().loadImage('./img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
        this.width = 100;  // Set width to 60 pixels
        this.height = 100;  // Set height to 60 pixels
        this.initialY = y;  // To reference original y position for movement
        this.animate();
    }

    animate() {
        let direction = 1;  // Direction for up/down movement

        setInterval(() => {
            this.y += direction * 0.5;  // Moves up and down slowly

            // Reverse direction at certain distance
            if (this.y >= this.initialY + 10 || this.y <= this.initialY - 10) {
                direction *= -1;
            }
        }, 1000 / 60);
    }
}