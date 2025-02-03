import { Borrador } from './clasesdibujo/Borrador.js';
import { Lapiz } from './clasesdibujo/Lapiz.js';
import { Lienzo } from './clasesdibujo/Lienzo.js';
import { Pincel } from './clasesdibujo/Pincel.js';
import { Pintura } from './clasesdibujo/Pintura.js';
import { Spray } from './clasesdibujo/Spray.js';

let p5instancia;
let lienzo;
let colorActual = "black";
let herramientaActual;
let grosorTrazo = "pequeño";
let colorLienzo = "#FFF8E1";
let dentroLienzo = false;
let canvasContainer;
const { Camera } = window;
const { Hands } = window;
let isDrawing = false;
let handDrawingEnabled = false;
let cameraStream; // Declara cameraStream para guardar el stream de la cámara
// Declara hands y camera como variables globales
let hands;
let camera;

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
    setupMediaPipe();
};

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
//Descargar
export function downloadDrawingWithConfirmation() {
    showDialog(
        "Descargar Dibujo",
        "¿Estás seguro de que quieres descargar este dibujo?",
        downloadLienzo, // Acción si acepta
        () => { } // Acción si rechaza
    );
}

function iniciarContador() {
    let tiempo = 3; // Segundos antes de capturar la imagen
    const boton = document.getElementById("captureButton");
    boton.disabled = true; // Deshabilitar botón mientras cuenta

    // Mostrar el conteo en el botón
    boton.textContent = `Capturando en ${tiempo}...`;

    const intervalo = setInterval(() => {
        tiempo--;
        if (tiempo > 0) {
            boton.textContent = `Capturando en ${tiempo}...`;
        } else {
            clearInterval(intervalo);
            boton.textContent = "Capturar Imagen";
            boton.disabled = false;
            captureImage(); // Llamar la función de captura
        }
    }, 1000); // Actualizar cada segundo
}

function captureImage() {
    const canvasTemplate = document.createElement("canvas");
    canvasTemplate.width = webcam.videoWidth;
    canvasTemplate.height = webcam.videoHeight;
    const ctxTemplate = canvasTemplate.getContext("2d");

    ctxTemplate.drawImage(webcam, 0, 0, canvasTemplate.width, canvasTemplate.height);

    const imageData = ctxTemplate.getImageData(0, 0, canvasTemplate.width, canvasTemplate.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const gray = (r + g + b) / 3;
        const threshold = 128;
        const color = gray < threshold ? 0 : 255;

        data[i] = color;
        data[i + 1] = color;
        data[i + 2] = color;
    }

    ctxTemplate.putImageData(imageData, 0, 0);
    const imageURL = canvasTemplate.toDataURL();
    cargarPlantilla(imageURL);
    canvasTemplate.remove();
}



function setupMediaPipe() {
    hands = new Hands({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        },
    });

    hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
    });

    hands.onResults(onHandResults);

    // Configura la cámara
    const webcam = document.getElementById("webcam");
    camera = new Camera(webcam, {
        onFrame: async () => {
            await hands.send({ image: webcam });
        },
        width: 640,
        height: 480,
    });

    camera.start();
    cameraStream = camera.stream;  // Guarda el stream de la cámara
}

function toggleCamera() {
    const webcam = document.getElementById("webcam");
    const cameraContainer = document.getElementById("cameraContainer");
    const toggleButton = document.getElementById("toggleCameraButton");

    if (webcam.style.display !== "none") {
        // Si la cámara está visible, apágala
        if (cameraStream) {
            const tracks = cameraStream.getTracks();
            tracks.forEach(track => track.stop()); // Detener todos los tracks
            cameraStream = null; // Limpiar la referencia al stream
        }
        webcam.style.display = "none"; // Ocultar el video
        cameraContainer.classList.add("hidden"); // Ocultar el contenedor de la cámara
        toggleButton.textContent = "Mostrar Cámara"; // Cambiar el texto del botón
    } else {
        // Si la cámara está oculta, enciéndela
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                cameraStream = stream; // Guardar el stream de la cámara
                webcam.srcObject = stream; // Asignar el stream al video
                webcam.style.display = "block"; // Mostrar el video
                cameraContainer.classList.remove("hidden"); // Mostrar el contenedor de la cámara
                toggleButton.textContent = "Ocultar Cámara"; // Cambiar el texto del botón
            })
            .catch((err) => {
                console.error("Error al acceder a la cámara: ", err);
            });
    }
}


 function toggleHandDrawing() {
    handDrawingEnabled = !handDrawingEnabled;
    const toggleButton = document.getElementById("toggleHandDrawingButton");

    if (handDrawingEnabled) {
        toggleButton.textContent = "Dibujar con el mouse (F)";
        console.log("Modo de dibujo con la mano activado.");
    } else {
        toggleButton.textContent = "Dibujar con la mano (F)";
        console.log("Modo de dibujo con el mouse activado.");
    }
}


// Escuchar la tecla "F" para alternar el modo de dibujo
document.addEventListener("keydown", (event) => {
    if (event.key === "f" || event.key === "F") {
        toggleHandDrawing();
    }
});

function onHandResults(results) {
    if (handDrawingEnabled && results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0]; // Primera mano detectada
        if (landmarks && landmarks.length > 8) {  // Verificar que el índice 8 (punta del dedo índice) existe
            const indexFingerTip = landmarks[8]; // Punta del dedo índice

            // Invertir la coordenada x para corregir el modo espejo
            const x = (1 - indexFingerTip.x) * lienzo.w; // Invertir la coordenada X
            const y = indexFingerTip.y * lienzo.h;

            if (!isDrawing) {
                isDrawing = true;
                lienzo.mousePressed(x, y, herramientaActual); // Iniciar trazo
            } else {
                lienzo.mouseDragged(x, y, herramientaActual); // Continuar trazo
            }
        }
    } else if (isDrawing) {
        isDrawing = false;
        lienzo.mouseReleased(); // Finalizar trazo si no hay mano
    }
}

window.captureImage = captureImage;
// Hacer accesible globalmente
window.iniciarContador = iniciarContador;
window.deshacer = deshacer;
window.setColor = setColor;
window.setGrosor = setGrosor;
window.clearLienzo = clearLienzo;
window.toggleColors = toggleColors;
window.setHerramienta = setHerramienta;
window.cargarPlantilla = cargarPlantilla;
window.toggleGrosor = toggleGrosor;
window.saveDrawingWithConfirmation = saveDrawingWithConfirmation;
window.downloadDrawingWithConfirmation = downloadDrawingWithConfirmation;
window.toggleCamera = toggleCamera;
window.toggleHandDrawing = toggleHandDrawing;