function toggleMute() {
    const volumeButton = document.getElementById('volume-button');
    if (volumeButton.src.includes('volume.png')) {
        volumeButton.src = './img/10_interface_icons/mute.png';
    } else {
        volumeButton.src = './img/10_interface_icons/volume.png';
    }
}

// Get the modal
const modal = document.getElementById('infoModal');

// Function to open the modal
function openModal() {
    modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
}

// Close the modal if the user clicks anywhere outside the modal content
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

function openFullscreen() {
    const canvasContainer = document.querySelector('.canvas-container');
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
