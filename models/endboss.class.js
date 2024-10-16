class Endboss extends MovableObject {
    height = 280;
    width = 265;
    y = 160;

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor(character) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2800;
        this.animate();
        this.move(character); // Übergib den Charakter an die move-Methode
        this.isAlert = false;
    }

    checkCharacterProximity(character) {
        if (!character) return; // Überprüfe, ob character definiert ist
        const distance = Math.abs(this.x - character.x);
        const alertRange = 300; // Beispielwert für die Reichweite
    
        if (distance < alertRange) {
            this.isAlert = true; // Setze den Alarmzustand
            this.playAnimation(this.IMAGES_ALERT); // Spiele die Alarmanimation ab
        } else {
            this.isAlert = false; // Setze den Alarmzustand zurück
        }
    }

    animate() {
        setInterval(() => {
            // Überprüfen, ob der Boss alarmiert ist und die Animation entsprechend abspielen
            if (this.isAlert) {
                this.playAnimation(this.IMAGES_ALERT);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 125); // Animation alle 125ms aktualisieren
    }

    move(character) { // Füge character als Parameter hinzu
        let direction = 1; // Bewegungsrichtung
        const moveDistance = 200; // Gesamter Bewegungsbereich
        const startPosition = this.x; // Startposition des Bosses
    
        const moveStep = () => {
            // Bewegung in die aktuelle Richtung
            this.x += direction * 1;
    
            // Grenzen für die Bewegung
            if (this.x >= startPosition + moveDistance) { 
                direction = -1;
                this.otherDirection = false; 
            } else if (this.x <= startPosition - moveDistance) {
                direction = 1;
                this.otherDirection = true; 
            }
    
            // Überprüfe, ob der Charakter in Reichweite ist
            this.checkCharacterProximity(character); // Übergib den Charakter hier
    
            requestAnimationFrame(moveStep); // Fortlaufende Animation
        };
        moveStep(); // Starte die Bewegung
    }
}
