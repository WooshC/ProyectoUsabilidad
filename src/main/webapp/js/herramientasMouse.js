let lienzo;
let herramientaActual = "pincel";
let colorActual = "green";
let colorLienzo = "#FFF8E1";

function deshacer(){
    lienzo.deshacerAlEstadoPrevio();
}

const HERRAMIENTAS_DISPONIBLES = [
    "lapiz",
    "pincel",
    "spray",
    "borrador",
    "pintura"
];

const PALETA_COLORES = [
    "black", "gray", "maroon", "blue", "green", "yellow",
    "red", "orange", "purple", "pink", "white"
];

class Lienzo {
    constructor(x, y, w, h, title) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.title = title;
        this.visible = true;
        this.ultimoX = null;
        this.ultimoY = null;
        this.buffer = createGraphics(w, h);
        this.buffer.background(colorLienzo);
        this.historial = [];
    }

    guardarEstado(){
        let bufferActual = createGraphics(this.w,this.h);
        bufferActual.image(this.buffer,0,0);
        this.historial.push(bufferActual);
        print(`Aumento ${this.historial.length}`);
    }

    deshacerAlEstadoPrevio() {
        if (this.historial.length <= 0) {
            return;
        }
        this.buffer = this.historial.pop();
        print(`${this.historial.length}`);
    }

    draw() {
        if (!this.visible) return;
        fill(0);
        rect(this.x, this.y, this.w, this.h);
        image(this.buffer, this.x, this.y);
    }

    mousePressed(mx, my) {
        this.guardarEstado()
        this.ultimoX = mx;
        this.ultimoY = my;
        switch (herramientaActual) {
            case "spray":
                this.dibujarConSpray(mx, my);
                break;
            case "lapiz":
                const colorOpaco = color(colorActual);
                colorOpaco.setAlpha(85);
                this.buffer.stroke(colorOpaco);
                this.buffer.strokeWeight(2);
                this.buffer.point(mx, my);
                break;
            case "pincel":
                this.buffer.stroke(colorActual);
                this.buffer.strokeWeight(5);
                this.buffer.point(mx, my);
                break;
            case "pintura":
                this.pintarEspacio(mx, my);
                break;
        }
    }

    mouseDragged(mx, my) {
        switch (herramientaActual) {
            case "spray":
                this.dibujarConSpray(mx, my);
                break;
            case "borrador":
                this.borrar(pmouseX - this.x, pmouseY - this.y, mx, my);
                break;
            case "lapiz":
                if (this.ultimoX !== null && this.ultimoY !== null) {
                    const colorOpaco = color(colorActual);
                    colorOpaco.setAlpha(85);
                    this.buffer.stroke(colorOpaco);
                    this.buffer.strokeWeight(2);
                    this.buffer.line(this.ultimoX, this.ultimoY, mx, my);
                }
                this.ultimoX = mx;
                this.ultimoY = my;
                break;
            case "pincel":
                if (this.ultimoX !== null && this.ultimoY !== null) {
                    this.buffer.stroke(colorActual);
                    this.buffer.strokeWeight(5);
                    this.buffer.line(this.ultimoX, this.ultimoY, mx, my);
                }
                this.ultimoX = mx;
                this.ultimoY = my;
                break;
        }
    }

    mouseReleased() {
        this.ultimoX = null;
        this.ultimoY = null;
    }

    dibujarConSpray(x, y) {
        let densidad = 50;
        let radio = 15;
        this.buffer.stroke(colorActual);
        this.buffer.strokeWeight(1);
        for (let i = 0; i < densidad; i++) {
            let angulo = random(TWO_PI);
            let r = random(radio);
            let offsetX = r * cos(angulo);
            let offsetY = r * sin(angulo);
            this.buffer.point(x + offsetX, y + offsetY);
        }
    }

    borrar(x1, y1, x2, y2, strokeWeightVal = 10) {
        this.buffer.stroke(colorLienzo);
        this.buffer.strokeWeight(strokeWeightVal);
        this.buffer.line(x1, y1, x2, y2);
    }

    pintarEspacio(x, y) {
        const nuevoColor = color(colorActual);
        this.buffer.loadPixels();

        let targetColor = this.buffer.get(x, y);
        let esElMismo = this.coloresIguales(targetColor, nuevoColor, 0);
        if (esElMismo) {
            return;
        }

        let pixelActivo = new Set();
        let queue = [[x, y]];

        const deberiaColorearPixel = (x1, y1) => {
            if (x1 < 0 ||
                y1 < 0 ||
                x1 > this.buffer.width ||
                y1 > this.buffer.height) { return false; }

            let idx = y1 * this.buffer.width + x1;
            if (pixelActivo.has(idx)) { return false; }

            let esteColor = this.buffer.get(x1, y1);
            return this.coloresIguales(esteColor, targetColor);
        };

        while (queue.length > 0) {
            let [x, y] = queue.shift();
            let idx = y * this.buffer.width + x;

            if (!pixelActivo.has(idx)) {
                this.buffer.set(x, y, nuevoColor);
                pixelActivo.add(idx);

                let direcciones = [
                    [0, -1],
                    [1, 0],
                    [0, 1],
                    [-1, 0],
                ];

                for (let [xOffset, yOffset] of direcciones) {
                    if (deberiaColorearPixel(x + xOffset, y + yOffset)) {
                        queue.push([x + xOffset, y + yOffset]);
                    }
                }
            }
        }

        this.buffer.updatePixels();
        this.reemplazarBufferConElNuevoLienzo();
    }

    reemplazarBufferConElNuevoLienzo() {
        let nuevoBuffer = createGraphics(this.w, this.h);
        nuevoBuffer.image(this.buffer, 0, 0);
        this.buffer = nuevoBuffer;
    }

    coloresIguales(col1, col2, tolerancia = 10) {
        col1 = this.normalizarColor(col1);
        col2 = this.normalizarColor(col2);

        return (
            Math.abs(col1[0] - col2[0]) <= tolerancia &&
            Math.abs(col1[1] - col2[1]) <= tolerancia &&
            Math.abs(col1[2] - col2[2]) <= tolerancia &&
            Math.abs(col1[3] - col2[3]) <= tolerancia
        );
    }

    normalizarColor(color) {
        if (color instanceof p5.Color) {
            return [
                red(color),
                green(color),
                blue(color),
                alpha(color),
            ];
        } else {
            if (color.length === 3) {
                return [...color, 255];
            }
            return color;
        }
    }
}

