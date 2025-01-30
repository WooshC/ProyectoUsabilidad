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
    let colorCircle = document.getElementById('colorCircle');
    colorCircle.style.backgroundColor = color;
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

export function saveDrawing() {
    const drawingData = lienzo.buffer.canvas.toDataURL("image/webp", 0.9);
    const drawings = JSON.parse(localStorage.getItem("drawings")) || [];
    drawings.push(drawingData);
    localStorage.setItem("drawings", JSON.stringify(drawings));
}

export function loadGallery() {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    const drawings = JSON.parse(localStorage.getItem("drawings")) || [];
    drawings.forEach((drawing, index) => {
        const thumbnail = document.createElement("div");
        thumbnail.className = "thumbnail";

        const img = document.createElement("img");
        img.src = drawing;
        img.alt = `Dibujo ${index + 1}`;
        img.onclick = () => {
            localStorage.setItem("selectedDrawing", JSON.stringify(drawing)); // Guardamos el dibujo seleccionado
            window.location.href = "./index.html"; // Redirigir a la página de dibujo
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.onclick = () => deleteDrawing(index);

        thumbnail.appendChild(img);
        thumbnail.appendChild(deleteButton);
        gallery.appendChild(thumbnail);
    });
}

window.onload = function () {
    const selectedDrawing = JSON.parse(localStorage.getItem("selectedDrawing"));
    if (selectedDrawing) {
        const img = p5instancia.loadImage(selectedDrawing, (img) => {
            lienzo.buffer.image(img, 0, 0);
        });
    }
    localStorage.removeItem("selectedDrawing");
    //cargarPlantilla("./assets/plantillas/pikachu.png");
};

export function deleteDrawing(index) {
    const drawings = JSON.parse(localStorage.getItem("drawings")) || [];
    drawings.splice(index, 1);
    localStorage.setItem("drawings", JSON.stringify(drawings));
}

export function cargarPlantilla(ruta, opacidad = 100) {
    p5instancia.loadImage(ruta, (img) => {
        lienzo.buffer.tint(255, opacidad);
        const posX = (lienzo.buffer.width - img.width) / 2;
        const posY = (lienzo.buffer.height - img.height) / 2;

        // Dibujar la imagen en el buffer
        lienzo.buffer.image(img, posX, posY);

        lienzo.buffer.noTint();
    }, (err) => {
        console.error("Error cargando la plantilla:", err);
    });
}

export function toggleGrosor() {
    const grosorOptions = document.getElementById('grosor-options');
    const grosorTool = document.getElementById('grosor');

    const rect = grosorTool.getBoundingClientRect();

    const topPosition = rect.top + window.scrollY + (rect.height / 2) - (grosorOptions.offsetHeight / 2);
    const leftPosition = rect.right + window.scrollX;

    grosorOptions.style.top = `${topPosition}px`;
    grosorOptions.style.left = `${leftPosition}px`;

    if (grosorOptions.style.display === 'none' || grosorOptions.style.display === '') {
        grosorOptions.style.display = 'block';
    } else {
        grosorOptions.style.display = 'none';
    }
}

window.deshacer = deshacer;
window.setColor = setColor;
window.setGrosor = setGrosor;
window.clearLienzo = clearLienzo;
window.downloadLienzo = downloadLienzo;
window.toggleColors = toggleColors;
window.setHerramienta = setHerramienta;
window.saveDrawing = saveDrawing;
window.loadGallery = loadGallery;
window.deleteDrawing = deleteDrawing;
window.cargarPlantilla = cargarPlantilla;
window.toggleGrosor = toggleGrosor;
