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
resImg.src = './images/resistance.png'

let vsImg = new Image();
vsImg.onload = function () { }
vsImg.src = './images/voltage.png'

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
                    comp.openModal()
                    //TODO --- Open dialog
                    break;
                default:
                    break;
            }
        }
    })

    execute();
});

//--------------------------------------------------------

let COMPONENTS = [];

//Limpia el canvas y dibuja todos los componentes
function execute() {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    COMPONENTS.forEach(comp => comp.draw(CTX));
}

//Configuración de canvas

let CANVAS = document.getElementById('myCanvas');
let CTX = CANVAS.getContext('2d');

CANVAS.width = window.innerWidth - 2;
CANVAS.height = window.innerHeight * 0.8;
CANVAS.style.border = '1px solid black'

CANVAS.addEventListener('click', (e) => {
    e.stopPropagation();

    var mouseX = parseInt(e.clientX - e.target.offsetLeft);
    var mouseY = parseInt(e.clientY - e.target.offsetTop);

    let found = false;

    for (let i = 0; i < COMPONENTS.length; i++) {

        let comp = COMPONENTS[i];

        if (!found) {

            if (comp.dragging) {
                comp.x=Math.round(comp.x/50)*50;
                comp.y=Math.round(comp.y/50)*50;
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

function createGrid(){
    let gridCanvas = document.getElementById("grid")
    let gridContext = gridCanvas.getContext('2d');
    gridCanvas.width = window.innerWidth - 2;
    gridCanvas.height = window.innerHeight * 0.8;
    

    gridContext.beginPath();
    gridContext.strokeStyle="gray"
    for(let i=0;i<gridCanvas.width;i+=50){
        gridContext.moveTo(i,0);
        gridContext.lineTo(i,gridCanvas.height)
        
    }

    for(let i=0;i<gridCanvas.height;i+=50){
        gridContext.moveTo(0,i)
        gridContext.lineTo(gridCanvas.width, i)
    }

    gridContext.stroke()
}

//p1 va a ser el del dragging
//p2 se va a iterar sobre el arreglo COMPONENTS

/*
this.n1={x:0,y:this.height/2}
this.n2={x:this.width,y:this.height/2}
function distance(p1,p2){
    
    return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y) )
}

function verifyLink(comp){
    
    for(let i=0;i<COMPONENTS.length;i++){
        
        if(distance(comp.)){}
    }
}
*/

document.addEventListener('DOMContentLoaded', createGrid)