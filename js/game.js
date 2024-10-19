let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas')
    world = new World(canvas, keyboard);
}

document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener("keydown", (e) => {
        if (e.key === 'ArrowRight') {
            keyboard.RIGHT = true;
        }
        if (e.key === 'ArrowLeft') {
            keyboard.LEFT = true;
        }
        if (e.key === 'ArrowUp') {
            keyboard.UP = true;
        }
        if (e.key === 'ArrowDown') {
            keyboard.DOWN = true;
        }
        if (e.key === ' ') {
            keyboard.SPACE = true;
        }
        if (e.key === 'd' || e.key === 'D') {
            keyboard.D = true;
        }
    });

    window.addEventListener("keyup", (e) => {
        if (e.key === 'ArrowRight') {
            keyboard.RIGHT = false;
        }
        if (e.key === 'ArrowLeft') {
            keyboard.LEFT = false;
        }
        if (e.key === 'ArrowUp') {
            keyboard.UP = false;
        }
        if (e.key === 'ArrowDown') {
            keyboard.DOWN = false;
        }
        if (e.key === ' ') {
            keyboard.SPACE = false;
        }
        if (e.key === 'd' || e.key === 'D') {
            keyboard.D = false;
        }
    });
});

function toggleMute() {
    const volumeButton = document.getElementById('volume-button');
    if (volumeButton.src.includes('volume.png')) {
        volumeButton.src = './img/10_interface_icons/mute.png';
    } else {
        volumeButton.src = './img/10_interface_icons/volume.png';
    }
}


const modal = document.getElementById('infoModal');


function isFullscreen() {
    return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
}


function openModal() {
    modal.style.display = "block";

    if (isFullscreen()) {
        const elem = document.documentElement;

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { // Firefox
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, and Opera
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // IE/Edge
            elem.msRequestFullscreen();
        }
    }
}


function closeModal() {
    modal.style.display = "none";


    if (isFullscreen()) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
}


window.onclick = function (event) {
    if (event.target === modal) {
        closeModal();
    }
}


function toggleFullscreen() {
    const canvasContainer = document.querySelector('.canvas-container');

    if (isFullscreen()) {
        // If fullscreen is active, exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    } else {
        // If not in fullscreen, enter fullscreen
        if (canvasContainer.requestFullscreen) {
            canvasContainer.requestFullscreen();
        } else if (canvasContainer.mozRequestFullScreen) { // Firefox
            canvasContainer.mozRequestFullScreen();
        } else if (canvasContainer.webkitRequestFullscreen) { // Chrome, Safari, and Opera
            canvasContainer.webkitRequestFullscreen();
        } else if (canvasContainer.msRequestFullscreen) { // IE/Edge
            canvasContainer.msRequestFullscreen();
        }
    }
}


function reloadGame() {
    location.reload();
}


function startGame() {
    const loadingImage = document.getElementById('loadingImage');
    const gameContainer = document.getElementById('gameContainer');
    const startButton = document.querySelector('.start-screen-icon');

    loadingImage.classList.add('hidden');
    startButton.style.display = 'none';
    startButton.onclick = null;
    gameContainer.style.display = 'block';

    init();
}


function gameOver() {
    const gameOverScreen = document.getElementById('gameOverScreen');
    const tryAgainButton = document.getElementById('tryAgainButton');
    gameOverScreen.classList.remove('hidden');
    tryAgainButton.classList.remove('hidden');

    disableUserInput();
}


function disableUserInput() {
    if (typeof handleKeyDown === 'function') {
        document.removeEventListener('keydown', handleKeyDown);
    }
    if (typeof handleKeyUp === 'function') {
        document.removeEventListener('keyup', handleKeyUp);
    }
}
