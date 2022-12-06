import Component from './Component.js' //debería ser removido cuando tengamos las propiedades de los demás componentes
import Resistance from './Resistance.js'
import VoltageSource from './VoltageSource.js'
import Wire from './Wire.js'

//-----------------------------------------------------------------

//Variables globales

let COMPONENTS = [];
let GRID_SIZE = 25;
let CANVAS_HEIGHT = window.innerHeight * 0.8 + 43;
let CANVAS_WIDTH = window.innerWidth - 2;

//Limpia el canvas y dibuja todos los componentes
function execute() {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    COMPONENTS.forEach(comp => {
        comp.update(CTX);
    });
}

//Configuración de canvas

let CANVAS = document.getElementById('myCanvas');
let CTX = CANVAS.getContext('2d');

CANVAS.width = CANVAS_WIDTH;
CANVAS.height = CANVAS_HEIGHT;
CANVAS.style.border = '1px solid black'
CTX.font = "20px Verdana";

CANVAS.addEventListener('click', (e) => {
    e.stopPropagation();

    var mouseX = parseInt(e.clientX - e.target.offsetLeft);
    var mouseY = parseInt(e.clientY - e.target.offsetTop);

    let found = false;

    for (let i = 0; i < COMPONENTS.length; i++) {

        let comp = COMPONENTS[i];

        if (!found) {

            if (comp.dragging) {
                comp.x = Math.round(comp.x / GRID_SIZE) * GRID_SIZE;
                comp.y = Math.round(comp.y / GRID_SIZE) * GRID_SIZE;
                comp.dragging = false;

                continue;
            }

            //Si se clickea un componente, se activa su propiedad dragging
            //para que pueda moverse con el evento 'mousemove'
            if (mouseX > comp.x && mouseX < comp.x + comp.width && mouseY > comp.y && mouseY < comp.y + comp.height) {
                comp.dragging = true;
                comp.offsetX = mouseX - comp.x;
                comp.offsetY = mouseY - comp.y;

                //Colocar el componente al final del array
                //para que pueda estar por encima del resto de componentes al moverse
                COMPONENTS.push(COMPONENTS.splice(i, 1)[0]);

                found = true;
            }
        }
    }

    execute();
});

CANVAS.addEventListener('mousemove', (e) => {
    e.stopPropagation();

    var mouseX = parseInt(e.clientX - e.target.offsetLeft);
    var mouseY = parseInt(e.clientY - e.target.offsetTop);

    for (let i = 0; i < COMPONENTS.length; i++) {

        let comp = COMPONENTS[i];

        if (comp.dragging) {

            comp.x = mouseX - comp.offsetX;
            comp.y = mouseY - comp.offsetY;
            continue;


        }
    }

    execute();

});

document.addEventListener('keydown', (e) => {

    COMPONENTS.forEach(comp => {
        if (comp.dragging) {
            switch (e.key) {
                case 'd':
                case 'D':
                    COMPONENTS.pop();
                    break;
                case 'P':
                case 'p':
                    comp.x = Math.round(comp.x / GRID_SIZE) * GRID_SIZE;
                    comp.y = Math.round(comp.y / GRID_SIZE) * GRID_SIZE;
                    comp.dragging = false;
                    comp.openModal()
                    //TODO --- Open dialog
                    break;
                case 'c':
                    console.log(COMPONENTS);
                    break;
                default:
                    break;
            }
        }
    })

    execute();
});

//-----------------------------------------------------------------

function createGrid() {
    let gridCanvas = document.getElementById("grid")
    let gridContext = gridCanvas.getContext('2d');
    gridCanvas.width = CANVAS_WIDTH;
    gridCanvas.height = CANVAS_HEIGHT;


    gridContext.beginPath();
    gridContext.lineWidth = 0.5;
    gridContext.strokeStyle = "lightgray"
    for (let i = 0; i < gridCanvas.width; i += GRID_SIZE) {
        gridContext.moveTo(i, 0);
        gridContext.lineTo(i, gridCanvas.height)

    }

    for (let i = 0; i < gridCanvas.height; i += GRID_SIZE) {
        gridContext.moveTo(0, i)
        gridContext.lineTo(gridCanvas.width, i)
    }

    gridContext.stroke()
}

document.addEventListener('DOMContentLoaded', createGrid);

//-----------------------------------------------------------------

//Cargar imágenes

let compImg = new Image();
compImg.onload = function () { };
compImg.src = './images/component.png';

let vsImg = new Image();
vsImg.onload = function () { };
vsImg.src = './images/voltage.png';

let resImg = new Image();
resImg.onload = function () { };
resImg.src = './images/resistance.png';

let resVerImg = new Image();
resVerImg.onload = function () { };
resVerImg.src = './images/resistance-v.png';

let wireImg = new Image();
wireImg.onload = function () { };
wireImg.src = './images/wire.png';

let wireVerImg = new Image();
wireVerImg.onload = function () { };
wireVerImg.src = './images/wire-v.png';

//Obtener botones de agregado y agregar su evento click

let addCompBtn = document.getElementById('add-comp');
let addVsBtn = document.getElementById('add-vs');
let addResBtn = document.getElementById('add-res');
let addResVerBtn = document.getElementById('add-res-v');
let addWireBtn = document.getElementById('add-wire');
let addWireVerBtn = document.getElementById('add-wire-v');

addCompBtn.addEventListener('click', () => {
    let comp = new Component(COMPONENTS.length * 50, 0, compImg);
    COMPONENTS.push(comp);
    comp.update(CTX);
});

addVsBtn.addEventListener('click', () => {
    let vs = new VoltageSource(COMPONENTS.length * 50, 0, vsImg);
    COMPONENTS.push(vs);
    vs.update(CTX);
});

addResBtn.addEventListener('click', () => {
    let res = new Resistance(COMPONENTS.length * 50, 0, resImg, false);
    COMPONENTS.push(res);
    res.update(CTX);
});

addResVerBtn.addEventListener('click', () => {
    let res = new Resistance(COMPONENTS.length * 50, 0, resVerImg, true);
    COMPONENTS.push(res);
    res.update(CTX);
});

addWireBtn.addEventListener('click', () => {
    let wire = new Wire(COMPONENTS.length * 50, 0, wireImg, false);
    COMPONENTS.push(wire);
    wire.update(CTX);
});

addWireVerBtn.addEventListener('click', () => {
    let wire = new Wire(COMPONENTS.length * 100, 0, wireVerImg, true);
    COMPONENTS.push(wire);
    wire.update(CTX);
});