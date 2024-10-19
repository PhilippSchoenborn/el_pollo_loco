// character.class.js
/**
 * Represents the character in the game, including movement, animations, and state handling.
 * @extends MovableObject
 */
class Character extends MovableObject {
    height = 220;
    width = 120;
    speed = 3;
    lastMovementTime = Date.now(); // Track the last movement timestamp
    isIdle = false; // Flag to check if the character is in idle state
    idleTimeThreshold = 5000; // 5 seconds idle threshold
    idleAnimationFrameCounter = 0; // Counter for controlling idle animation speed
    longIdleFrameCounter = 0; // Counter for long idle animation speed
    idleAnimationSpeed = 15; // Increase to slow down the idle animation
    longIdleAnimationSpeed = 10; // Slow down long idle animation
    snoringSoundPlaying = false; // Flag to track if snoring sound is playing

    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png',
    ];
    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png',
    ];
    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png',
    ];
    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png',
    ];
    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    IMAGES_LONG_IDLE = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    world;
    walking_sound = new Audio('audio/walking.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    character_jump_sound = new Audio('audio/character_jump.mp3');
    character_hurt_sound = new Audio('audio/character_hurt.mp3');
    snoring_sound = new Audio('audio/snoring.mp3');

    /**
     * Constructs a new character instance, initializes animations, loads images, and sets sound properties.
     */
    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();

        this.walking_sound.volume = 0.15;
        this.jump_sound.volume = 0.3;
        this.character_jump_sound.volume = 0.2;
        this.character_hurt_sound.volume = 0.2;
        this.snoring_sound.volume = 0.5;
        this.snoring_sound.loop = true;
    }

    /**
     * Handles the animation of the character, including movement, idle state, hurt, and dead states.
     */
    animate() {
        setInterval(() => {
            this.handleMovement();
            this.handleIdleState();
        }, 1000 / 60);

        setInterval(() => {
            this.handleHurtAndDeadStates();
        }, 100);
    }

    /**
     * Handles the movement of the character based on keyboard input.
     * Plays walking and jumping sounds as needed and updates the last movement timestamp.
     */
    handleMovement() {
        this.walking_sound.pause();
        let currentTime = Date.now();
        let isMoving = false;

        // Check for keyboard input and move character accordingly
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.walking_sound.play();
            this.otherDirection = false;
            this.lastMovementTime = currentTime;
            isMoving = true;
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.walking_sound.play();
            this.otherDirection = true;
            this.lastMovementTime = currentTime;
            isMoving = true;
        }
        if ((this.world.keyboard.UP && !this.isAboveGround()) || (this.world.keyboard.SPACE && !this.isAboveGround())) {
            this.jump();
            this.character_jump_sound.play();
            setTimeout(() => {
                this.jump_sound.play();
            }, 150);
            this.lastMovementTime = currentTime;
            isMoving = true;
        }

        this.world.camera_x = -this.x + 100;

        console.log(`Character Position - X: ${this.x}, Y: ${this.y}`);

        // Stop snoring sound when moving
        if (isMoving && this.snoringSoundPlaying) {
            this.snoring_sound.pause();
            this.snoring_sound.currentTime = 0;
            this.snoringSoundPlaying = false;
        }
    }

    /**
     * Handles the idle state of the character, including playing idle animations and snoring sounds.
     */
    handleIdleState() {
        let currentTime = Date.now();
        if (!this.isAboveGround() && currentTime - this.lastMovementTime >= this.idleTimeThreshold) {
            if (!this.snoringSoundPlaying) {
                this.snoring_sound.play();
                this.snoringSoundPlaying = true;
            }
            this.playIdleAnimation(this.IMAGES_LONG_IDLE, this.longIdleAnimationSpeed);
        } else if (!this.isAboveGround()) {
            this.playIdleAnimation(this.IMAGES_IDLE, this.idleAnimationSpeed);
        }
    }

    /**
     * Plays the idle animation at a given speed using the provided image set.
     * @param {string[]} images - Array of image paths to use for the idle animation.
     * @param {number} speed - The speed at which to play the animation.
     */
    playIdleAnimation(images, speed) {
        this.idleAnimationFrameCounter++;
        if (this.idleAnimationFrameCounter % speed === 0) {
            this.playAnimation(images);
        }
    }

    /**
     * Handles the animations for hurt and dead states of the character.
     * Plays the corresponding animation based on the character's current state.
     */
    handleHurtAndDeadStates() {
        if (this.isDead() && !this.dead) {
            this.dead = true;
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.character_hurt_sound.play();
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    stopAllSounds() {
        let sounds = [
            this.walking_sound,
            this.jump_sound,
            this.character_jump_sound,
            this.character_hurt_sound,
            this.snoring_sound
        ];

        sounds.forEach(sound => {
            if (sound) {
                sound.pause();
                sound.currentTime = 0;  // Reset the playback position
                sound.volume = 0;       // Mute the audio without removing the source
            }
        });
    }



}
