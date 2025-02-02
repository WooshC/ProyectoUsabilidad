import { Borrador } from './clasesdibujo/Borrador.js';
import { Lapiz } from './clasesdibujo/Lapiz.js';
import { Pincel } from './clasesdibujo/Pincel.js';
import { Pintura } from './clasesdibujo/Pintura.js';
import { Spray } from './clasesdibujo/Spray.js';
import { Lienzo } from './clasesdibujo/Lienzo.js';

let p5instancia;
let lienzo;
let colorActual = "black";
let herramientaActual;
let grosorTrazo = "pequeño";
let colorLienzo = "#FFF8E1";
let dentroLienzo = false;
let canvasContainer;

//FUNCIONES QUE CREAN O MODIFICAN ELEMENTOS DIRECTAMENTE EN EL ARBOL DE ELEMENTOS HTML
function ocultarCanvas() {
    let canvases = document.querySelectorAll('canvas');

    canvases.forEach((canvas) => {
        if (!canvas.closest('#defaultCanvas0')) {
            canvas.remove();
        }
    });
}
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
export function toggleGrosor() {
    const grosorPicker = document.getElementById('grosor-options');
    const grosorTool = document.getElementById('grosor');

    // Obtener la posición del botón "grosor"
    const rect = grosorTool.getBoundingClientRect();

    // Calcular la posición del menú de grosor
    const topPosition = rect.top + window.scrollY + (rect.height / 2) - (grosorPicker.offsetHeight / 2);
    const leftPosition = rect.right + window.scrollX;

    // Establecer la posición del menú de grosor
    grosorPicker.style.top = `${topPosition}px`;
    grosorPicker.style.left = `${leftPosition}px`;

    // Alternar visibilidad
    if (grosorPicker.style.display === 'none' || grosorPicker.style.display === '') {
        grosorPicker.style.display = 'block';
    } else {
        grosorPicker.style.display = 'none';
    }
}

//FUNCIÓN PARA INICIALIZAR DIBUJO CON P5JS
const sketch = (p) => {

    p.preload = () => {
        p5instancia = p;
        herramientaActual = new Lapiz(p5instancia, colorActual, "pequeño");
        canvasContainer = p.select('#canvas');
    }

    p.setup = () => {
        let canva = p.createCanvas(canvasContainer.width, canvasContainer.height);
        lienzo = new Lienzo(p, 0, 0, canvasContainer.width, canvasContainer.height, "nuevo", colorLienzo);
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

//FUNCIONES PARA CAMBIAR VARIABLES DE ACUERDO A LA SELECCIÓN DEL USUARIO
export function setHerramienta(herramienta) {
    if (herramienta == "lapiz") herramientaActual = new Lapiz(p5instancia, colorActual, grosorTrazo);
    if (herramienta == "borrador") herramientaActual = new Borrador(colorLienzo, grosorTrazo);
    if (herramienta == "pincel") herramientaActual = new Pincel(colorActual, grosorTrazo);
    if (herramienta == "spray") herramientaActual = new Spray(p5instancia, colorActual, grosorTrazo);
    if (herramienta == "pintura") herramientaActual = new Pintura(p5instancia, colorActual, grosorTrazo);

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

//FUNCIÓN AUXILIAR PARA ENVIAR UN MENSAJE EXITOSO
function showSuccessMessage(message) {
    const successMessageElement = document.getElementById('successMessage');
    const successTextElement = document.getElementById('successText');
    // Cambiar el mensaje del texto
    successTextElement.textContent = message;
    // Mostrar el mensaje
    successMessageElement.classList.add('show');
    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
        successMessageElement.classList.remove('show');
    }, 3000);
}

// Función para mostrar el modal con opciones
function showDialog(title, message, confirmCallback, cancelCallback) {
    const modal = document.getElementById('actionModal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;

    // Mostrar el modal
    modal.style.display = 'block';

    const confirmButton = document.getElementById('confirmButton');
    const cancelButton = document.getElementById('cancelButton');

    confirmButton.onclick = () => {
        confirmCallback();
        modal.style.display = 'none'; // Cerrar el modal
    };

    cancelButton.onclick = () => {
        if (cancelCallback) cancelCallback();
        modal.style.display = 'none'; // Cerrar el modal
    };
}
//FUNCIONES QUE REALIZAN ACCIONES SIN CONFIRMACIÓN
export function deshacer() {
    lienzo.deshacerAlEstadoPrevio();
}

export function clearLienzo() {
    lienzo.limpiarLienzo(colorLienzo);
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

//FUNCIONES CON MENSAJE EXITOSO AL EJECUTARSE
function downloadLienzo() {
    p5instancia.saveCanvas(lienzo.buffer, lienzo.title, 'png');
    showSuccessMessage("¡Dibujo descargado con éxito!");
}

function saveDrawing() {
    const drawingData = lienzo.buffer.canvas.toDataURL("image/webp", 0.9);
    const drawings = JSON.parse(localStorage.getItem("drawings")) || [];
    drawings.push(drawingData);
    localStorage.setItem("drawings", JSON.stringify(drawings));
    showSuccessMessage("¡Dibujo guardado con éxito!");
}

window.onload = function () {   //cargar dibujo
    const selectedDrawing = JSON.parse(localStorage.getItem("selectedDrawing"));
    if (selectedDrawing) {
        const img = p5instancia.loadImage(selectedDrawing, (img) => {
            lienzo.buffer.image(img, 0, 0);
        });
        showSuccessMessage("¡Dibujo cargado con éxito!");
    }
    localStorage.removeItem("selectedDrawing");
};

function deleteDrawing(index) {
    const drawings = JSON.parse(localStorage.getItem("drawings")) || [];
    drawings.splice(index, 1);
    localStorage.setItem("drawings", JSON.stringify(drawings));
    showSuccessMessage("¡Dibujo Borrado con éxito!");
}

//FUNCIONES QUE REQUIEREN CONFIRMACIÓN
//Guardar
export function saveDrawingWithConfirmation() {
    showDialog(
        "Guardar Dibujo",
        "¿Estás seguro de que quieres guardar este dibujo?",
        saveDrawing, // Acción si acepta
        () => { } // Acción si rechaza
    );
}
//Borrar
export function deleteDrawingWithConfirmation() {
    showDialog(
        "Eliminar Dibujo",
        "¿Estás seguro de que quieres eliminar este dibujo?",
        deleteDrawing, // Acción si acepta
        () => { } // Acción si rechaza
    );
}
//Descargar
export function downloadDrawingWithConfirmation() {
    showDialog(
        "Descargar Dibujo",
        "¿Estás seguro de que quieres descargar este dibujo?",
        downloadLienzo, // Acción si acepta
        () => { } // Acción si rechaza
    );
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
            window.location.href = "./dibujoLibre.html"; // Redirigir a la página de dibujo
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.onclick = () => deleteDrawing(index);

        thumbnail.appendChild(img);
        thumbnail.appendChild(deleteButton);
        gallery.appendChild(thumbnail);
    });
}

window.deshacer = deshacer;
window.setColor = setColor;
window.setGrosor = setGrosor;
window.clearLienzo = clearLienzo;
window.toggleColors = toggleColors;
window.setHerramienta = setHerramienta;
window.loadGallery = loadGallery;
window.cargarPlantilla = cargarPlantilla;
window.toggleGrosor = toggleGrosor;
window.saveDrawingWithConfirmation = saveDrawingWithConfirmation;
window.deleteDrawingWithConfirmation = deleteDrawingWithConfirmation;
window.downloadDrawingWithConfirmation = downloadDrawingWithConfirmation;