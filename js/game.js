let canvas;
let ctx;
let charater = new MovableObject();


function init(){
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d');

    console.log('my charater is', charater);
}