function setup() {
    var canvasContainer = select('#canvas');
    var canva = createCanvas(canvasContainer.width, canvasContainer.height);
    // Posiciona el canvas en la misma ubicación del contenedor
    canva.position(canvasContainer.position().x, canvasContainer.position().y);
    lienzo = new Lienzo(0, 0, canva.width, canva.height, "nuevo");
    canva.parent('canvas');
}


function draw() {
    background(colorLienzo);  // Fondo del lienzo
    lienzo.draw();
    if (mouseIsPressed) if (mouseButton === RIGHT) herramientaActual = "lapiz";
}

function mousePressed() {

    if (mouseX >= lienzo.x && mouseX <= lienzo.x + lienzo.w && mouseY >= lienzo.y && mouseY <= lienzo.y + lienzo.h){
        lienzo.mousePressed(mouseX, mouseY);
    }
}

function mouseDragged() {
    if (mouseX >= lienzo.x && mouseX <= lienzo.x + lienzo.w && mouseY >= lienzo.y && mouseY <= lienzo.y + lienzo.h){
        lienzo.mouseDragged(mouseX, mouseY);
    }
}

function mouseReleased() {
    lienzo.mouseReleased();
}

// Funciones para cambiar herramienta y color

function setHerramienta(herramienta) {
    herramientaActual = herramienta;
}

function setColor(color) {
    colorActual = color;
}

function clearLienzo() {
    lienzo.buffer.background(colorLienzo);
}

function downloadLienzo() {
    saveCanvas(lienzo.buffer, 'mi_dibujo', 'png');
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
    link.download = "mi_dibujo.png";
    link.href = tempCanvas.toDataURL("image/png");
    link.click();
}



