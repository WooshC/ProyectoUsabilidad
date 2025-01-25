import { Lapiz } from './clasesdibujo/Lapiz.js';
import { Pincel } from './clasesdibujo/Pincel.js';
import { Borrador } from './clasesdibujo/Borrador.js';
import { Spray } from './clasesdibujo/Spray.js';
import { Pintura } from './clasesdibujo/Pintura.js';
import { Lienzo } from './clasesdibujo/lienzo.js';

let p5instancia;
let lienzo;
let colorActual = "black";
let herramientaActual;
let grosorTrazo = "pequeño";
let colorLienzo = "#FFF8E1";
let dentroLienzo = false;

function ocultarCanvas() {
    let canvases = document.querySelectorAll('canvas');

    canvases.forEach((canvas) => {
        if (!canvas.closest('#defaultCanvas0')) {
            canvas.remove();
        }
    });
}

// Función para mostrar u ocultar el cuadro de selección de colores
export function toggleColors() {
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

const sketch = (p) => {
    let lapiz;

    p.preload = () => {
        p5instancia = p;
        herramientaActual = new Lapiz(p5instancia, colorActual, "pequeño");
    }

    p.setup = () => {
        let canvasContainer = p.select('#canvas');
        let canva = p.createCanvas(canvasContainer.width, canvasContainer.height);
        canva.position(canvasContainer.position().x, canvasContainer.position().y);
        lienzo = new Lienzo(p, 0, 0, canva.width, canva.height, "nuevo", colorLienzo);
        canva.parent('#canvas');        
        ocultarCanvas();
    };

    p.draw = () => {
        p.background(colorLienzo);
        lienzo.draw();
    };

    p.mousePressed = () => {
        if (p.mouseX >= lienzo.x && p.mouseX <= lienzo.x + lienzo.w && p.mouseY >= lienzo.y && p.mouseY <= lienzo.y + lienzo.h) {
            dentroLienzo = true;
            lienzo.mousePressed(p.mouseX, p.mouseY, herramientaActual);
        } else {
            dentroLienzo = false;
        }
        ocultarCanvas();
    }

    p.mouseDragged = () => {
        if (dentroLienzo) lienzo.mouseDragged(p.mouseX, p.mouseY, herramientaActual);
    }

    p.mouseReleased = () => {
        lienzo.mouseReleased();
    }
};
new p5(sketch);

// Funciones para cambiar herramienta y color
export function setHerramienta(herramienta) {
    if (herramienta == "lapiz") herramientaActual = new Lapiz(p5instancia, colorActual, grosorTrazo);
    if (herramienta == "borrador") herramientaActual = new Borrador(colorLienzo, grosorTrazo);
    if (herramienta == "pincel") herramientaActual = new Pincel(colorActual, grosorTrazo);
    if (herramienta == "spray") herramientaActual = new Spray(p5instancia, colorActual, grosorTrazo);
    if (herramienta == "pintura") herramientaActual = new Pintura(p5instancia, colorActual, grosorTrazo);
}

export function deshacer() {
    lienzo.deshacerAlEstadoPrevio();
}

export function setColor(color) {
    colorActual = color;
    herramientaActual.cambiarColor(colorActual);
}

export function setGrosor(grosorSeleccionado) {
    grosorTrazo = grosorSeleccionado;
    herramientaActual.definirGrosor(grosorTrazo);
}

export function clearLienzo() {
    lienzo.limpiarLienzo(colorLienzo);
}

export function downloadLienzo() {
    p5instancia.saveCanvas(lienzo.buffer, lienzo.title, 'png');
}

window.deshacer = deshacer;
window.setColor = setColor;
window.setGrosor = setGrosor;
window.clearLienzo = clearLienzo;
window.downloadLienzo = downloadLienzo;
window.toggleColors = toggleColors;
window.setHerramienta = setHerramienta;