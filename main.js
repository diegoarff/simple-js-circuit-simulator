/* TODO
 * Cuando un componente está seleccionado (Component.dragging = true),
 * activar event listeners para teclas R (Rotar), Backspace (Borrar), P (Propiedades > aquí se abre el dialog)
 */

import Component from './Component.js' //debería ser removido cuando tengamos las propiedades de los demás componentes
import Resistance from './Resistance.js'
import VoltageSource from './VoltageSource.js'

//Cargar imágenes

let compImg = new Image();
compImg.onload = function () { }
compImg.src = './images/component.png'

let resImg = new Image();
resImg.onload = function () { }
resImg.src = './images/res.png'

let vsImg = new Image();
vsImg.onload = function () { }
vsImg.src = './images/fuente.png'

//Obtener botones de agregado y agregar su evento click

let addCompBtn = document.getElementById('add-comp');
let addResBtn = document.getElementById('add-res');
let addVsBtn = document.getElementById('add-vs');

addCompBtn.addEventListener('click', () => {
    let comp = new Component(COMPONENTS.length * 50, 0, compImg);
    COMPONENTS.push(comp);
    comp.draw(CTX);
})

addResBtn.addEventListener('click', () => {
    let res = new Resistance(COMPONENTS.length * 50, 0, resImg);
    COMPONENTS.push(res);
    res.draw(CTX);
})

addVsBtn.addEventListener('click', () => {
    let vs = new VoltageSource(COMPONENTS.length * 50, 0, vsImg);
    COMPONENTS.push(vs);
    vs.draw(CTX);
})

//--------------------------------------------------------

let COMPONENTS = [];

//Configuración de canvas

let CANVAS = document.getElementById('myCanvas');
let CTX = CANVAS.getContext('2d');

CANVAS.width = window.innerWidth - 2;
CANVAS.height = window.innerHeight * 0.8;
CANVAS.style.border = '1px solid black'


function drawComponents() {
    COMPONENTS.forEach(comp => comp.draw(CTX));
}

CANVAS.addEventListener('click', (e) => {
    e.stopPropagation();

    var mouseX = parseInt(e.clientX - e.target.offsetLeft);
    var mouseY = parseInt(e.clientY - e.target.offsetTop);

    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

    let found = false;

    for (let i = 0; i < COMPONENTS.length; i++) {

        let comp = COMPONENTS[i];

        if (!found) {

            //Si el componente ya había sido clickeado, 
            //se le quita su propiedad dragging para que deje de moverse
            if (comp.dragging) {
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

    drawComponents()
});

CANVAS.addEventListener('mousemove', (e) => {
    e.stopPropagation();

    var mouseX = parseInt(e.clientX - e.target.offsetLeft);
    var mouseY = parseInt(e.clientY - e.target.offsetTop);

    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

    for (let i = 0; i < COMPONENTS.length; i++) {

        let comp = COMPONENTS[i];

        if (comp.dragging) {
            comp.x = mouseX - comp.offsetX;
            comp.y = mouseY - comp.offsetY;
            continue;
        }
    }

    drawComponents()
});


