let currentTool = "pencil";
let drawing = false;
let canvas = document.getElementById("lienzo");
let ctx = canvas.getContext("2d");

// Configuración inicial del contexto
ctx.lineWidth = 2;
ctx.lineCap = "round";
ctx.strokeStyle = "black";

// Historial de movimientos para deshacer
let history = [];
let currentStep = -1;

// Función para cambiar la herramienta activa
function setTool(tool) {
    currentTool = tool;
    if (tool === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = 10;
    } else {
        ctx.globalCompositeOperation = "source-over";
        if (tool === "colors") {
            let color = prompt("Ingresa un color (nombre o código HEX):", "#000000");
            if (color) ctx.strokeStyle = color;
        } else {
            ctx.strokeStyle = "black";
        }
    }
}

// Función para guardar el estado del lienzo
function saveHistory() {
    currentStep++;
    if (currentStep < history.length) {
        history = history.slice(0, currentStep); // Recorta los pasos después del deshacer
    }
    history.push(ctx.getImageData(0, 0, canvas.width, canvas.height)); // Guarda el estado
}

// Función para deshacer el último dibujo
function undo() {
    if (currentStep > 0) {
        currentStep--;
        ctx.putImageData(history[currentStep], 0, 0); // Restaura el estado anterior
    }
}

// Eventos del canvas para el dibujo
canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousemove", (e) => {
    if (drawing) {
        if (currentTool === "brush") ctx.lineWidth = 5;
        if (currentTool === "pencil") ctx.lineWidth = 2;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
});

canvas.addEventListener("mouseup", () => {
    drawing = false;
    saveHistory(); // Guarda el estado después de cada trazo
});

canvas.addEventListener("mouseleave", () => {
    drawing = false;
});

// Redimensionar el lienzo
function resizeCanvas() {
    const oldContent = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    drawBackground();
    ctx.putImageData(oldContent, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Función para dibujar el fondo
function drawBackground() {
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "#FFF8E1";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}

// Botón de deshacer
document.getElementById("undoButton").addEventListener("click", undo);

// Guardar el estado inicial (vacío)
saveHistory();

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
    link.download = "mi_dibujo.png";
    link.href = tempCanvas.toDataURL("image/png");
    link.click();
}
