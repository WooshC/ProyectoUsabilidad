import {Lapiz} from './clasesdibujo/Lapiz.js'; 
import {Pincel} from './clasesdibujo/Pincel.js'; 
import {Borrador} from './clasesdibujo/Borrador.js'; 
import {Spray} from './clasesdibujo/Spray.js'; 
import {Pintura} from './clasesdibujo/Pintura.js';
import {Lienzo} from './clasesdibujo/lienzo.js';

let lienzo;
let colorActual = "green";
let herramientaActual = new Pincel(colorActual,"mediano");
let colorLienzo = "#FFF8E1";
let dentroLienzo = false;

function deshacer() {
    lienzo.deshacerAlEstadoPrevio();
}

function setup() {
    var canvasContainer = select('#canvas');
    var canva = createCanvas(canvasContainer.width, canvasContainer.height);
    // Posiciona el canvas en la misma ubicación del contenedor
    canva.position(canvasContainer.position().x, canvasContainer.position().y);
    lienzo = new Lienzo(0, 0, canva.width, canva.height, "nuevo", colorLienzo);
    canva.parent('canvas');
}

function draw() {
    background(colorLienzo);  // Fondo del lienzo
    lienzo.draw();
}

function mousePressed() {
    if (mouseX >= lienzo.x && mouseX <= lienzo.x + lienzo.w && mouseY >= lienzo.y && mouseY <= lienzo.y + lienzo.h) {
        dentroLienzo = true;
        lienzo.mousePressed(mouseX, mouseY);
    } else {
        dentroLienzo = false;
    }
}

function mouseDragged() {
    if (dentroLienzo) lienzo.mouseDragged(mouseX, mouseY);
}

function mouseReleased() {
    lienzo.mouseReleased();
}

// Funciones para cambiar herramienta y color
function setHerramienta(herramienta) {
    if(herramienta =="lapiz") herramientaActual = new Lapiz(colorActual,"mediano");
    if(herramienta =="borrador") herramientaActual = new Borrador(colorLienzo,"grande");
    if(herramienta =="pincel") herramientaActual = new Pincel(colorActual,"mediano");
    if(herramienta =="spray") herramientaActual = new Spray(colorActual,"mediano");
    if(herramienta =="pintura") herramientaActual = new Pintura(colorActual,"mediano");
}

function setColor(color) {
    colorActual = color;
}

function clearLienzo() {
    lienzo.buffer.background(colorLienzo);
}

function downloadLienzo() {
    saveCanvas(lienzo.buffer, lienzo.title, 'png');
}

// Función para mostrar u ocultar el cuadro de selección de colores
function toggleColors() {
    const colorPicker = document.getElementById('color-picker');
    const colorsTool = document.getElementById('colors');

    // Obtener las coordenadas de la posición del contenedor "colors" en la página
    const rect = colorsTool.getBoundingClientRect();

    // Calcular la posición de color-picker con base en las coordenadas de "colors"
    const topPosition = rect.top + window.scrollY + (rect.height / 2) - (colorPicker.offsetHeight / 2); // Centrado vertical
    const leftPosition = rect.right + window.scrollX; // Colocamos el color-picker a la derecha de "colors"

    // Establecer la posición de color-picker
    colorPicker.style.top = `${topPosition}px`;
    colorPicker.style.left = `${leftPosition}px`;

    // Alternar la visibilidad del color-picker
    if (colorPicker.style.display === 'none' || colorPicker.style.display === '') {
        colorPicker.style.display = 'block';
    } else {
        colorPicker.style.display = 'none';
    }
}


// Función para cambiar el color
function setColor(color) {
    colorActual = color;  // Asigna el color elegido a la variable global
}


function downloadCanvas() {
    // Crear una copia temporal del lienzo para incluir el fondo
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    // Ajustar tamaño del canvas temporal
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Dibujar el fondo y el contenido del lienzo principal en el temporal
    tempCtx.fillStyle = "#FFF8E1"; // Color de fondo
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);

    // Crear el enlace de descarga
    const link = document.createElement("a");
    link.download = lienzo.title +".png";
    link.href = tempCanvas.toDataURL("image/png");
    link.click();
}
