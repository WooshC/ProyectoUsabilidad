// Selección de herramientas y configuración inicial
let currentTool = "pencil";
let drawing = false;
let canvas = document.getElementById("lienzo");
let ctx = canvas.getContext("2d");

// Configuración inicial del contexto
ctx.lineWidth = 2; // Grosor de la línea
ctx.lineCap = "round"; // Bordes redondeados para trazos
ctx.strokeStyle = "black"; // Color inicial

// Función para cambiar la herramienta activa
function setTool(tool) {
    currentTool = tool;
    if (tool === "eraser") {
        ctx.strokeStyle = "#FFF8E1"; // Color del fondo para borrar
    } else if (tool === "colors") {
        let color = prompt("Ingresa un color (nombre o código HEX):", "#000000");
        if (color) ctx.strokeStyle = color;
    } else {
        ctx.strokeStyle = "black"; // Por defecto, el lápiz y la brocha son negros
    }
}

// Eventos del canvas para el dibujo
canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY); // Inicia el trazo en la posición del cursor
});

canvas.addEventListener("mousemove", (e) => {
    if (drawing) {
        if (currentTool === "brush") ctx.lineWidth = 5; // Brocha más gruesa
        if (currentTool === "pencil") ctx.lineWidth = 2; // Lápiz más fino
        ctx.lineTo(e.offsetX, e.offsetY); // Dibuja hasta la nueva posición
        ctx.stroke();
    }
});

canvas.addEventListener("mouseup", () => {
    drawing = false;
});

canvas.addEventListener("mouseleave", () => {
    drawing = false;
});

function resizeCanvas() {
    canvas.width = canvas.offsetWidth; // Ancho ajustado al contenedor
    canvas.height = canvas.offsetHeight; // Alto ajustado al contenedor
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // Ajusta al cargar la página
